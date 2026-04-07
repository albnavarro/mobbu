# MobJs

### html
- Poter passare alla funzione un array/oggetto .
- `strings` diventerá qualcosa tipo `value` che puó essere `string` o `array/object`.
- se `string` é come ora.
- se `array/object` scrivere una funzione che trasforma `value` in un elemento DOM.

### Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

### Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

### Quickset
- Aggiungere `Quickset`.

### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

### MobScroller

##### Gap:
- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

<hr/>

### Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

<hr/>

### SetTween.
- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???

<hr/>

