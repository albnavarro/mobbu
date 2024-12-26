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

### bindProxi
- Aggiungere dei controlli per eliminare caratteri come `;` quanso si estrapolano le props da monitorare.
- `bindProxi` puó usare solo index, sarebbe carino poterlgi passare anche `current.value.myProp`

### Repeat
#### Refactor per utilizzare repeat anche senza componenti.
- L' introduzione del proxi all' interno del repeater apre nuove strade:
- Repeat funziona solo con componenti innestati al momento.
- La traccia dell' item `root` di ogni repeat potrebbe essere salvata nella mappa del repeat.
- Si puó usare la mappa `repeatIdPlaceHolderMap` dove giá abbiamo salbato la root del repeat.
- La chiave di questa mappa é il repeat id.
- La mappa andra aggiornata con i valori:
```js

{
    element : div.c-dynamic-card__repeater,
    initialized : true,
    scopeId : "_zqk8q70",
    key: < repeatPropBind >,
    children: [
        {
            index: 1,
            value: <key value>
            element: <root-item-element>
        },
        {
            index: 2,
            value: <key value>
            element: <root-item-element>
        }
    ]
}
```
- Creare una funzione che partendo dal repeater ( element in `repeatIdPlaceHolderMap` ) prenda tutti i childNodes di primo livello, e gli abbini value e index nell' ordine in cui si trova lo stato a quel momento..
- La funzione verra lanciata per inizializarsi qui:
- Il posto devo lanciare la funzione la prima volta sembra questo: `src/js/mobjs/modules/repeater/action/setRepeaterPlaceholderMapInitialized.js`
- E rilanciata dopo ogni update.
- update with e without key usaranno questo array che sará sempre aggiornato con le giuste posizioni.
- Tutti i riferimenti a `repeaterInnerWrap, currentRepeaterState, repeatPropBind` all'interno del componente potranno essere eliminati.
- `bindProp/bindEvents/delegateEvents` non useranno piú `value` e `index`.
- `useSync` non servirá piú, non si prevedono piú data da passare ai componenti.
- Il webComponent use potrá essere ripultito.

#### Roadmap
1) Aggiungere i valori alla mappa, e creare la funzione che genera l'array.
2) Aggiornate le due update function con e senza chiave
3) aggiornare il nuovo array alla fine dell' update.
4) cominicare a rimuovere 1 a 1 le vecchie funzioni ormai superflue.


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
