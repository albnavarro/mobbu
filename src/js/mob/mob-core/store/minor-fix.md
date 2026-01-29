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



