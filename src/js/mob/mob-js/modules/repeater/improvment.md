## Ottimizzazione: findIndex in watchRepeat

### Posizione
File: `src/js/mob/mob-js/modules/repeater/watch/index.js`
Funzione: `watchRepeat`

### Problema
Complessità O(n) per elemento persistente durante l'aggiornamento del repeater.

### Codice attuale

```javascript
chunkChildrenOrdered.forEach((childArray, index) => {
    childArray.forEach((id) => {
        const currentValue = currentUpdated?.[index];
        if (!currentValue) return;

        const realIndex = hasKey
            ? current.findIndex((value) => {
                  return (
                      `${value?.[key]}` === `${currentUpdated?.[index]?.[key]}`
                  );
              })
            : index;

        setRepeaterStateById({
            id,
            value: { current: currentValue, index: realIndex },
        });
    });
});
```


### Pre-calcolare una Map key -> index una sola volta per l'intero update:

```javascript
// Pre-calcolo: O(n) una sola volta
const keyToIndex = hasKey
    ? new Map(current.map((v, i) => [v[key], i]))
    : null;

chunkChildrenOrdered.forEach((childArray, index) => {
    childArray.forEach((id) => {
        const currentValue = currentUpdated?.[index];
        if (!currentValue) return;

        // Lookup O(1) invece di O(n)
        const realIndex = hasKey
            ? keyToIndex.get(currentValue[key]) ?? index
            : index;

        setRepeaterStateById({
            id,
            value: { current: currentValue, index: realIndex },
        });
    });
});
```

### Con coercizione esplicita ( come originale ).

```javascript
// Prima del loop forEach
const keyToIndex = hasKey
    ? new Map(current.map((v, i) => [
        // Coercizione esplicita: number → string, undefined → "undefined"
        `${v?.[key]}`,
        i
      ]))
    : null;

chunkChildrenOrdered.forEach((childArray, index) => {
    childArray.forEach((id) => {
        const currentValue = currentUpdated?.[index];
        if (!currentValue) return;

        // O(1) lookup con coercizione identica alla creazione della Map
        const realIndex = hasKey
            ? keyToIndex.get(`${currentValue?.[key]}`)
            : index;

        // ... resto del codice
    });
});
```

### Fallback su undefined:
```javascript
const realIndex = hasKey
    ? (keyToIndex.get(`${currentValue?.[key]}`) ?? -1)
    : index;
```


## Array Vuoti Orfani in repeatIdsMap

#### File:
remove-repeat-by-repeat-id.js

#### Problema:
Quando si rimuove l'ultimo repeater di un componente, la mappa mantiene componentId → [] invece di eliminare la chiave.

#### Rischio:
Crescita della mappa con entry vuote senza valore.

Fix:

```javascript
if (valueParsed.length === 0) {
    repeatIdsMap.delete(id);
} else {
    repeatIdsMap.set(id, valueParsed);
}
```


