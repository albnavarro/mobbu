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

### bindProxi
- Aggiungere dei controlli per eliminare caratteri come `;` quanso si estrapolano le props da monitorare.
- `bindProxi` puó usare solo index, sarebbe carino poterlgi passare anche `current.value.myProp`
- il tipo  fallisce quando ci sono piu di un array.

```js
export interface PartialCurrent<T, K> {
    index: number;
    value: ArrayElement<GetState<T>[K]>;
}
```

### Repeat
#### No component
- Repeat funziona solo con componenti innestati al momento.
- La traccia dell' item `root` di ogni repeat potrebbe essere salvata nella mappa del repeat.
- Cosi si possono fare dei repeat senza componenti innestati
- Si puó usare la mappa `repeatIdPlaceHolderMap` dove giá abbiamo salbato la root del repeat.
- aggiungere un oggetto come:
```js
{
    index: 2,
    prop: key,
    value: keyValue
    element: <root-item-element>
}
```
- Difficoltá:
- Il posto giusto sarebbe `src/js/mobjs/modules/repeater/update/utils.js`
- Ma qui abbiamo per lo piu stringhe da cui non si puó dedurre l'elemento html.
- Al momento il primo nodo del `item-repeat` viene dedotto di componenti in fase di rendering.
- `Dirottare all' invalidate se non ci sono componenti potrebbe essere la cosa giusta, nel caso aggiornare la doc. In questo caso si perderebbero eventuali calssi aggiunte runtime.`

#### Use object
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

#### proxiIndex
- `Type`: Il tipo vede opzionale current.value es: `current.value?.myProp`, bisogna renderlo non opzionale.

### bindProps/bindEvent/delegateEvents
- Per coerenza ripristinare value insieme a index.
- Cmq. non verrá utilizzato, di base si usa `current` proxie from repeat.

```js
${bindProps({
    bind: ['counter'],
    props: ({ counter }, value, index) => {
        return {
            index: index,
            label: value.label,
            counter,
        };
    },
})}
```
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
