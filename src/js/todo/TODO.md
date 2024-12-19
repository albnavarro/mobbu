# Priority:

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.


# MobCore

## Store

### BindStore

#### mancanti nello snippet:
- Controllare che lo store esista quando di aggiunge
- `getProxi()`: quando si usa come getter potrebbe resituire il valore, in modo da poter essere usato nella utils `bindProxi`

#### Rifinitura.
- Portare tutte le nuove funzioni come `entryPoint` e lasciare pulito l'oggetto restituito.

```js
let bindedInstance = [];
let unsubScribeBindStore = [];

/**
 * Methods
 */
return {
    getId: () => instanceId,
    bindStore: (value) => {
        const ids = checkType(Array, value)
            ? value.map((store) => store.getId())
            : [value.getId()];

        bindedInstance = [...bindedInstance, ...ids];
    },
    get: () => {
        if (bindedInstance.length === 0) {
            return storeGetEntryPoint(instanceId);
        }

        return [...bindedInstance, instanceId]
            .map((id) => storeGetEntryPoint(id))
            .reduce(
                (previous, current) => ({ ...previous, ...current }),
                {}
            );
    },
    ...
    watch: (prop, callback) => {
        if (bindedInstance.length === 0) {
            return watchEntryPoint({ instanceId, prop, callback });
        }

        const currentId =
            [instanceId, ...bindedInstance].find(
                (id) => prop in storeMap.get(id).store
            ) ?? '';

        const unsubscribe = watchEntryPoint({
            instanceId: currentId,
            prop,
            callback,
        });

        unsubScribeBindStore = [...unsubScribeBindStore, unsubscribe];
        return unsubscribe;
    },
    ...
    destroy: () => {
        bindedInstance = [];
        unsubScribeBindStore.forEach((unsubscribe) => {
            unsubscribe?.();
        });

        removeStateFromMainMap(instanceId);
    },
```

```js
export const MyComponentFn = ({ bindStore }) => {
    bindStore(myStore);
}
```


### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

### Watch
- Fare in modo che il non ci siano piu di un watch nello stesso javascript loop, il valore buono é l'ultimo.
- Propietá opzionale.
- Aggiungere come terzo parametro `useSingleLoop = false`.
- Nel `useFrame(() => {})` e il altre situazioni é utile avere un watch immediato.

```js
// src/js/mobCore/store/index.js

watch: (prop, callback, { useSingleLoop = false } = {}) => {
    return watchEntryPoint({ instanceId, prop, callback, useSingleLoop: useSingleLoop ?? false });
},
```
- Il tipo diventrá perció:

```js
export interface callbackQueue {
    callBackWatcher: Map<
        string,
        {
            prop: string;
            fn: (
                arg0: any,
                arg1: any,
                arg2: boolean | Record<string, boolean>
            ) => void | Promise<void>;
            options?: {
                useSingleLoop?: boolean;
            };
        }
    >;
    prop: string;
    newValue: any;
    oldValue: any;
    validationValue: boolean | Record<string, boolean>;
}
```

# MobJs

### bindProxi
- Aggiungere dei controlli per eliminare caratteri come `;` quanso si estrapolano le props da monitorare.

### Quickset
- Aggiungere `Quickset`.

### Repeat
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

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
