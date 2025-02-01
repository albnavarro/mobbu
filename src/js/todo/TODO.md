# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.

# MobCore

### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

# MobJs

##  bindClass
- l'inizializzazione avverra con un querySelctoreAll come per `delegateEvents` alla fine del parse.
- Verrá utilizzata una `weakRef` come per bindObject
- Nella seguente soluzione `bind` sará un classe non usabile, `ma una stringa protetta`.
- Le classi saranno tutte le chiavi diverse da `bind`

```js
<div
    ${bindClass([
        {
            bind: ['myProp'], // stringa o array di stringhe.
            'my-class-name': () => proxi.value === proxi.currentIndex
        }
    ])}
></div>
```

- Segue la stessa logica di `delegateEvents`
- In piú avrá il traccimanto del component id per per ritrancciare lo stato per il watch.
- La funzione `setBindClass` aggiungerá i dati alla `mappa` e restituirá un `id uivoco`.

```js
// getParamsForComponent.js
bindClass: (classData) => {
    return `${ATTR_WEAK_BIND_CLASS}="${setBindClass({ classData, id })}"`;
},
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
