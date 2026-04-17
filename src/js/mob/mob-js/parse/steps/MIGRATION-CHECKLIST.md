# Checklist Migrazione: htmlObject (string) → htmlObjectNext (HTMLElement)

## ✅ Preparazione completata

### 1. Refactor repeater (FATTO)
- ✅ Eliminato `inMemoryElementSet` dal web component constructor
- ✅ Sostituito con `queryAllFutureComponent` + `setRepeatAttribute`
- ✅ Pattern save/restore per `skipAddUserComponent` unificato ovunque

### 2. Dual-mode support (FATTO)
- ✅ `convert-to-real-element.js`: type check string vs HTMLElement
- ✅ `get-params-for-component.js`: `renderComponent` supporta entrambi i tipi
- ✅ Type definitions aggiornate per accettare `string | HTMLElement`

---

## 🔴 Interventi richiesti per la migrazione

### A. Export pubblico (CRITICO)
**File**: `src/js/mob/mob-js/index.js` (riga 3)

```js
export { htmlObject } from './parse/steps/from-object';
```

**Azione**: 
- Sostituire o deprecare `htmlObject` 
- Esportare `htmlObjectNext` come API pubblica
- Opzione 1: aliasing `export { htmlObjectNext as htmlObject }`
- Opzione 2: esportare entrambi e deprecare gradualmente `htmlObject`

**Impatto**: Breaking change pubblico — tutti i componenti utente usano `htmlObject`

---

### B. Moduli content: repeat, invalidate, bindText, bindObject

#### B.1 repeat() (ALTO)
**File**: `src/js/mob/mob-js/parse/steps/get-params-for-component.js` (riga 507)

```js
return `<mobjs-repeat ...>${initialStringRender}`;
```

**Azione**:
- Restituire array: `[webComponent, ...renderedElements]` invece di stringa
- Con useSync: raccogliere elementi in array (non `.join('')`)
- Con non-useSync: già restituisce `Element[]`, va bene
- Uniformare i due path useSync/non-useSync

**File impattati**:
- `modules/repeater/update/utils.js`:
  - `getRenderWithSync` (riga 443-484): cambia da `.join('')` a array
  - `updateRepeaterWithoutKeyUseSync` (riga 147-185): stesso cambio
  - `updateRepeaterWithtKeyUseSync` (riga 310-344): stesso cambio

#### B.2 invalidate() (ALTO)
**File**: `src/js/mob/mob-js/parse/steps/get-params-for-component.js` (riga 337)

```js
return `<mobjs-invalidate ...>${invalidateRender()}`;
```

**Azione**:
- Restituire array: `[webComponent, ...renderedElements]`
- `invalidateRender()` restituirà HTMLElement invece di string

**File impattati**:
- `modules/invalidate/action/inizialize-invalidate-watch.js` (riga 131-135):
  - Sostituire `addDOMfromString` con `append` / `addMultipleDOMElement`

#### B.3 bindText() (MEDIO)
**File**: `src/js/mob/mob-js/parse/steps/get-params-for-component.js` (riga 251)

```js
return `<mobjs-bind-text ...>${render()}`;
```

**Azione**:
- Restituire array: `[webComponent, stringContent]`
- Il render interno continua a restituire string (template literals con valori interpolati)

**File impattati**:
- `modules/bind-text/index.js` (riga 256):
  - `insertAdjacentHTML('afterbegin', render())` resta invariato
  - Il contenuto è testo interpolato, non HTML strutturato

#### B.4 bindObject() (MEDIO)
**File**: `src/js/mob/mob-js/parse/steps/get-params-for-component.js` (riga 259)

```js
return `<mobjs-bind-object ...>${render()}`;
```

**Azione**:
- Restituire array: `[webComponent, stringContent]`
- Come bindText, il render interno è string

**File impattati**:
- `modules/bind-object/index.js` (riga 213):
  - `insertAdjacentHTML('afterbegin', render())` resta invariato

---

### C. Route loading (MEDIO)
**File**: `src/js/mob/mob-js/route/load-page.js` (righe 149, 178-182)

```js
const content = (await routeObejct?.layout?.({ params, props })) ?? '';
// ...
addDOMfromString({
    stringDOM: content,
    parent: contentElement,
    position: 'afterbegin',
});
```

**Azione**:
- `layout` restituirà `HTMLElement` invece di `string`
- Fallback: `?? null` invece di `?? ''`
- Sostituire `addDOMfromString` con `contentElement.append(content)` (con check null)

---

### D. Utility deprecation (BASSO)
**File**: `src/js/mob/mob-js/parse/steps/utils.js`

**Azione**:
- `addDOMfromString` (righe 240-249): può essere deprecata dopo la migrazione
- `addMultipleDOMElement` (righe 258-272): mantenerla, è già DOM-based

---

## 📊 Ordine di esecuzione consigliato

### Fase 1: Core render function
1. Sostituire `htmlObject` con `htmlObjectNext` nell'export pubblico
2. Aggiornare tutti i componenti utente per usare `htmlObjectNext`

### Fase 2: Moduli content (in ordine)
1. `repeat()` — più complesso, richiede unificazione useSync/non-useSync
2. `invalidate()` — dipende da repeat per pattern simile
3. `bindText()` / `bindObject()` — più semplici, restituiscono string content

### Fase 3: Route e utility
1. Route `load-page.js`
2. Deprecare `addDOMfromString`

---

## ⚠️ Note importanti

### Content nesting
Con la migrazione, i moduli content restituiscono array:
```js
content: [
    repeat(...),        // -> [webComponent, ...HTMLElement[]]
    invalidate(...),    // -> [webComponent, ...HTMLElement[]]
    bindText(...),      // -> [webComponent, string]
    bindObject(...),    // -> [webComponent, string]
]
```

**Non serve spread** perché `addContentChild` in `htmlObjectNext` gestisce array annidati ricorsivamente.

### Repeater: convergenza useSync/non-useSync
Dopo la migrazione, i due path restituiranno entrambi `Element[]`. La differenza resterà solo in chi aggiunge gli attributi (utente tramite `sync()` vs libreria tramite `setRepeatAttribute`).

### XSS
`bindText` e `bindObject` continuano a usare `insertAdjacentHTML` per il content interno (template literals). Questo è corretto perché gestiscono **text interpolation**, non HTML strutturato. Il rischio XSS resta ma è lo stesso di prima.

`from-object-next.js` riga 118 usa ancora `insertAdjacentHTML` per stringhe child — da valutare se limitare a text-only (es. `textContent` invece di `insertAdjacentHTML`).

---

## 🧪 Test suggeriti

1. **Repeater**: testare nested repeater con useSync=true e useSync=false
2. **Invalidate**: testare nested invalidate
3. **Route**: testare navigazione tra route con layout
4. **Mixed content**: componenti con mix di repeat/invalidate/bindText
5. **Performance**: benchmark rendering large lists (before/after)
