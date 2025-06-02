# App:

- Aggiungere pagine `500` speculare alla paginwa `400`.


# MobCore

### eslint:
- Valutare: `unicorn/no-array-for-each': 'off'` `--fix` sembra funzionare in maniera corretta.
- Valutare per ora solo a livello di store https://github.com/eslint-functional/eslint-plugin-functional

### Store - deepEquality:
- Agiungere `deepEquality`, basta un `JSON.stringigfy(current) === JSON.stringigfy(current)`.
- Utile per `array/object`.
- Rivedere un controllo piu permissivo e veloce per gli `oggetti`?

### Docs
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

### Computed/watch/invalidate/repeat/emit/emitAsync
- La chiave puó essere presa come per le dipendenze di `computed` sfruttando i proxi senza usare stringhe.
- Puó essere usata la stessa funzione usata per computed dipendencies con `{useFirst: true}`
- Computed pops va been cosi come é senza estrarla.

```js
storeTest.computed('myComputed2', () => {
    return proxi.myComputed + 1;
});
```

```js
storeTest.computed(proxi.myComputed2, () => {
    return proxi.myComputed + 1;
});
```

```js
// src/js/mob/mob-core/store/index.js
computed: (prop, callback, keys = []) => {
    // Estrarre questa funzione da usare anche per watc/invalidate/repeat.
    const propParsed = checkType(String, prop)
        ? prop
        : (() => {
              initializeCurrentDependencies();
              let fake = prop;
              fake = null;
              return getCurrentDependencies({useFirst: true});
          })();

    storeComputedEntryPoint({
        instanceId,
        prop: propParsed,
        keys,
        callback,
    });

    useNextLoop(() => {
        storeEmitEntryPoint({ instanceId, prop: propParsed });
    });
},
```

### type

- usando proxi:

```js
export type MobStoreComputed<T> = <K>(
    prop: K,
    callback: (arg0: T) => K,
    keys?: Extract<keyof T, string>[]
) => void;
```

- originale:

```js
export type MobStoreComputed<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    callback: (arg0: T) => T[K],
    keys?: Extract<keyof T, string>[]
) => void;
```

- Come farli convivere ?



# MobJs

### Route/load
- Espandere le opzioni di loadUrl,
- Params al posto di split.
- Override pageTransition

```js
MobJs.loadUrl({ url: '/#my-route', params:{ param1: '' }, useTransition: false });
```


## Web component:
#### DOCS/css
- Aggiungere snippet per box-sizing:
```css
/**
 * Esplcit box-sizing ( no inherit ).
 * Solve web component box-sizing problem.
 */
*,
*::after,
*::before {
    box-sizing: border-box;
}
```

#### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## BindProps:

- Valutare await `applyBindProps` in `parse-function.js`

```js
initializeBindPropsWatcher: async () => {
    await applyBindProps({
        componentId: id,
        repeatPropBind,
        inizilizeWatcher: true,
    });
},
```

```js
for (const item of functionToFireAtTheEnd.reverse()) {
    const {
        onMount,
        initializeBindPropsWatcher,
        fireInvalidateFunction,
        fireRepeatFunction,
    } = item;

    await onMount();
    fireRepeatFunction();
    fireInvalidateFunction();
    await initializeBindPropsWatcher();
}
```

## Props

- Aggiungere doc per passare i valori come `data-prop`.

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
