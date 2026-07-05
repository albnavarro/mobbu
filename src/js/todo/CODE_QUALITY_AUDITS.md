# Audit di Qualità del Codice - mob-motion

**Data:** 26 Giugno 2026  
**Scope:** Memory leaks, performance, edge cases, type safety, observability  
**Stato:** 📋 Pianificato

---

## Sommario

Questo documento elenca **5 audit di qualità** proposti per la libreria `mob-motion`, in ordine di priorità. Ogni audit identifica una categoria di problemi potenziali e fornisce una metodologia di ricerca.

**Priorità:**

1. 🔴 **Memory Leak Audit** - Critico per app long-running
2. ⚡ **Performance Hot-Path Audit** - Critico per UX (60fps)
3. 🐛 **Edge Cases & Boundary Conditions** - Importante per robustezza
4. 🔒 **Type Safety & Validation** - Utile per manutenibilità
5. 📊 **Observability & Error Messages** - Nice-to-have per debugging

---

## 1. 🔴 Memory Leak Audit

**Priorità:** ALTA (Critico)  
**Tempo stimato:** 3-4 ore  
**Impatto:** App long-running (SPA), animazioni ripetute in loop

### Obiettivo

Identificare pattern che causano accumulo di memoria non rilasciata quando tween/timeline vengono creati e distrutti ripetutamente.

### Cosa Cercare

#### A. Event Listeners Non Rimossi

**Pattern sospetto:**

```js
// Registrazione
MobCore.useFrame(() => { ... });
MobCore.handleScroll.add(() => { ... });

// Destroy - viene fatto cleanup?
destroy() {
    // ❌ Se non viene chiamato unsubscribe, il listener resta in memoria
}
```

**File da ispezionare:**

- `mob-time-tween.js`, `mob-lerp.js`, `mob-spring.js`: `#startRaf()` usa `initRaf()` - viene fatto cleanup?
- `async-timeline.js`: usa `handleNextFrame`, `handleNextTick` - cleanup fatto?
- `mob-scroller.js`, `mob-parallax.js`: event listeners DOM

**Test:**

```js
// Crea e distruggi 1000 volte
for (let i = 0; i < 1000; i++) {
    const tween = createTimeTween({ data: { x: 0 } });
    tween.goTo({ x: 100 });
    tween.destroy();
}
// Verifica memory usage in DevTools
```

#### B. Array che Crescono Indefinitamente

**Pattern sospetto:**

```js
// In stop() - pulisce la cache MA non svuota l'array
stop() {
    this.#callbackCache.forEach(({ cb }) => MobCore.useCache.clean(cb));
    // ❌ this.#callbackCache non viene svuotato - cresce ad ogni chiamata?
}
```

**Confronto con destroy():**

```js
destroy() {
    this.#callbackCache = [];  // ✓ Svuotato
}
```

**Domanda:** Se chiami `stop()` → `goTo()` → `stop()` ripetutamente, `#callbackCache` accumula entry duplicate?

**File da ispezionare:**

- `mob-time-tween.js`: `#callback`, `#callbackCache`, `#callbackOnComplete`, `#unsubscribeCache`
- `async-timeline.js`: `#tweenStore`, `#tweenList`, `#callbackLoop`, `#callbackComplete`
- `mob-scroller.js`: storage di pin, trigger, ecc.

**Test:**

```js
const tween = createTimeTween({ data: { x: 0 } });
for (let i = 0; i < 1000; i++) {
    tween.goTo({ x: Math.random() * 100 });
    tween.stop();
}
// Ispeziona tween.#callbackCache size (via debugger)
```

#### C. Riferimenti Circolari

**Pattern sospetto:**

```js
// Timeline tiene riferimento al tween
timeline.#tweenStore.push({ tween, data });

// Tween registra callback che cattura timeline
tween.validateInitialization({
    validation: () => timeline.#isInPause, // ← closure cattura timeline
});

// Se non viene fatto cleanup: tween ↔ timeline ciclo
```

**Garbage collection:** Se sia tween che timeline sono "vivi" ma non più usati, il GC non li raccoglie.

**File da ispezionare:**

- `async-timeline.js`: `#tweenStore`, `validateInitialization` usage
- `mob-time-tween.js`: `#externalValidations`

**Test:**

```js
let timeline = createAsyncTimeline();
let tween = createTimeTween({ data: { x: 0 } });
timeline.add({ tween }).goTo({ x: 100 });

// Rimuovi riferimenti
timeline = null;
tween = null;

// Force GC (Chrome DevTools) - vengono raccolti?
```

#### D. Cleanup Incompleti in destroy()

**Pattern da verificare:**

```js
destroy() {
    // ✓ Buono
    this.#callbackOnComplete = [];
    this.#callback = [];
    this.#values = [];

    // ❓ Mancano altri campi?
    // this.#currentPromise non viene annullato?
    // this.#stagger non viene rilasciato?
}
```

**File da ispezionare:**

- Tutti i tween/timeline: confrontare i campi dichiarati vs quelli resettati in `destroy()`

### Deliverable

**File:** `MEMORY_LEAK_FINDINGS.md`

**Struttura:**

```markdown
## Leak #1: Event Listeners in initRaf

- Severity: HIGH
- File: mob-time-tween.js:XXX
- Scenario: ...
- Fix: ...

## Leak #2: #callbackCache non svuotato in stop()

- Severity: MEDIUM
- ...
```

**Test di verifica:**

- Script per creare/distruggere 10k tween e misurare memory delta
- Chrome DevTools Heap Snapshot diff

---

## 2. ⚡ Performance Hot-Path Audit

**Priorità:** ALTA (Critico per UX)  
**Tempo stimato:** 2-3 ore  
**Impatto:** Frame drops, jank, animazioni non fluide

### Obiettivo

Identificare operazioni costose eseguite 60 volte al secondo (dentro `#draw()` o RAF callback) che causano frame drops.

### Cosa Cercare

#### A. Allocazioni in Loop 60fps

**Pattern sospetto:**

```js
// File: lerp/get-values-on-draw.js
export const lerpGetValuesOnDraw = ({ values, fps, velocity, precision }) => {
    return values.map((item) => {
        // ← Nuovo array OGNI frame
        // ...
        return {
            ...item, // ← Spread crea nuovo object OGNI frame
            currentValue: newCurrentValue,
            settled: false,
        };
    });
};
```

**Calcolo impatto:**

- 100 proprietà animate = 100 items in `values`
- `.map()` crea array di 100 elementi → 6000 array/sec a 60fps
- Spread `{...item}` crea 100 objects → 6000 objects/sec
- **Totale:** ~12k allocazioni/sec → pressure su GC → stuttering

**Alternativa (mutazione in-place):**

```js
export const lerpGetValuesOnDraw = ({ values, fps, velocity, precision }) => {
    for (let i = 0; i < values.length; i++) {
        const item = values[i];
        if (item.settled) continue;

        // Calcola...
        item.currentValue = newCurrentValue; // ← Muta invece di clonare
        item.settled = settled;
    }
    return values; // Stesso array, mutato
};
```

**Trade-off:** Immutabilità vs performance. In hot-path (60fps), la performance vince.

**File da ispezionare:**

- `lerp/get-values-on-draw.js`
- `spring/get-values-on-draw.js`
- `tween/get-values-on-draw.js`
- `async-timeline.js`: loop dentro `#run()`
- Callbacks in `default-callback.js`

#### B. Operazioni Costose Ripetute

**Pattern sospetto:**

```js
#draw() {
    // ❌ Regex eseguita 60 volte/sec
    const isValid = /^\d+$/.test(this.#someValue);

    // ❌ Array.sort() su array grande
    const sorted = this.#values.sort((a, b) => a.index - b.index);

    // ❌ JSON.parse/stringify
    const clone = JSON.parse(JSON.stringify(data));
}
```

**Fix:** Spostare fuori dal loop, cache il risultato, pre-sort.

**File da ispezionare:**

- Tutti i `#draw()` methods
- Callback eseguiti ogni frame in `defaultCallback()`

#### C. Closure Pesanti

**Pattern sospetto:**

```js
#startRaf(resolve) {
    MobCore.useFrame(() => {
        MobCore.useNextTick(({ time, fps }) => {
            // ← Questa closure cattura:
            // - this (intero tween object)
            // - resolve (function)
            // - scope esterno
            // Se creata ogni frame → GC pressure
            if (this.#isRunning) this.#draw(time, fps);
        });
    });
}
```

**Domanda:** `useFrame` viene chiamato UNA VOLTA o ripetutamente?

**File da ispezionare:**

- `#startRaf()` in tutti i tween
- Loop in `async-timeline.js`

#### D. Funzioni in Array.prototype Hot

**Pattern sospetto:**

```js
// ❌ .forEach() + callback = overhead
this.#values.forEach((item) => {
    item.currentValue = lerp(...);
});

// ✓ for loop = più veloce
for (let i = 0; i < this.#values.length; i++) {
    this.#values[i].currentValue = lerp(...);
}
```

**Benchmark tipico:** `for` è ~2-3x più veloce di `.forEach()` su array grandi.

**File da ispezionare:**

- Tutti gli `.forEach()`, `.map()`, `.filter()` dentro `#draw()` o RAF callbacks

### Deliverable

**File:** `PERFORMANCE_HOTSPOTS.md`

**Struttura:**

```markdown
## Hotspot #1: Array.map() in get-values-on-draw

- Severity: HIGH
- File: lerp/get-values-on-draw.js:12
- Allocations/sec: ~6000
- Fix: Mutate in-place
- Benchmark: Before/After FPS

## Hotspot #2: Spread operator in draw loop

- ...
```

**Benchmark script:**

```js
// Test con 100 proprietà animate
const tween = createLerp({ data: generateLargeData(100) });
performance.mark('start');
tween.goTo(generateLargeData(100));
setTimeout(() => {
    performance.mark('end');
    performance.measure('animation', 'start', 'end');
    console.log(performance.getEntriesByName('animation'));
}, 5000);
```

---

## 3. 🐛 Edge Cases & Boundary Conditions

**Priorità:** MEDIA (Importante)  
**Tempo stimato:** 2-3 ore  
**Impatto:** Crash, comportamenti inaspettati, bug edge-case

### Obiettivo

Identificare input/stati non gestiti che causano crash o comportamenti undefined.

### Cosa Cercare

#### A. Array Vuoti

**Scenario:**

```js
const tween = createTimeTween({ data: {} }); // Nessuna proprietà → this.#values = []
tween.goTo({ x: 100 }); // Aggiunge proprietà runtime
```

**Domande:**

- `#draw()` gestisce `values.length === 0`?
- `allSettled = values.every(...)` su array vuoto ritorna `true` (matematicamente corretto) → chiama `onComplete` subito?
- Callback vengono chiamati con oggetto vuoto?

**File da testare:**

- Tutti i tween: `#doAction()` con `data: {}`
- Timeline: `#tweenList = []` (nessun tween aggiunto)

#### B. Valori Negativi Non Validati

**Scenario:**

```js
createLerp({
    data: { x: 0 },
    velocity: -0.5, // ❓ Negativo valido? Animazione all'indietro?
    precision: -0.01, // ❌ Precision negativa non ha senso
});

createSpring({
    data: { x: 0 },
    config: {
        mass: -1, // ❌ Massa negativa impossibile
        friction: -5, // ❓ Friction negativa = energia aggiunta?
        tension: -100, // ❓ Tension negativa = repulsione?
    },
});
```

**Domande:**

- C'è validazione? Warning? Clamp a 0?
- Cosa succede matematicamente con valori negativi?

**File da testare:**

- Tutti i constructor con parametri negativi
- Setter di velocity, precision, mass, friction, tension

#### C. Overflow Numerico

**Scenario:**

```js
const spring = createSpring({ data: { x: 0 } });
spring.goTo({ x: Number.MAX_VALUE }); // Valore enorme
// Nel calcolo:
// acceleration = (force) / mass
// velocity += acceleration / fps  // ← Può superare MAX_VALUE?
// Se velocity = Infinity → currentValue = Infinity → CSS broken
```

**Test:**

```js
// Accumulo in loop
const tween = createLerp({ data: { x: 0 }, velocity: 0.99 });
for (let i = 0; i < 1000000; i++) {
    tween.goTo({ x: tween.get().x + 1000 });
}
// x raggiunge Infinity?
```

**File da testare:**

- Calcoli in `get-values-on-draw.js` (spring accumulo velocità)
- Timeline con repeat: Infinity

#### D. Type Coercion Implicita

**Scenario:**

```js
createTimeTween({
    data: { x: '100' }, // ❌ Stringa invece di number
});
// Nel calcolo easing:
// return c * t * t + b;  // "100" * 0.5 * 0.5 = NaN? O coercion a 100?

createLerp({
    data: { x: null }, // ❌ null
});
// lerp(null, 100, 0.5) = ?
```

**Test:**

```js
const cases = [
    { x: '100' },
    { x: null },
    { x: undefined },
    { x: NaN },
    { x: Infinity },
    { x: -Infinity },
    { x: true }, // true * 2 = 2
];

cases.forEach((data) => {
    const tween = createTimeTween({ data });
    tween.goTo({ x: 200 });
    console.log(tween.get()); // Cosa ritorna?
});
```

**File da testare:**

- Parsing in `parse-action.js`, `set-values.js`
- Type validation in tween constructors

#### E. NaN Propagation

**Scenario:**

```js
// Se un valore diventa NaN (es. divisione 0/0, Infinity - Infinity)
currentValue = NaN;

// Nel frame successivo:
const lerpValue = lerp(NaN, 100, 0.5); // NaN
// NaN infetta tutti i calcoli successivi
item.currentValue = NaN;
// Callback riceve { x: NaN }
// CSS: element.style.left = NaN + 'px';  // Invalid
```

**Test:**

```js
const tween = createLerp({ data: { x: 0 } });
// Forza NaN iniettandolo
tween.#values[0].currentValue = NaN; // (via debugger)
tween.goTo({ x: 100 });
// L'animazione si riprende o resta bloccata su NaN?
```

**File da testare:**

- `getRoundedValue()` in `animation-utils.js`
- Check `isNaN()` nei calcoli

### Deliverable

**File:** `EDGE_CASES_FINDINGS.md`

**Struttura:**

```markdown
## Edge Case #1: Array vuoto in #draw()

- Severity: MEDIUM
- Scenario: createTimeTween({ data: {} })
- Behavior attuale: ...
- Behavior atteso: ...
- Fix: ...

## Edge Case #2: Velocity negativa

- ...
```

**Test suite:**

```js
describe('Edge Cases', () => {
    test('Empty data object', () => { ... });
    test('Negative velocity', () => { ... });
    test('Numeric overflow', () => { ... });
    test('String instead of number', () => { ... });
    test('NaN propagation', () => { ... });
});
```

---

## 4. 🔒 Type Safety & Validation

**Priorità:** MEDIA (Utile)  
**Tempo stimato:** 2 ore  
**Impatto:** Manutenibilità, bug prevenzione, DX

### Obiettivo

Allineare i tipi TypeScript con l'implementazione reale e identificare punti dove la validazione runtime manca.

### Cosa Cercare

#### A. Type Coercion Implicita Pericolosa

**Pattern sospetto:**

```js
// Silenzioso ma pericoloso
const duration = '500'; // Stringa
const timeElapsed = 250;
const progress = timeElapsed / duration; // "250" / "500" = 0.5 ✓ Funziona per coercion

// Ma:
const duration = '500ms'; // Stringa con unità
const progress = timeElapsed / duration; // 250 / "500ms" = NaN ❌
```

**Domanda:** Dove vengono accettati parametri che dovrebbero essere `number` ma potrebbero essere `string`?

**File da ispezionare:**

- Tutti i setter di parametri numerici (duration, velocity, mass, ecc.)
- Parse functions in `parse-action.js`

#### B. Null/Undefined Non Gestiti

**Pattern sospetto:**

```js
// Nessun null check
const value = item.toValue; // ❌ Se item è undefined → crash
const rounded = getRoundedValue(value);

// Con optional chaining:
const value = item?.toValue ?? 0; // ✓ Safe
```

**File da ispezionare:**

- Accessi a proprietà senza `?.` o check precedente
- Array access senza bound check: `array[index]` dove `index` potrebbe essere out of bounds

**Trova con:**

```bash
grep -rn "\.to[A-Z]\|\.from[A-Z]\|\.current[A-Z]" src/js/mob/mob-motion/animation/ | grep -v "?\.to\|?\.from"
# Trova accessi diretti a proprietà senza optional chaining
```

#### C. Return Type Inconsistenti

**Pattern trovato:**

```js
// lerp.js:657
if (!compareKeys(htmlObject, toObject)) {
    compareKeysWarning(...);
    return new Promise((resolve) => resolve);  // ← resolve() senza argomento
}

// Type dichiarato:
export type DoAction = (...) => Promise<void | string>;

// Problema: resolve() → Promise<undefined>, non void né string
```

**Altro esempio:**

```js
// A volte ritorna boolean
this.#currentResolve?.(true);

// A volte ritorna object
mainResolve({ resolve: true });

// A volte ritorna sentinella
this.#currentResolve(MobCore.ANIMATION_STOP_RESOLVE);

// Ma il type è Promise<void | string> ?
```

**File da ispezionare:**

- Tutte le funzioni che ritornano Promise
- Confrontare JSDoc `@returns` con `return` statements effettivi

#### D. JSDoc vs Implementazione

**Pattern sospetto:**

```js
/**
 * @param {number} duration - Animation duration
 * @param {boolean} immediate - Skip delay
 * @returns {Promise<void>}
 */
goTo(obj, props) {
    // ❓ duration non usato come parametro, è in props?
    // ❓ immediate non usato
    // ❓ Ritorna Promise<void> o Promise<void | string>?
}
```

**Trova con:**

```bash
# Trova parametri JSDoc che non appaiono nel corpo funzione
grep -A20 "@param.*duration" src/js/mob/mob-motion/animation/ | grep -B20 "duration" | less
```

**File da ispezionare:**

- Tutti i metodi pubblici (goTo, goFrom, set, play, ecc.)
- Confrontare @param con uso effettivo

### Deliverable

**File:** `TYPE_SAFETY_FINDINGS.md`

**Azioni:**

```markdown
## Action #1: Enable TypeScript strict mode

- Current: strict: true in tsconfig (ma checkJs potrebbe essere parziale)
- Add: strictNullChecks, noImplicitAny, strictPropertyInitialization

## Action #2: Fix resolve() senza argomento

- File: lerp.js:657, spring.js:XXX
- Change: resolve() → resolve(undefined) esplicito
- O: return Promise.resolve() invece di new Promise

## Action #3: Allinea JSDoc con implementazione

- File: mob-time-tween.js:XXX
- Fix @param duration → @param {Object} props
```

---

## 5. 📊 Observability & Error Messages

**Priorità:** BASSA (Nice-to-have)  
**Tempo stimato:** 1-2 ore  
**Impatto:** Developer Experience, debugging facilità

### Obiettivo

Migliorare i messaggi di errore e warning per facilitare il debug quando qualcosa va storto.

### Cosa Cercare

#### A. Warning Generici

**Pattern attuale:**

```js
// async-timeline.js:1534
.catch(() => {
    timelineSetTweenFailWarining();  // ← Dice solo "fail" generico
});

// Implementazione probabile:
export const timelineSetTweenFailWarining = () => {
    console.warn('Timeline setTween failed');  // ❌ Quale tween? Perché?
};
```

**Fix proposto:**

```js
.catch((error) => {
    console.warn(
        `[AsyncTimeline] setTween failed for tween "${tween.getId()}" at index ${index}`,
        { error, tweenData: tween.get() }
    );
});
```

**File da ispezionare:**

- Tutti i file `warning.js`, `fps-log-inizialization.js`
- Tutte le chiamate a `console.warn()`, `console.error()`

#### B. Silent Failures

**Pattern attuale:**

```js
// loop-callback.js:58
stepFunction[action]()
    .then(...)
    .catch(() => {})  // ← Errore completamente ingoiato
```

**Problema:** Se il tween crasha dentro `goTo()`, l'errore sparisce nel nulla. Nessun log, nessun hint.

**Fix proposto:**

```js
.catch((error) => {
    // Log solo in dev mode
    if (process.env.NODE_ENV !== 'production') {
        console.warn('[mobMotion] Tween action failed', { action, tween, error });
    }
})
```

**File da ispezionare:**

- Tutti i `.catch(() => {})` vuoti
- Try-catch che non loggano

#### C. Debug Info Insufficienti

**Scenario:** Animazione non parte, tween sembra bloccato. Come fai debug?

**Mancante:**

- Stato corrente del tween: `{ isRunning, isPaused, currentValue, targetValue, velocity }`
- Timeline state: `{ currentIndex, totalSteps, loopCount, direction, activetweens }`
- Performance metrics: `{ fps, droppedFrames, activeAnimations }`

**Fix proposto:**

```js
// Aggiungi metodo di debug
class MobTimeTween {
    getDebugInfo() {
        return {
            id: this.#uniqueId,
            isRunning: this.#isRunning,
            isPaused: this.#pauseStatus,
            values: this.#values.map((v) => ({
                prop: v.prop,
                from: v.fromValue,
                to: v.toValue,
                current: v.currentValue,
                settled: v.settled,
            })),
            duration: this.#duration,
            timeElapsed: this.#timeElapsed,
            fps: '(from MobCore)',
        };
    }
}

// Usage
console.table(tween.getDebugInfo());
```

**File da modificare:**

- Tutti i tween/timeline: aggiungere `getDebugInfo()` o `inspect()`

#### D. Metriche Mancanti

**Utili per monitoring:**

```js
// Performance tracking
MobMotion.metrics = {
    activeAnimations: 0,      // Quanti tween/timeline attivi
    totalCreated: 0,          // Totale creati da page load
    averageFPS: 60,           // FPS medio delle animazioni
    droppedFrames: 0,         // Frame saltati
    memoryUsage: 0,           // MB usati (stimato)
};

// Aggiorna in #startRaf / destroy
#startRaf() {
    MobMotion.metrics.activeAnimations++;
    // ...
}

destroy() {
    MobMotion.metrics.activeAnimations--;
    // ...
}
```

**Deliverable:** Dashboard metrics per dev tools

### Deliverable

**File:** `OBSERVABILITY_IMPROVEMENTS.md`

**Azioni:**

```markdown
## Improvement #1: Better error messages

- Replace generic warnings con context (tween ID, values, reason)

## Improvement #2: Debug mode

- Add getDebugInfo() method a tutti i tween/timeline
- Log dettagliato solo se MOB_DEBUG=true

## Improvement #3: Performance metrics

- Track activeAnimations, FPS, memory
- Expose via MobMotion.metrics

## Improvement #4: DevTools integration

- Custom formatter per Chrome DevTools
- Visualizza stato tween in console
```

---

## Priorità Esecuzione

```
Sprint 1 (Critici):
├─ Memory Leak Audit          [3-4h] 🔴
└─ Performance Hot-Path Audit [2-3h] ⚡

Sprint 2 (Importanti):
├─ Edge Cases Audit           [2-3h] 🐛
└─ Type Safety Audit          [2h]   🔒

Sprint 3 (Nice-to-have):
└─ Observability Audit        [1-2h] 📊
```

**Totale stimato:** 10-14 ore di audit + implementazione fix

---

## Metodologia Comune

### Per Ogni Audit:

1. **Ricerca pattern** (grep, read code, analyze)
2. **Categorizza findings** (HIGH/MEDIUM/LOW severity)
3. **Scrivi test di riproduzione** (script o unit test)
4. **Proponi fix** (code sample)
5. **Benchmark before/after** (quando applicabile)
6. **Documento deliverable** (markdown findings)

### Tool Consigliati:

- **Memory:** Chrome DevTools → Memory → Heap Snapshot, Timeline
- **Performance:** Chrome DevTools → Performance, `performance.measure()`
- **Type Safety:** TypeScript strict mode, eslint rules
- **Edge Cases:** Fuzzing, property-based testing (fast-check)

---

## Note Finali

Questi audit sono **preventivi** - identificano problemi potenziali prima che causino bug in produzione. Non tutti i findings saranno critici, ma la mappatura completa aiuta a:

1. **Prioritizzare fix** in base a severity e frequenza
2. **Documentare decisioni** (es. "trade-off performance vs immutabilità")
3. **Onboarding** nuovi dev con panoramica dei gotcha
4. **Regression prevention** con test suite dedicata

---

**Prossimo step:** Scegliere un audit da eseguire e creare il documento findings corrispondente.
