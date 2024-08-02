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

## ParseComponent
- Quando si sovraccarica puó tornare l'errore, capire quando bloccare tutto.
- `const useQuery = false;` spostare a livello globale.
- Tentative:
```js

// Filtrare tutti i placeholder qui con qualli parent di element.
// Cosi da evitare il find a ogni chiamata
// Fare un funzione che forza 'ordinamento per sicurezza ? vedere se impatta sulla performance.

await parseComponentsRecursive({
    element,
    isCancellable,
    currentIterationCounter: 0,
    parentIdForced,
});

cleanuserPlaceHolder();
```
- Usare la mappa anche per `addParentIdToFutureComponent({ element: newElement, id });` cosi da evitare altre query, usare sempre il controllo `const useQuery = false;`


## Nested.
- I componenti innestati possono essere creati con un parentId sbagliato.
- Solo il primo rendering dei repeater innestati ha l'id parente giusto ( es 3 repeater innestati )
- il rendering di repeater nested senza passare dal primo ha in entrata l'id parente sbagliato per il parse.
- Nel primo parse si va cascata e il meccanismo di parse forze l'id ai figli. ( `addSelfIdToParentComponent` )
- Mandando fn() senza parsare i componenti parenti il meccanismo salta.

### Nested problem:
- il tentativo di usare la propieta `componentRepeatId` (da cui recuperare il parent) nella mappa dei componenti, fallisce se viene creato un repeater partendo da una array vuoto, non ci saranno componenti possessori di questo dato.
- la funzione che deve ricevere l'id aggiornato sará questa:
```js
inizializeRepeatWatch({
    repeatId,
    state: stateToWatch,
    setState,
    emit,
    watch,
    clean,
    beforeUpdate,
    afterUpdate,
    key,
    id, // questo id deve conicidere con il primo componente che lo wrappa.
    render,
});
```

### Solution 1)
- il web Component si deve distruggere dopo il recursiveParser.
- Predisporre una query queryGenericRepeater().
- il webComponent avrá un metodo che ritorna il `repeaterId`.
- a ogni parse verrá cercato il webComponent.
- Ogni volta che viene trovato aggiungerá l'id alla mappa `repeatIdPlaceHolderMap`
- A casata ogni componente sovrascriverá questo valore.
- alla fine avremmo l'esatto componente ( id ) che wrappa il repeater.
- si porta usare nella funzione `inizializeRepeatWatch({})`
- `id: getParentRepeatId({repeatId}) ?? id`
- Risolverá l'errore di index/key ?? forse no o forse si.
- Stesso ragionamento adrá fatto per invalidate

## type
- `staticProp`: Aggiungere il generic <R> cosi come fatto per `bindProps`.
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`


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

### Methods
- Capire come gestire i metodi.
- Es: potrebbe assomigliare a setStateByName.

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
    const myComponentMethod1 = useMethodsByName('instanceName', 'myMethod1')
    myComponentMethod1(param)
    ...
};
```

### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

### parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.
- FallBack se i vari tentativi di precompilare/resuperare il parentId falliscono dovrebbe evitare di usare qualsiasi tipo di querySelector ( setParentsIdFallback ).

## tick
- `repeaterTick`, al momento bindProps usa il tick dei repeater solo in presenza di una `key`, é abbastanza ?

## src/js/mobjs/webComponent/
Le propieta private dell classe possono essere null|undefined.
Controllare che tutti i gatter quando vengono usati abbiano un fallback o uno skip in caso di unfdefined.





