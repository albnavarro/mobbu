# Alias
- Alias: aggiungere gli alias @ !!!!

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.

# MobCore

### Default:
- Spostare mq da mobMotion a mobCore.


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
- `staticProp`: Aggiungere il generic <R> cosi come fatto per `bindProps`.
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`
- `setStateById` etc.. devono avere un generic `<T>` in entrata per allinearsi con `mobComponent`

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





