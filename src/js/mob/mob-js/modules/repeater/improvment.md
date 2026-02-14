Analisi delle distrazioni/bug non strutturali nel modulo repeater che possono causare leak o malfunzionamenti della GC.

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
