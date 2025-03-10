# MobCore

##### Computed immediate.
Usare `{ immediate: true }` come default ?

##### Computed auto.
- Spostare le dipendenze in fondo in mobo che siamo opzionali:
```js
storeTest.computed('myComputed2',({ myComputed }) => {
    return myComputed * 2;
}, ['myComputed']);
```

- Se dipendenze sono vuote si abilita la modalitá auto.
- Sará necessario usare il `get` del `proxi` ( al momento non viene usato ).
```js
storeTest.computed('myComputed2',() => {
    return proxi.myComputed * 2;
});
```

- in questa esecuzione della funzione il `get del proxi` potrá tracciare la sua chiave e aggiungerla come dipendenza.
- Il `proxi` fará questo lavoro solo se `currentProp !== undefined `.

```js
// `Globale` in un contesto ( file ) separato.
let current_computed_keys;

export const initializeCurrentComputedKey  = () => {
    current_computed_keys = [];
}

export const resetCurrentComputedKey  = () => {
    current_computed_keys = undefined;
}

export const setCurrentComputedKey = (key) => {
    // Controllo di sicurezza.
    if(current_computed_keys?.length === 0) return;
    current_computed_keys = [...current_computed_keys, key];
}

export const getCurrentComputedKey = () => {
    return current_computed_keys;
}
```

```js
export const storeComputedAction = ({ instanceId, prop, keys, fn }) => {
    //
    const keysParsed =
        keys.length === 0
            ? (() => {
                  initializeCurrentComputedKey();
                  fn({}); // Il get del proxi agirá qui.
                  return getCurrentComputedKey();
              })()
            : keys;

    resetCurrentComputedKey();
}
````

- In questo modo eliminamo `{ immediate }` che sará `true` di default.


### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

# MobJs

## Namespaces:
- Create un `namespaces` come per `MobCore` & `MobTween` etc...
```js
MobJs.inizializeApp()
MobJs.setDefaultComponent()
MobJs.createComponent()
etc...
```

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

## MobScroller
- Usare `reverse` al posto di `fromTo`


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
