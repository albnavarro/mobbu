## Bug 1: Memory Leak & Callback Fantasma nel waitMap

## Aggiungere cleanup del waitMap nel destroy:
```javascript
// destroy.js
export const destroyStoreEntryPoint = (instanceId) => {
    // ... cleanup esistente ...

    /**
     * Rimuovi eventuali callback in attesa dal waitMap globale
     */
    waitMap.delete(instanceId);

    removeStateFromMainMap(instanceId);
};
```

#### E opzionalmente, check difensivo nel fire:
```javascript
// fire-queque.js
useNextLoop(() => {
    const propsPerIdNow = waitMap.get(instanceId);
    if (!propsPerIdNow) return; // Store distrutto, skip silenzioso

    const current = propsPerIdNow.get(prop);
    // ... resto logica ...
});
```

## Bug 2: Accesso a Store Distrutto tramite Proxy
Il Proxy in store-proxi.js non verifica se lo store è stato distrutto prima di operare. Se un componente mantiene un riferimento al proxy dopo destroy(), tentativi di lettura/scrittura producono comportamenti indefiniti.

Aggiungere verifica esplicita di esistenza store all'inizio di ogni trap:

```js
// store-proxi.js
const selfProxi = new Proxy(store, {
    set(target, prop, value) {
        // Verifica store esista ancora
        if (!storeMap.has(instanceId)) {
            console.warn(`[MobStore] Attempt to write to destroyed store: ${String(prop)}`);
            return false;
        }

        const state = storeMap.get(instanceId);
        const currentStore = storeStrategyNeedCopy() ? state.store : target;

        // ... resto logica ...
    },

    get(target, prop) {
        if (!storeMap.has(instanceId)) {
            return undefined; // O throw, o console.warn
        }
        // ... resto logica ...
    }
});
```

