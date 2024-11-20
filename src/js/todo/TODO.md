# Priority

## MobJs
### Ivalidate/repeater
- `Invalidate/repeater`: `after/before` update vanno lanciati anche la prima volta

### Global store
- Nella funzione inizializeApp aggiungere `globalStore`, `invalidate` potrá usare uno store esterno per la reattivitá.
- Il contenuto del watcher corrente `inizializeInvalidateWatch` dovrá essere estratto per essere unato anche dalla nuova funzione watch
- La distruzione del watcher avvine come ora per il watcher di default ( legato allo stato del componente ).

```js
    inizializeApp({
        rootId: '#root',
        contentId: '#content',
        wrapper,
        globalStore: myStore
        ...
    });


    ${invalidate({
        bind: 'anchorItems',
        bindGlobal: 'myState', // Opzionale
        render: () => {
            return getButtons({
                delegateEvents,
                bindProps,
                setState,
                getState,
            });
        },
    })}

```

- `MouseParallax`.
- `Dragger`.


# General
- Alias: aggiungere gli alias @ !!!!

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.


# MobJs

### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

### Type
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`

### Component
- props per diabilitare il `restoreScroll` nella singola definizione del componente ( vedi `horizontalScroll` ).

### Methods
- Capire come gestire i tipi sui metodi.
    - Fare un tipo apposito come per lo stato pasarlo come `Methods<myInterface>`.


# Mob motion

### Plugin
- Sostiuire i typedef con delle interfaccie.
- Abilitare TS check.
- Slide passare da Array a Map con Element come chiave.

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

