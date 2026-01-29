# Analisi Ottimizzazione Watcher - Soluzione 1: Indicizzazione per Proprietà

## Verifica di Coerenza con l'Architettura Esistente

La proposta è **pienamente coerente** con l'architettura MobStore. Ecco il mapping delle modifiche necessarie:

### Files Coinvolti e Impatti

| File | Modifica | Impatto |
|------|----------|---------|
| `type.d.ts` | Aggiungere `watcherByProp` (Map nested) e `watcherMetadata` | Solo interno, nessun cambio API |
| `inizialize-instance.js` | Inizializzare le nuove Map vuote | Setup |
| `store-watch.js` | `subscribeWatch`: popolare struttura indicizzata | O(1) insert |
| `store-watch.js` | `unsubScribeWatch`: usare `watcherMetadata` per O(1) lookup | O(1) delete |
| `fire-queque.js` | `runCallbackQueqe`: accesso diretto a `watcherByProp.get(prop)` | O(1) access + O(M) iteration |
| `destroy.js` | Pulire entrambe le Map (`clear()`) | Cleanup |

### Compatibilità

**API Pubblica:** Nessuna modifica. `watch()` continua a ritornare `() =&gt; void`.
**Internals:** Il campo `callBackWatcher` viene sostituito da `watcherByProp` e `watcherMetadata`.
**Comportamento:** Identico per l'utente finale, migliorato solo in performance.

### Nota Tecnica Importante

Per mantenere O(1) anche nell'unsubscribe (senza sapere a priori quale proprietà stava guardando un watcher), è necessaria una mappa inversa `watcherMetadata: Map&lt;watcherId, propName&gt;` che tracci la relazione id → proprietà.

---

### Il Problema

Attualmente, ogni volta che una proprietà viene modificata (via `set`, `update` o `emit`), il sistema esegue una scansione lineare su **tutti** i watcher registrati nello store per trovare quelli interessati.

#### Implementazione Attuale (O(N))
```javascript
// callBackWatcher: Map&lt;string, { prop: string, fn: Function, wait: boolean }&gt;
for (const { prop: currentProp, fn, wait } of callBackWatcher.values()) {
    if (currentProp === prop && !wait) {
        fn(newValue, oldValue, validationValue);
    }
}
```




## Documento Tecnico: Ottimizzazione Performance Watcher

```javascript
export interface StoreMapValue {
    // Rimuovere o deprecare: callBackWatcher: Map<...>

    // Nuovi campi:
    watcherByProp: Map<string, Map<string, WatcherCallback>>;
    watcherMetadata: Map<string, string>; // id -> propName
}

interface WatcherCallback {
    fn: (current: any, previous: any, validate: boolean) => void;
    wait: boolean;
}
```

### inizialize-instance.js
```js
return {
    watcherByProp: new Map(),      // Map<prop, Map<id, callback>>
    watcherMetadata: new Map(),    // Map<id, prop>
    // ... altri campi
};
```

### Subscribe (store-watch.js)
```js
const subscribeWatch = ({ state, prop, callback, wait }) => {
    const id = getUnivoqueId();
    const { watcherByProp, watcherMetadata } = state;

    // Crea bucket se non esiste
    if (!watcherByProp.has(prop)) {
        watcherByProp.set(prop, new Map());
    }

    // Registra
    watcherByProp.get(prop).set(id, { fn: callback, wait });
    watcherMetadata.set(id, prop);

    return {
        state: { ...state, watcherByProp, watcherMetadata },
        unsubscribeId: id
    };
};
```

### Unsubscribe (store-watch.js)
```js
const unsubScribeWatch = ({ instanceId, unsubscribeId }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { watcherByProp, watcherMetadata } = state;
    const prop = watcherMetadata.get(unsubscribeId);

    if (prop) {
        // O(1) delete
        watcherByProp.get(prop)?.delete(unsubscribeId);
        watcherMetadata.delete(unsubscribeId);

        // 🧹 Opzionale: pulizia bucket vuoto (buona pratica)
        if (watcherByProp.get(prop)?.size === 0) {
            watcherByProp.delete(prop);
        }

        updateMainMap(instanceId, { ...state, watcherByProp, watcherMetadata });
    }
};
```

### Fire Callback (fire-queque.js)
```js
export const runCallbackQueqe = ({
    watcherByProp,  // 👈 Parametro cambiato! (prima era callBackWatcher)
    prop,
    newValue,
    oldValue,
    validationValue,
    instanceId,
}) => {
    // Accesso diretto O(1)
    const propWatchers = watcherByProp?.get(prop);
    if (!propWatchers || propWatchers.size === 0) return;

    for (const [id, { fn, wait }] of propWatchers) {
        if (!wait) {
            fn(newValue, oldValue, validationValue);
        } else {
            // ... logica wait inalterata ...
        }
    }
};
```

### In store-set.js (funzioni setProp/setObj):

```js
// Sostituire: callBackWatcher: state.callBackWatcher
// Con: watcherByProp: state.watcherByProp

runCallbackQueqe({
    watcherByProp: state.watcherByProp, // 👈 Cambiato
    prop,
    newValue: valueTransformed,
    oldValue: oldVal,
    validationValue: validationStatusObject[prop],
    instanceId,
});
```

### In store-emit.js:

```js
runCallbackQueqe({
    watcherByProp: state.watcherByProp, // 👈 Cambiato
    prop,
    newValue: store[prop],
    oldValue: store[prop],
    validationValue: validationStatusObject[prop],
    instanceId,
});
```



### Destroy (destroy.js)
```js
destroyStoreEntryPoint = (instanceId) => {
    const state = storeMap.get(instanceId);
    if (!state) return;

    // Pulizia efficiente
    state.watcherByProp.clear();
    state.watcherMetadata.clear();
    // ... resto del cleanup
};
```
