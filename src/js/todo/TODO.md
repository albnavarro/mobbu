# MobCore

### Computed
- Abilitare i `computed` in `bindStore`.

##### Steps:
- `bindInstanceBy`: Aggiungere parallelamente a `bindInstance` un  array `bindInstanceBy`, qui verranno saltavi gli `id` degli store che hanno `bindato` lo store corrente.<br/> Si dovrá aggiungere un entryPoint uguale a `bindStoreEntryPoint` ma che salverá il dato in `bindInstanceBy`.<br/>L' `id` corrente verrá aggiunto allo store dell' `id` bindato.
- Nel metodo `destroy` dello store bisognerá rimuovere il propio `id` dalla propietá `bindInstanceBy`, aggiungere perció una nuova funzione `removeBindedInstanceBy`.
- `initializeCompuntedProp` e `fireComputed` dovrenno cercare la `prop` anche negli store bindati.
- `addToComputedWaitLsit` deve essere chiamata per ogni `id` presente in `bindInstanceBy`:

```js
addToComputedWaitLsit({ instanceId, prop });
bindedArray.forEach((id) => {
    addToComputedWaitLsit({ id, prop });
})
```



##### Computed immediate.
Usare `{ immediate: true }` come default ?

### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

# MobJs

## Page transition.
- Possibilitá di sovrascrivere le due funzioni per rotta.

## Props ( export props ), da valutare ??
- Prevedere che gli stati esportati all' interno del componente siano usati `readOnly`
- Tenere conto del proxi.


## Repeat
#### Use object
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

## Quickset
- Aggiungere `Quickset`.

## Debug
- Add `debug` ( params in componentFunction ) in DOCS.

## Docs
- In ognisezione corrispondente aggiungere glie sempi tipi.
    - `ReturnBindProps`.
    - `UseMethodByName` && `useMethodArrayByName`


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
