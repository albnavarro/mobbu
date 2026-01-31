## Il problema attuale
Attualmente, quando una proprietà dello store viene modificata, il sistema deve notificare tutti i watcher interessati. Per farlo, esegue una scansione lineare di tutti i watcher registrati (callBackWatcher), controllando uno per uno se il prop corrisponde a quello modificato. Questo ha complessità O(N), dove N è il numero totale di watcher nello store. Se hai 1000 watcher distribuiti su varie proprietà, ma modifichi solo "counter", il sistema controllerà comunque tutti e 1000 per trovare quelli che osservano "counter".

## La soluzione: indicizzazione per proprietà
La modifica introduce una struttura dati a doppio livello che funziona come un indice invertito:
`watcherByProp`: una Map dove la chiave è il nome della proprietà (es. "counter") e il valore è un'altra Map contenente tutti i watcher che osservano quella specifica proprietà.
`watcherMetadata`: una Map ausiliaria che associa l'ID del watcher al nome della proprietà che osserva (necessaria per l'operazione di unsubscribe).

## Come funziona nel dettaglio
**Registrazione (watch)**: Quando registri un watcher su "counter", invece di aggiungerlo a una lista globale, viene creato un bucket specifico per "counter" (se non esiste) e il watcher viene inserito lì. Inoltre, in watcherMetadata salvo che il watcher XYZ osserva "counter".
**Notifica (set/emit)**: Quando "counter" cambia, accedo direttamente al bucket watcherByProp.get("counter") in tempo O(1) e itero solo sui watcher effettivamente interessati. Se sulla proprietà ci sono solo 3 watcher, itero solo quelli 3, indipendentemente da quanti altri watcher ci sono nello store su altre proprietà.
**Rimozione (unwatch)**: Per disiscrivere un watcher, uso watcherMetadata per sapere immediatamente a quale proprietà appartiene (lookup O(1)), poi lo rimuovo dal bucket specifico. Se il bucket svuota, viene eliminato per non occupare memoria inutilmente.

## Benefici
La complessità passa da O(N) a O(1) per l'accesso più O(M) per l'iterazione, dove M è il numero di watcher su quella specifica proprietà (tipicamente M << N). Questo rende lo store scalabile anche con migliaia di watcher distribuiti su molte proprietà.

## Trade-off
L'overhead di memoria è trascurabile (basilarmente un puntatore extra per watcher nella watcherMetadata), mentre il guadagno in performance è significativo in scenari con molti watcher. Inoltre, l'API pubblica rimane identica: chi usa il metodo watch() non nota alcuna differenza, tranne che nel ricevere le notifiche più velocemente.

``` javascript
/**
 * =====================================================
 * FILE: type.d.ts
 * Aggiornare l'interfaccia StoreMapValue
 * =====================================================
 */
export interface StoreMapValue {
    // RIMUOVERE:
    // callBackWatcher: Map<string, { prop: string; fn: Function; wait: boolean }>;

    // AGGIUNGERE:
    watcherByProp: Map<string, Map<string, WatcherCallback>>;
    watcherMetadata: Map<string, string>; // id -> propName

    // ... resto invariato
}

// AGGIUNGERE:
export interface WatcherCallback {
    fn: (current: any, previous: any, validate: MobStoreValidateState) => void | Promise<void>;
    wait: boolean;
}

export interface MobStoreCallbackQueue {
    // AGGIUNGERE:
    watcherByProp: Map<string, Map<string, WatcherCallback>>;
    // Rimuovere callBackWatcher
    // ...
}


/**
 * =====================================================
 * FILE: inizialize-instance.js
 * Inizializzare le nuove strutture dati
 * =====================================================
 */
export const inizializeInstance = (data) => {
    // ...
    return {
        // RIMUOVERE:
        // callBackWatcher: new Map(),

        // AGGIUNGERE:
        watcherByProp: new Map(),      // Map<prop, Map<id, callback>>
        watcherMetadata: new Map(),    // Map<id, prop>

        // ... resto invariato (callBackComputed, etc.)
    };
};

/**
 * =====================================================
 * FILE: store-watch.js
 * Modificare subscribeWatch e unsubScribeWatch
 * =====================================================
 */
const subscribeWatch = ({ state, prop, callback, wait }) => {
    const { store, watcherByProp, watcherMetadata } = state; // Cambiato da callBackWatcher
    const logStyle = getLogStyle();

    if (!store) return { state: undefined, unsubscribeId: '' };
    if (!(prop in store)) {
        storeWatchWarning(prop, logStyle);
        return { state: undefined, unsubscribeId: '' };
    }

    const id = getUnivoqueId();

    // NUOVA LOGICA: Crea bucket se non esiste per la proprietà
    if (!watcherByProp.has(prop)) {
        watcherByProp.set(prop, new Map());
    }

    // NUOVA LOGICA: Registra watcher nelle strutture indicizzate
    watcherByProp.get(prop).set(id, { fn: callback, wait });
    watcherMetadata.set(id, prop); // Traccia relazione inversa per O(1) unsubscribe

    return {
        state: { ...state, watcherByProp, watcherMetadata },
        unsubscribeId: id
    };
};

const unsubScribeWatch = ({ instanceId, unsubscribeId }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { watcherByProp, watcherMetadata } = state; // Cambiato da callBackWatcher

    // NUOVA LOGICA: Lookup O(1) della proprietà associata all'id
    const prop = watcherMetadata.get(unsubscribeId);

    if (prop) {
        // O(1) delete
        watcherByProp.get(prop)?.delete(unsubscribeId);
        watcherMetadata.delete(unsubscribeId);

        // Pulizia bucket vuoto (buona pratica)
        if (watcherByProp.get(prop)?.size === 0) {
            watcherByProp.delete(prop);
        }

        updateMainMap(instanceId, { ...state, watcherByProp, watcherMetadata });
    }
};

/**
 * =====================================================
 * FILE: fire-queque.js
 * Modificare entrambe le funzioni di callback
 * =====================================================
 */
export const runCallbackQueqe = ({
    watcherByProp,  // Cambiato da callBackWatcher
    prop,
    newValue,
    oldValue,
    validationValue,
    instanceId,
}) => {
    // NUOVA LOGICA: Accesso diretto O(1) ai watcher della proprietà
    const propWatchers = watcherByProp?.get(prop);
    if (!propWatchers || propWatchers.size === 0) return;

    for (const [id, { fn, wait }] of propWatchers) {
        if (!wait) {
            fn(newValue, oldValue, validationValue);
        } else {
            // ... logica wait esistente invariata ma dentro il loop
            if (instanceId && wait) {
                const queueByInstanceId = waitMap.get(instanceId) ?? new Map();
                const shouldWait = queueByInstanceId.has(prop);
                queueByInstanceId.set(prop, { newValue, oldValue, validationValue });
                if (shouldWait) return;
                waitMap.set(instanceId, queueByInstanceId);

                useNextLoop(() => {
                    const propsPerIdNow = waitMap.get(instanceId);
                    const current = propsPerIdNow?.get(prop);
                    if (current) {
                        fn(current.newValue, current.oldValue, current.validationValue);
                        propsPerIdNow?.delete(prop);
                        if (propsPerIdNow?.size === 0) waitMap.delete(instanceId);
                    }
                });
            }
        }
    }
};

export const runCallbackQueqeAsync = async ({
    watcherByProp,  // Cambiato da callBackWatcher (MANCAVA NEL DOC)
    prop,
    newValue,
    oldValue,
    validationValue,
}) => {
    // NUOVA LOGICA: Accesso diretto O(1)
    const propWatchers = watcherByProp?.get(prop);
    if (!propWatchers) return;

    for (const { fn } of propWatchers.values()) {
        await fn(newValue, oldValue, validationValue);
    }
};

/**
 * =====================================================
 * FILE: store-set.js
 * Aggiornare le chiamate a runCallbackQueqe in setProp() e setObj()
 * =====================================================
 */
// In setProp() sostituire:
runCallbackQueqe({
    watcherByProp: state.watcherByProp, // Cambiato da callBackWatcher
    prop,
    newValue: valueTransformed,
    oldValue: oldVal,
    validationValue: validationStatusObject[prop],
    instanceId,
});

// In setObj() sostituire:
runCallbackQueqe({
    watcherByProp: state.watcherByProp, // Cambiato da callBackWatcher
    prop,
    newValue: store[prop],
    oldValue: oldObjectValues,
    validationValue: validationStatusObject[prop],
    instanceId,
});

/**
 * =====================================================
 * FILE: store-emit.js
 * Aggiornare storeEmit() e storeEmitAsync()
 * =====================================================
 */
// In storeEmit() sostituire:
runCallbackQueqe({
    watcherByProp: state.watcherByProp, // Cambiato da callBackWatcher
    prop,
    newValue: store[prop],
    oldValue: store[prop],
    validationValue: validationStatusObject[prop],
    instanceId,
});

// In storeEmitAsync() sostituire:
await runCallbackQueqeAsync({
    watcherByProp: state.watcherByProp, // Cambiato da callBackWatcher
    prop,
    newValue: store[prop],
    oldValue: store[prop],
    validationValue: validationStatusObject[prop],
    instanceId,
});


/**
 * =====================================================
 * FILE: store-set.js
 * Aggiornare la pulizia della memoria
 * =====================================================
 */
export const storeQuickSetEntrypoint = ({ instanceId, prop, value }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;
    const { store, watcherByProp } = state; // Aggiornato

    const oldVal = store[prop];
    store[prop] = value;
    updateMainMap(instanceId, { ...state, store });

    runCallbackQueqe({
        watcherByProp, //  Aggiornato
        prop,
        newValue: value,
        oldValue: oldVal,
        validationValue: true,
        instanceId,
    });
};
/**
 * =====================================================
 * FILE: destroy.js
 * Aggiornare la pulizia della memoria
 * =====================================================
 */
export const destroyStoreEntryPoint = (instanceId) => {
    const state = storeMap.get(instanceId);
    if (!state) return;

    // RIMUOVERE:
    // state.callBackWatcher.clear();

    // AGGIUNGERE:
    state.watcherByProp.clear();
    state.watcherMetadata.clear();

    // ... resto invariato (callBackComputed.clear(), etc.)
};

```
