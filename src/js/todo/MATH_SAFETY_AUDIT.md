# Audit di Sicurezza Matematica - mob-motion

**Data:** 26 Giugno 2026  
**Scope:** Divisioni per zero e operazioni matematiche critiche nella libreria di animazione  
**Stato:** 🔴 Da correggere

---

## Sommario Esecutivo

Durante l'audit del sistema di animazione sono stati identificati **4 potenziali punti di divisione per zero** che potrebbero causare valori `Infinity` o `NaN` e compromettere le animazioni. I problemi sono concentrati in:

- **LERP** (linear interpolation): divisione per `fps`
- **SPRING** (spring physics): divisione per `mass` e `fps`
- **TWEEN** (time-based): potenziale divisione per `duration` nelle easing functions

---

## Problemi Identificati

### 1. 🔴 **CRITICO - SPRING: Divisione per MASS**

**Priorità:** ⚠️⚠️ ALTA

**File:** `src/js/mob/mob-motion/animation/spring/get-values-on-draw.js`  
**Riga:** 25

```js
const tensionForce = -tension * (currentValue - toValue);
const dampingForce = -friction * velocity;
const acceleration = (tensionForce + dampingForce) / mass;  // ← PROBLEMA
```

**Scenario di fallimento:**
- Utente crea spring con `mass: 0` (o non specifica e il default è 0)
- Divisione per zero → `acceleration = Infinity`
- Nei frame successivi (righe 28-29):
  ```js
  const newVelocity = velocity + (acceleration * 1) / fps;  // Infinity * 1 / fps = Infinity
  const rawCurrentValue = currentValue + (newVelocity * 1) / fps;  // Infinity
  ```
- L'animazione esplode con valori infiniti

**Impatto:** Crash dell'animazione, possibile propagazione a `NaN` nei valori CSS/DOM

**Difesa esistente:** ❌ Nessuna validazione trovata per `mass`

**Fix proposto:**
```js
// Opzione A: Guard runtime (ogni frame)
const safeMass = mass === 0 ? 1 : mass;
const acceleration = (tensionForce + dampingForce) / safeMass;

// Opzione B: Validazione al momento della creazione (preferibile)
// Nel constructor o setter di MobSpring
validateMass(mass) {
    if (mass <= 0) {
        console.warn('Spring mass must be > 0, defaulting to 1');
        return 1;
    }
    return mass;
}
```

---

### 2. 🟡 **LERP: Divisione per FPS**

**Priorità:** ⚠️ MEDIA

**File:** `src/js/mob/mob-motion/animation/lerp/get-values-on-draw.js`  
**Riga:** 17

```js
const lerpValue = lerp(currentValue, toValue, (velocity / fps) * 60);  // ← PROBLEMA
```

**Scenario di fallimento:**
- Il sistema di frame loop (`MobCore.useNextTick`) passa `fps = 0` (teoricamente possibile se il browser è in freeze o il tab è in background con throttling estremo)
- Divisione per zero → `velocity / 0 = Infinity`
- `lerp()` riceve `amt = Infinity * 60 = Infinity`
- Formula lerp: `(1 - Infinity) * start + Infinity * end` → `NaN`

**Impatto:** Animazione ferma o salta a valori `NaN`

**Difesa esistente:** 
- ✅ `fps` inizializzato a `60` in `src/js/mob/mob-core/events/event-store.js:35`
- ❌ Nessuna validazione runtime che impedisca `fps = 0`

**Fix proposto:**
```js
// Guard runtime
const safeFps = fps === 0 ? 60 : fps;
const lerpValue = lerp(currentValue, toValue, (velocity / safeFps) * 60);
```

---

### 3. 🟡 **SPRING: Divisione per FPS (doppia)**

**Priorità:** ⚠️ MEDIA

**File:** `src/js/mob/mob-motion/animation/spring/get-values-on-draw.js`  
**Righe:** 28-29

```js
const newVelocity = velocity + (acceleration * 1) / fps;        // ← PROBLEMA
const rawCurrentValue = currentValue + (newVelocity * 1) / fps; // ← PROBLEMA
```

**Scenario di fallimento:** Identico a LERP (punto 2)

**Impatto:** Stesso di LERP, ma aggravato da doppia divisione

**Difesa esistente:** Come LERP

**Fix proposto:**
```js
// Guard runtime (condivisa con il calcolo precedente)
const safeFps = fps === 0 ? 60 : fps;
const newVelocity = velocity + (acceleration * 1) / safeFps;
const rawCurrentValue = currentValue + (newVelocity * 1) / safeFps;
```

---

### 4. 🟡 **TWEEN: Easing functions e DURATION**

**Priorità:** ⚠️ MEDIA (da verificare)

**File:** `src/js/mob/mob-motion/animation/tween/get-values-on-draw.js`  
**Righe:** 20-24

```js
const rawCurrentValue = ease(
    timeElapsed,
    item.fromValue,
    item.toValProcessed,
    duration  // ← Parametro passato alle easing
);
```

**Scenario di fallimento:**
- Utente crea tween con `duration: 0`
- Le easing functions standard (es. Robert Penner) hanno forma:
  ```js
  function easeInQuad(t, b, c, d) {
      t /= d;  // ← Divisione per duration
      return c * t * t + b;
  }
  ```
- Se `d = 0` → `t /= 0` → `Infinity`

**Impatto:** Animazione salta direttamente al valore finale o produce `NaN`

**Difesa esistente:** ❓ Da verificare (easing functions probabilmente in libreria esterna)

**Fix proposto:**
```js
// Opzione A: Validazione al momento della creazione del tween
if (duration <= 0) {
    console.warn('Tween duration must be > 0, using instant transition');
    // Salta direttamente al valore finale
    return item.toValue;
}

// Opzione B: Guard nelle easing functions
function easeInQuad(t, b, c, d) {
    if (d === 0) return b + c;  // Transizione istantanea
    t /= d;
    return c * t * t + b;
}
```

**TODO:** Verificare implementazione easing functions (non trovate durante audit - probabilmente esterne)

---

## Operazioni Matematiche Verificate (Sicure)

✅ **Divisione per costanti:**  
- `Math.round(Math.abs(toValue - newCurrentValue) * 10_000) / 10_000` (lerp:24)  
- Sempre safe, denominatore non variabile

✅ **Gestione esplicita dello zero:**  
- `tension === 0 ? true : Math.abs(...) <= precision` (spring:34-36)  
- Evita divisioni quando tension è zero

✅ **Operatori modulo (%):**  
- Nessun uso trovato con denominatori variabili

✅ **Funzioni Math critiche:**  
- Nessun uso pericoloso di `Math.sqrt()`, `Math.log()`, `Math.pow()` con input non validati

---

## Raccomandazioni Implementazione

### Approccio 1: Guard Runtime (Quick Fix)

**Pro:** Immediato, non rompe API esistente  
**Contro:** Overhead in ogni frame (minimo ma misurabile)

```js
// In get-values-on-draw.js di ogni tween
const safeFps = fps === 0 ? 60 : fps;
const safeMass = mass === 0 ? 1 : mass;
// ... usa i valori safe
```

### Approccio 2: Validazione alla Creazione (Raccomandato)

**Pro:** Zero overhead runtime, fail-fast con warning chiaro  
**Contro:** Richiede modifica constructor/setter

```js
// Nel constructor di MobSpring
constructor(data) {
    // ... esistente ...
    this.#validatePhysicsParams();
}

#validatePhysicsParams() {
    const config = this.#springConfig;
    
    if (config.mass <= 0) {
        console.warn(`[MobSpring] Invalid mass (${config.mass}), using default 1`);
        config.mass = 1;
    }
    
    if (config.friction < 0) {
        console.warn(`[MobSpring] Negative friction (${config.friction}), using 0`);
        config.friction = 0;
    }
    
    // tension può essere 0 (spring senza forza), ok
}

// Nel constructor di MobTimeTween
constructor(data) {
    // ... esistente ...
    this.#validateDuration();
}

#validateDuration() {
    if (this.#duration <= 0) {
        console.warn(`[MobTimeTween] Invalid duration (${this.#duration}), using 300ms`);
        this.#duration = 300;
    }
}
```

### Approccio 3: Ibrido (Migliore per FPS)

**Per FPS:** Guard runtime (perché fps viene da sistema esterno MobCore)  
**Per mass/duration:** Validazione alla creazione (perché sono parametri utente)

```js
// FPS: guard runtime (in get-values-on-draw.js)
export const lerpGetValuesOnDraw = ({ values, fps, velocity, precision }) => {
    const safeFps = Math.max(fps, 1);  // Minimo 1 FPS
    
    return values.map((item) => {
        // ... usa safeFps ...
    });
};

// MASS/DURATION: validazione alla creazione (nei constructor)
```

---

## Priorità di Intervento

1. **Immediato:** Fix `mass` in SPRING (Approccio 2 o 3)
2. **A breve:** Guard `fps` in LERP e SPRING (Approccio 3)
3. **Da verificare:** Easing functions e `duration` in TWEEN (richiede ispezione implementazione easing)

---

## Testing Suggerito

Dopo le fix, testare con valori edge:

```js
// Test spring con mass = 0
const spring = MobTween.createSpring({
    data: { x: 0 },
    config: {
        tension: 100,
        friction: 10,
        mass: 0,  // ← dovrebbe fallback a 1 con warning
    }
});

// Test lerp in condizioni estreme (simulate fps drop)
const lerp = MobTween.createLerp({
    data: { x: 0 },
    velocity: 0.1,
});
// Simulare fps = 0 iniettando nel frame loop

// Test tween con duration = 0
const tween = MobTween.createTimeTween({
    data: { x: 0 },
    duration: 0,  // ← dovrebbe fallback o transizione istantanea
});
```

---

## Note Tecniche

### FPS: Perché può essere 0?

Il sistema `MobCore.useNextTick` passa `fps` dal frame loop centrale. Scenari teorici di `fps = 0`:
- Tab in background con throttling estremo del browser
- Debugger in pausa (breakpoint attivo)
- Sistema sotto carico estremo
- Bug nel calcolo FPS (divisione per tempo delta = 0)

### MASS: Validazione fisica

Dal punto di vista fisico, `mass = 0` è matematicamente non valido (oggetto senza massa). Un fallback a `1` è ragionevole (massa unitaria normalizzata).

### DURATION: Comportamento atteso

`duration = 0` potrebbe essere intenzionale per transizioni istantanee. Fix consigliato: transizione immediata al valore finale invece di throw/warning.

---

## File da Modificare

```
src/js/mob/mob-motion/animation/
├── lerp/
│   ├── get-values-on-draw.js          # Fix fps (riga 17)
│   └── mob-lerp.js                    # (opzionale) validazione velocity
├── spring/
│   ├── get-values-on-draw.js          # Fix fps (28-29) + mass (25)
│   └── mob-spring.js                  # Validazione mass/friction/tension
└── tween/
    ├── get-values-on-draw.js          # (verificare easing)
    └── mob-time-tween.js              # Validazione duration
```

---

## Checklist Implementazione

- [ ] Aggiungere validazione `mass` in MobSpring constructor
- [ ] Aggiungere guard `fps` in `lerp/get-values-on-draw.js`
- [ ] Aggiungere guard `fps` in `spring/get-values-on-draw.js`
- [ ] Verificare implementazione easing functions
- [ ] Aggiungere validazione `duration` in MobTimeTween (se necessario)
- [ ] Scrivere test per valori edge (mass=0, fps=0, duration=0)
- [ ] Testare su Firefox/Chrome con tab throttling
- [ ] Aggiornare documentazione con valori validi per parametri

---

## Riferimenti

- Audit eseguito durante fix Firefox promise rejection (commit: TBD)
- Pattern lerp: https://en.wikipedia.org/wiki/Linear_interpolation
- Spring physics: https://github.com/react-spring/react-spring/blob/main/packages/core/src/SpringValue.ts
- Robert Penner Easing: http://robertpenner.com/easing/
