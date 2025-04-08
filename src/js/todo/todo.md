# MobCore

### eslint:
- Valutare: `unicorn/no-array-for-each': 'off'` `--fix` sembra funzionare in maniera corretta.
- Aggiungere https://github.com/gajus/eslint-plugin-jsdoc
- Valutare per ora solo a livello di store https://github.com/eslint-functional/eslint-plugin-functional

### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

# MobJs

## Props
- Aggiungere doc per passare  i valori come `data-prop`.

## bind
- La chiave 'bind', puó entrare in conflitto con `bind` function nativa.
- In `bindObject` é stato fatto un controllo che bind sia una `stringa` e non una `funzione` ( myfunction.bind() )
- Sarebbe da cambiare un' altra key piú idonea.
- Quensto si riflette su `repeat` `invalidate` etc..

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


# Mobmotion

### MobScroller
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
