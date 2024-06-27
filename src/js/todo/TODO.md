# Alias
- Alias: aggiungere gli alias @ !!!!

# MobCore

### Default:
- Spostare mq da mobMotion a mobCore.

### Type: feat/T1
- computed: la callback deve avere in ingresso un ogetto, cosi da facilitare i type ts in `mobJs`.
```js
  computed('pippo', ['align', 'color'], ({ align, color }) => {
      return true;
  });
```

- src/js/mobCore/store/storeSet.js: `fireComputed` righa: `506`, al posto `propValues`

```js
const valuesToObject = keys
    .map((item) => {
        return { [item]: store[item] };
    })
    .reduce((previous, current) => {
        return { ...previous, ...current };
    }, {});
```

- Finiti i type di `mobJs` migrarli su `mobStore`, mobJs li importara direttamante da mobStore.

# Mob motion

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


# MobJs

## type
- Risolvere il task `computed` in `mobStore` per finire i componenti di mobJs.
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T>

## Component
- props per diabilitare il `restoreScroll` nella singola definizione del componente ( vedi `horizontalScroll` ).

## Events
- esporre delle funzioni che ritarno i vari `afterRouteChange` etc... come svelte.
- sempre che possano convivere con i generic.

```js
beforeNavigate(({props}) => {
    ///
})
```


### Utils

```js
    setStateById(quicknavId, 'active', true);

    // aggiungere
    setStateByName('insyanceName', 'active', true);
    // cosi da evitare il passaggio di recuperare l'id
    // La stassa cosa per le altre utils simili.
```

### Methods
- Capire come gestire i metodi.
- Es:

```js
export const MyComponent = ({addMethods}) => {
    addMethods('myMethod', (param) => {
        //
    })
    ...
};
```

```js
export const MyComponent2 = ({addMethods}) => {
    const id = getIdByInstanceName('myComponent');
    useMethodsById(id, 'myMethod', param)
    ...
};
```


### Type
-



### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

### parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.
- FallBack se i vari tentativi di precompilare/resuperare il parentId falliscono dovrebbe evitare di usare qualsiasi tipo di querySelector ( setParentsIdFallback ).

## tick ?
- Tutti i bindProps dovrebbero partire quando i repeater sono stati completati. Vedi codeOverlay component quando si usa await tick().
    - se il type é QUEQUE_TYPE_REPEATER alimentare una mappa parallela.
    - tickRepeater() ?

## src/js/mobjs/webComponent/
Le propieta private dell classe possono essere null|undefined.
Controllare che tutti i gatter quando vengono usati abbiano un fallback o uno skip in caso di unfdefined.





