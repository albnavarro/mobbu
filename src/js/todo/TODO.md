# Priority:
- `bindProxi`: miglior tracciamento delle dipendenze per pote rusare `current.value.myProp` all' interno di un repeater.
- `repeater`: refactor, Salvare i nodi root dei singoli repeater nella mappa del repeater e eliminare i riferimenti current,index dai componenti.

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.

# MobCore

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

##  bindClass
- l'inizializzazione avverra con un querySelctoreAll come per `delegateEvents` alla fine del parse.
- Verrá utilizzata una `weakRef` come per bindObject
- `Performance`: inizializzare una variabile `shouldQueryBindClass` che si mette su `true` al primo bindClass usato, si rimetterá su `false` alla fine del parse.
- Il query selectorAll verrá inizializzato solo se `shouldQueryBindClass` é `true`.
- Lo stesso meccanismo puó essere utilizzato per `delegateEvents`.

```js
<div
    ${bindClass([
        {
            bind: ['myProp'], // bind: 'myProp'
            className: 'my-class-name',
            toggle: () => proxi.value,
        },
    ])}
></div>
```

## Repeat
#### Use object
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

### Quickset
- Aggiungere `Quickset`.

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
