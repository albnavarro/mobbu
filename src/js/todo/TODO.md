# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.


# MobJs

### setState/updateState
- Evitare la mutazione dello stato piu volte nellos tesso loop ( similare a `computed` )
- Il seguente approccio funziona, ma sul destroy `setState/updateState` possono non essere lanciati, o cmq danno problemi.
```js
// src/js/mobjs/component/index.js

/**
 * Avoid multiple state mutation of same prop in same javascript loop.
 */
const propsQueque = new Set();

return {
    getState: () => store.get(),
    setState: (prop = '', value = {}, fire = true) => {
        const isFreezed = getFreezePropStatus({ id, prop });
        const propsIsRunning = propsQueque.has(prop);

        if (propsIsRunning || isFreezed) return;

        propsQueque.add(prop);
        store.set(prop, value, fire);

        mobCore.useNextLoop(() => {
            propsQueque.delete(prop);
        });
    },
    updateState: (
        prop = '',
        updateFunction = () => {},
        fire = true,
        clone = false
    ) => {
        const isFreezed = getFreezePropStatus({ id, prop });
        const propsIsRunning = propsQueque.has(prop);

        if (propsIsRunning || isFreezed) return;

        propsQueque.add(prop);
        store.update(prop, updateFunction, fire, clone);

        mobCore.useNextLoop(() => {
            propsQueque.delete(prop);
        });
    },
```

### Global store
- Nella funzione inizializeApp aggiungere `globalStore`, `invalidate` potrá usare uno store esterno per la reattivitá.
- Il contenuto del watcher corrente `inizializeInvalidateWatch` dovrá essere estratto per essere unato anche dalla nuova funzione watch
- La distruzione del watcher avvine come ora per il watcher di default ( legato allo stato del componente ).

```js
    inizializeApp({
        rootId: '#root',
        contentId: '#content',
        wrapper,
        globalStore: myStore
        ...
    });


    ${invalidate({
        bind: 'anchorItems',
        bindGlobal: 'myState', // Opzionale
        render: () => {
            return getButtons({
                delegateEvents,
                bindProps,
                setState,
                getState,
            });
        },
    })}

```

### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

### Type
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`

### Docs
- In ognisezione corrispondente aggiungere glie sempi tipi.
    - `MobComponent` ( state && methods ).
    - `MobComponentAsync` ( state && methods.
    - Singoli come `SetState`.
    - `ReturnBindProps`.
    - `UseMethodByName` && `useMethodArrayByName`


# Mob motion

### Plugin

### AsyncTimeline
- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

### Sequencer
- default `start`: ultimo `end` in ordine di inserimento.
- Aggiungere span:<br/>

```
    mySequencer
        .goTo( { x:10 }, { start: 2, end: 4}); // 1
        .goTo( { x:20 }, { span: 2 }); // 3
        .goTo( { y:20 }, { start: 2, span: 2 }); // 3
```
- 1: parte da 2 e finisce a 4. ( logica corrente ).
- 2: parte da 4 e finisce a 6.
- 3: parte da 2 e finisce a 4.

