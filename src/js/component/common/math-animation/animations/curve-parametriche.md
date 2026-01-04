# Curve Parametriche - Riferimenti per Esperimenti

Collezione di curve parametriche famose da esplorare per animazioni e visualizzazioni matematiche.

---

## 1. Spirale di Archimede

**Caratteristiche**: Spirale che si allarga uniformemente, vista in natura (conchiglie, galassie).

**Equazioni**:
```javascript
const r = a + b * angleInRadian;
const x = r * Math.cos(angleInRadian);
const y = r * Math.sin(angleInRadian);
```

**Parametri**:
- `a`: distanza iniziale dal centro
- `b`: velocità di allargamento della spirale

**Note**: Semplice ma elegante. Ottima per iniziare.

---

## 2. Rosa di Grandi (Rhodonea)

**Caratteristiche**: Crea forme a petalo di fiore. Molto spettacolare visivamente.

**Equazioni**:
```javascript
const r = a * Math.cos(k * angleInRadian);
const x = r * Math.cos(angleInRadian);
const y = r * Math.sin(angleInRadian);
```

**Parametri**:
- `a`: dimensione della rosa
- `k`: numero di petali
  - Se `k` è intero: `k` petali (se dispari) o `2k` petali (se pari)
  - Se `k` è frazione: forme complesse

**Esempi**:
- `k = 3` → 3 petali
- `k = 5` → 5 petali
- `k = 4` → 8 petali

**Note**: Perfetta per creare pattern floreali. Risultati spettacolari con pochi parametri.

---

## 3. Cardioide

**Caratteristiche**: Forma a cuore stilizzata. Nome deriva dal greco "kardia" (cuore).

**Equazioni**:
```javascript
const r = a * (1 - Math.cos(angleInRadian));
const x = r * Math.cos(angleInRadian);
const y = r * Math.sin(angleInRadian);
```

**Parametri**:
- `a`: dimensione del cuore

**Note**: Forma semplice ma iconica. Usata in acustica (pattern di microfoni).

---

## 4. Spirale Logaritmica (Golden Spiral)

**Caratteristiche**: La spirale aurea. Vista nelle galassie, conchiglie nautilus, e in natura.

**Equazioni**:
```javascript
const r = a * Math.exp(b * angleInRadian);
const x = r * Math.cos(angleInRadian);
const y = r * Math.sin(angleInRadian);
```

**Parametri**:
- `a`: dimensione iniziale
- `b`: tasso di crescita (usa `0.306` per spirale aurea)

**Note**: Collegata al rapporto aureo (φ ≈ 1.618). Molto presente in natura.

---

## 5. Curve di Lissajous

**Caratteristiche**: Figure complesse create da oscillazioni perpendicolari. Usate in oscilloscopi.

**Equazioni**:
```javascript
const x = A * Math.sin(a * t + delta);
const y = B * Math.sin(b * t);
```

**Parametri**:
- `A`, `B`: ampiezze
- `a`, `b`: frequenze (il rapporto `a/b` determina la forma)
- `delta`: sfasamento (usa `Math.PI/2` per forme simmetriche)

**Esempi**:
- `a/b = 1:1` → cerchio o ellisse
- `a/b = 2:1` → otto sdraiato
- `a/b = 3:2` → forme complesse

**Note**: Infinite variazioni possibili. Ottima per sperimentare con rapporti di frequenze.

---

## 6. Epitrocoide (Spirograph)

**Caratteristiche**: Le famose forme del giocattolo Spirograph. Cerchio che rotola all'esterno di un altro cerchio.

**Equazioni**:
```javascript
const x = (R + r) * Math.cos(t) - d * Math.cos(((R + r) / r) * t);
const y = (R + r) * Math.sin(t) - d * Math.sin(((R + r) / r) * t);
```

**Parametri**:
- `R`: raggio del cerchio fisso
- `r`: raggio del cerchio rotante
- `d`: distanza del punto dal centro del cerchio rotante
- `t`: parametro temporale (angleInRadian)

**Note**: Nostalgia garantita! Forme complesse e affascinanti.

---

## 7. Ipotrocoide

**Caratteristiche**: Simile all'epitrocoide, ma il cerchio rotola all'interno.

**Equazioni**:
```javascript
const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
```

**Parametri**: Come epitrocoide, ma con `R - r` invece di `R + r`.

**Note**: Crea forme stellate e ingranaggi.

---

## 8. Butterfly Curve (Curva Farfalla)

**Caratteristiche**: Crea una bellissima forma di farfalla. Equazione complessa ma risultato spettacolare.

**Equazioni**:
```javascript
const r = Math.exp(Math.sin(angleInRadian))
        - 2 * Math.cos(4 * angleInRadian)
        + Math.pow(Math.sin(angleInRadian / 12), 5);
const x = r * Math.cos(angleInRadian);
const y = r * Math.sin(angleInRadian);
```

**Note**: Scoperta nel 1989. Molto popolare per la sua bellezza. Range consigliato: `0 a 12π`.

---

## 9. Trefoil Knot (Nodo Trifoglio)

**Caratteristiche**: Crea un nodo a forma di trifoglio. Base della teoria dei nodi.

**Equazioni**:
```javascript
const x = Math.sin(angleInRadian) + 2 * Math.sin(2 * angleInRadian);
const y = Math.cos(angleInRadian) - 2 * Math.cos(2 * angleInRadian);
```

**Note**: Semplice da implementare. Può essere esteso in 3D.

---

## 10. Lemniscata di Bernoulli (∞)

**Caratteristiche**: Il simbolo dell'infinito. Già implementata!

**Equazioni**:
```javascript
const distanceFromCenter = 2 / (3 - Math.cos(2 * angleInRadian));
const x = distanceFromCenter * Math.cos(angleInRadian) * xAmplitude;
const y = (distanceFromCenter * Math.sin(2 * angleInRadian) / 2) * yAmplitude;
```

**Note**: Simbolo iconico. Base per altre curve a forma di otto.

---

## Curve Consigliate per Iniziare

### Livello Facile
1. **Spirale di Archimede** - semplice, elegante
2. **Cardioide** - pochi parametri, forma riconoscibile
3. **Rosa di Grandi (k=5)** - risultato immediato spettacolare

### Livello Intermedio
4. **Curve di Lissajous** - infinite variazioni
5. **Trefoil Knot** - introduce concetti topologici
6. **Spirale Logaritmica** - collegamento con la natura

### Livello Avanzato
7. **Epitrocoide/Ipotrocoide** - molti parametri da esplorare
8. **Butterfly Curve** - equazione complessa, risultato sorprendente

---

## Risorse per Approfondire

### Siti Web
- **Wikipedia**: "Parametric equations" e "Polar coordinates"
- **Wolfram MathWorld**: Database completo di curve matematiche
- **Desmos**: Calcolatrice grafica online per visualizzare equazioni in tempo reale
- **Math Curve**: http://www.mathcurve.com/

### Libri
- "The Curves of Life" - Theodore Andrea Cook
- "Mathematical Curves" - Friedrich Schröder

### Video
- YouTube: cerca "parametric equations visualization"
- 3Blue1Brown: video su matematica visuale

---

## Pattern Comune di Implementazione

```javascript
// Template generico per curve parametriche
const timeUnitsPerRadian = duration / (2 * Math.PI * cycles);

targets.forEach((item) => {
    let lastX = 0;

    tween.subscribeCache(item, ({ x, opacity }) => {
        const angleInRadian = x / timeUnitsPerRadian;

        // INSERISCI QUI LE EQUAZIONI DELLA CURVA
        // const xr = ...
        // const yr = ...

        item.style.transform = `translate3D(0px,0px,0px) translate(${xr}px, ${yr}px)`;
        item.style.opacity = `${opacity}`;

        lastX = x;
    });
});
```

---

## Note Finali

- **Coordinate polari vs cartesiane**: Molte curve sono più semplici in coordinate polari (r, θ)
- **Normalizzazione**: Ricorda di scalare le coordinate con amplitude per adattarle al container
- **Performance**: Le funzioni trigonometriche sono costose, considera l'uso di lookup tables per animazioni molto complesse
- **Sperimentazione**: I parametri possono essere animati nel tempo per effetti ancora più dinamici!

---

**Data creazione**: Gennaio 2026
**Basato su**: Esperimenti con Lemniscata di Bernoulli e animazioni sinusoidali
