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

## refs
- Aggiornale la DOC cone le `ref/refs` per componente.
- Specificare che con gli `scoped component` le refs sui componenti non possono essere usati.

## debug
con debug attivo aggiungere `<-- nome componente -->` alla fien del componente

## repeater
#### Problema:
- Tutti i component presenti nella funzione `render` ritornata dal `repeater` a prescinedere dalla profinditá di innesto devono avere la propietá `repeatPropBind` e `currentRepeaterState` presente, non solo il componente del primo nodo.

#### Soluzione:
- Aggiungere una nuova propieta `repeaterContext` in `componentMap` in cui sará presente l' `id` del primo componente definito all' interno della funzione `render` del repeater. Il componente in questione ( primo componente/node del repeater ) ha la propietá `isRepeaterFirstChildNode = true`
- Ogni volta che il component del primo nodo verrá aggiornato verranno filtrati tutti i component che hanno nella propietá `repeaterContext` l' id del componente corrente e verra copiato il valore di `repeatPropBind` e `currentRepeaterState`

#### Come e dove
Si puó usare la stessa tecnica usata con `addSelfIdToFutureComponent` se il componente é `isRepeaterFirstChildNode` cicla sui figli `userComponent` e aggiunge la props:

- in  `parseComponentRecursive.js` righa `~200` la funzione `setRepeaterStateById()` setta la prop isRepeaterFirstChildNode, questo é il punto giusto.

Se la funzione precedente individua un `isRepeaterFirstChildNode`:
- Bastera come per `addSelfIdToFutureComponent` aggiungere direttamante nel webcomponent tramite tre setter i valori. ( dovrebbero essere trovati solo i componenti del return HTML corrente figli del primo nodo del repeater. ):
    - la nuova propietá `repeaterContext` ( id del componente corrente )
    - le due propieta `repeatPropBind` e `currentRepeaterState` iniziali. ( si useranno sempre i valori del componente corrente )
- Naturalamente bisogna evitare che i nuovi elementi figli di `isRepeaterFirstChildNode` eseguano nuovamante la funzione `setRepeaterStateById` ( non sono `isRepeaterFirstChildNode` )
- Percio nella righa `~219` nella condizione bisogna controllare che al propietá `repeaterContext` non sia impostata nel compoenente corrente.
- Poi nel watcher del repater ad ogni aggiornamanto verranno cercati nella mappa i componenti con la propietá `repeaterContext === idCorrente` per aggiornare la  propietá `currentRepeaterState`
- Nel watcher il punto giusto é: `watchList.js` righa `~204` dopo la funzione `setRepeaterStateById`

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

## tick ?
- Tutti i bindProps dovrebbero partire quando i repeater sono stati completati. Vedi codeOverlay component quando si usa await tick().
    - se il type é QUEQUE_TYPE_REPEATER alimentare una mappa parallela.
    - tickRepeater() ?

## src/js/mobjs/webComponent/
Le propieta private dell classe possono essere null|undefined.
Controllare che tutti i gatter quando vengono usati abbiano un fallback o uno skip in caso di unfdefined.





