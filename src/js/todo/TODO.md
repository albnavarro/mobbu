# Priority:

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.


# MobCore

## Store

### BindStore
- Ogni store potrá essere collegato a un altro store.
- Lo store corrente potrá `leggere` lo stato di un altro store o `osservarlo ( watch )` ma non potrá modificarlo.
- `Il bind é in sola lettura, e osservazione.`
- E' importante che gli store rimangano separati, stiamo solo creando un `legame debole`.
- Ogni store ritornerá l'`id` dello e un apropietá `bind` per usare i metodi su piú store.
- Dovrebbe bastare creare un bind con `get()` e `watch`.
- MobJs potrá cosi nativamente creare collegamanti con piu store al di fuoti del componente da usare con `repeat/invalidate`
- `mobJs` Nel tipo del componente sará necessario aggiungere gli stati degli store collegati.

```js
bindedInstance = [];

return {
    getId: () => instanceId,
    bindStore: (value) => {
        const ids = checkType(Array, stores)
            ? value.map((store) => store.getId())
            : [value.getId()];

        bindedInstance = [...bindedInstance, ...ids]
    },
    get: () => {
        // Senza bind ritrna semplicemente i suoi dati.
        if(bindedInstance.length === 0) {
            return storeGetEntryPoint(instanceId);
        }

        // Ritorna tutti gli stati degli store in un unico oggetto.
        return [... bindedInstance, instanceId ].map((id) => {
            return storeGetEntryPoint(id);
        }).reduce(() => {...previous, ...current}, {})
    },
    watch: (prop, callback) => {
        const currentId = [... bindedInstance, instanceId ].find((id) => {
            // ritorna il primo instanceId che usa la prop specificata.
        }):

        return watchEntryPoint({ instanceId: currentId, prop, callback });
    },
```

```js
export const MyComponent = createComponent({
    name: 'my-component',
    component: MyComponentFn,
    exportState: [],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
    },
    bindStore: [externalStore, externalStore2]
})
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
