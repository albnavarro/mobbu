- Alias: aggiungere gli alias @ !!!!

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.

# APP
### Debug component:
- tree structure espandibile
    - Basata su un unico invalidate.
    - Componente base recursivo.
    - Filtri per instance name & component name.
- Dettaglio componente.
    - Cliccabile dalla vista ad albero.
    - Ricerca per id
- Dimensione (size) delle mappe di supporto.

# MobJs

## Slot
- Creare una mappa come userMap da cui prendere gli slot se useQuery.
- In questo caso la mappa andrá distrutta dopo `convertToRealElement`
- In modo che in ogni ciclo di `parseFunction` ci siano solo gli slot del componente oggetto del parse.
- Prevedere anche con `slot unnamed` di usarli tutti come `svelte` e poter avere tanto componenti quanti sono gli slot presenti
-

## setState/updateState/setStateByName/updateStateByName
- Manca la propietá clone ereditata da mobStore `clone`


## Debug
- Add `debug` ( params in componentFunction ) in DOCS.

## Type
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

## Methods
- Capire come gestire i tipi sui metodi.


## App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

## parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.

## src/js/mobjs/webComponent/
Le propieta private dell classe possono essere null|undefined.
Controllare che tutti i gatter quando vengono usati abbiano un fallback o uno skip in caso di unfdefined.







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

