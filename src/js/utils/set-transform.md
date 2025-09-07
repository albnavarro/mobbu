# Logica Astratta per il Posizionamento con `setTransform()`

## 🧮 Formula Generale della Trasformazione

```javascript
context.setTransform(a, b, c, d, e, f);
```

Dove la matrice di trasformazione completa è:
```
[ a  c  e ]
[ b  d  f ]
[ 0  0  1 ]
```

---

## 🔄 Componenti della Trasformazione

### 1. **Parametri di Rotazione e Scaling (a, b, c, d)**
```javascript
const rotationRadians = (Math.PI / 180) * rotationDegrees;
const xx = Math.cos(rotationRadians) * scale;
const xy = Math.sin(rotationRadians) * scale;

// Matrice di trasformazione lineare
const a = xx;     // cos(θ) * scale
const b = xy;     // sin(θ) * scale
const c = -xy;    // -sin(θ) * scale
const d = xx;     // cos(θ) * scale
```

### 2. **Parametri di Traslazione (e, f)**
```javascript
const e = Math.floor(offsetX + positionX);
const f = Math.floor(offsetY + positionY);
```

---

## 🎯 Logica Astratta del Posizionamento

### Formula Completa del Posizionamento
```javascript
context.setTransform(
    Math.cos(θ) * s,    // a
    Math.sin(θ) * s,    // b
    -Math.sin(θ) * s,   // c
    Math.cos(θ) * s,    // d
    offsetX + posX,     // e
    offsetY + posY      // f
);
```

### Variabili Astratte:
| Variabile | Descrizione | Tipo |
|-----------|-------------|------|
| `θ` | Angolo di rotazione in radianti | `number` |
| `s` | Fattore di scaling | `number` |
| `offsetX` | Offset per centratura sull'asse X | `number` |
| `offsetY` | Offset per centratura sull'asse Y | `number` |
| `posX` | Posizione X dell'elemento | `number` |
| `posY` | Posizione Y dell'elemento | `number` |

---

## 📐 Spiegazione Matematica

### 1. **Matrice di Rotazione e Scaling**
La matrice `[a, c; b, d]` combina rotazione e scaling:
```
[ cos(θ)*s  -sin(θ)*s ]
[ sin(θ)*s   cos(θ)*s ]
```

Questa matrice applica:
- **Rotazione** di angolo θ attorno all'origine
- **Scaling** uniforme di fattore s

### 2. **Traslazione del Punto di Origine**
I parametri `e` e `f` spostano il punto di origine della trasformazione:
- `e = offsetX + posX` → Posizione X assoluta nel canvas
- `f = offsetY + posY` → Posizione Y assoluta nel canvas

---

## 🎨 Disegno Centrato rispetto all'Origine

### Strategia di Disegno
```javascript
// Tutte le coordinate sono relative al punto di origine (e, f)
context.drawShape(
    -width / 2,    // Metà dimensione a sinistra/alto
    -height / 2,   // per centrare rispetto all'origine
    width,
    height
);
```

### Perché funziona:
1. La trasformazione posiziona l'origine al punto desiderato `(e, f)`
2. Il disegno è centrato rispetto a questa origine
3. Rotazione e scaling avvengono attorno al centro dell'elemento

---

## 🔧 Implementazione Astratta

### Funzione Generica di Trasformazione
```javascript
/**
 * Applica una trasformazione completa a un elemento canvas
 * @param {CanvasRenderingContext2D} context - Contesto canvas
 * @param {number} rotationDegrees - Rotazione in gradi
 * @param {number} scale - Fattore di scaling
 * @param {number} offsetX - Offset per centratura X
 * @param {number} offsetY - Offset per centratura Y
 * @param {number} positionX - Posizione X assoluta
 * @param {number} positionY - Posizione Y assoluta
 */
function applyTransform(context, rotationDegrees, scale, offsetX, offsetY, positionX, positionY) {
    const θ = (Math.PI / 180) * rotationDegrees;
    const cosθ = Math.cos(θ);
    const sinθ = Math.sin(θ);

    context.setTransform(
        cosθ * scale,     // a
        sinθ * scale,     // b
        -sinθ * scale,    // c
        cosθ * scale,     // d
        Math.floor(offsetX + positionX),  // e
        Math.floor(offsetY + positionY)   // f
    );
}
```

### Funzione Generica di Disegno
```javascript
/**
 * Disegna un elemento centrato rispetto all'origine trasformata
 * @param {CanvasRenderingContext2D} context - Contesto canvas
 * @param {number} width - Larghezza elemento
 * @param {number} height - Altezza elemento
 * @param {number} borderRadius - Raggio degli angoli
 */
function drawCentered(context, width, height, borderRadius = 0) {
    context.rect(
        Math.floor(-width / 2),
        Math.floor(-height / 2),
        width,
        height
    );
}
```

---

## 🧠 Concetti Chiave Astratti

### 1. **Separazione delle Concern**
- **Trasformazione**: Posizionamento, rotazione, scaling
- **Disegno**: Forma e stile dell'elemento
- **Centratura**: Gestita dagli offset

### 2. **Ordine delle Operazioni**
1. Traslazione all'origine desiderata `(e, f)`
2. Rotazione attorno a questa origine
3. Scaling rispetto all'origine
4. Disegno centrato rispetto all'origine

### 3. **Coordinate Relative**
Tutte le coordinate di disegno sono relative al punto `(0, 0)` dopo la trasformazione

---

## 💡 Vantaggi di Questo Approccio Astratto

### 1. **Modularità**
- La logica di trasformazione è separata dal disegno
- Facile riutilizzo per diversi tipi di elementi

### 2. **Mantenibilità**
- Modifiche alla logica di posizionamento in un unico punto
- Chiara separazione delle responsabilità

### 3. **Estensibilità**
- Facile aggiungere nuove trasformazioni
- Supporto per animazioni complesse

### 4. **Performance**
- Singola chiamata a `setTransform()` invece di operazioni multiple
- Matematica vettoriale ottimizzata

---

## 🎯 Formula Finale Astratta

**Per posizionare, ruotare e scalare un elemento centrato:**

```javascript
// 1. Calcola parametri di trasformazione
const θ = (π / 180) * rotation;
const a = cos(θ) * scale;
const b = sin(θ) * scale;
const c = -b;
const d = a;
const e = offsetX + positionX;
const f = offsetY + positionY;

// 2. Applica trasformazione
context.setTransform(a, b, c, d, e, f);

// 3. Disegna centrato
context.drawShape(-width/2, -height/2, width, height);
```

Questa è la **logica pura** che governa il posizionamento preciso degli elementi nel canvas! 🚀
