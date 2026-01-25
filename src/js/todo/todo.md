### Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

### Store - deepEquality:
- Agiungere `deepEquality`, basta un `JSON.stringigfy(current) === JSON.stringigfy(current)`.
- Utile per `array/object`.
- Rivedere un controllo piu permissivo e veloce per gli `oggetti`?

# MobJs

### DelegateEvents
- `currentEvent` e `target` forse sono inveriti.


### Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

### src/js/mob/mob-js/parse/steps/get-params-from-web-component.js
- Parent id ternario innestato, semplificare.
- Idealmante con `weakElementMap` si puó usare solo una strategia.

### ParserHTML

#### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

### Web component:

#### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

### BindProps:
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

### Repeat

### Quickset

- Aggiungere `Quickset`.

### Debug

- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

## MobScroller

- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

### MobCore

- Parallax/Scroltriiger
- Puo usare il metodo `freezeCache` on `scrollEnd` ? ( scrollerTween/sequencer ).

### Velocity.

- Inserire nei timeTween/lerp/Spring in concetto di velocity.

#### SetTween.

- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???

