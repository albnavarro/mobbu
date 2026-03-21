# App
## Passare il css a `@scope`


# Mobmotion

### Smooth-scroll

#### Snap:
##### Aggiungere:
   - `snap point`: percentiali sotto forma di array: [10, 30, 50];
   - `velocitá`: tracciare la velocitá dirante il movimento, ci basta la velocitá grezza, `x` o `x + y` ?
   - `direzione del movimento`.

##### Wheel :
   - Controllo sul `singolo wheel` la velocitá
       - `goTo`: next snap per `direzione`.

##### Drag:
   - Se `drag` controllo la velocitá sull'evento la `pointerUp`.
       - `goTo`: next snap per `direzione`.

<hr/>

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

# MobCore

### Store - watcher structure:
- `unsubscribeBindInstance` portare la logica a O(1).

# MobJs

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

