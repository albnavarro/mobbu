# Accessibility:

1. rs-annuncient : bozza logica allegata
    - `Home` non ha heading, usare annucio quando si atterra in home, di base la home dovrebbe sezionare o il logo in header o la voce di menu.
    - `About` avrebbe bisogno si un annincio sul cambio item.
    - `Search` annuncio per la tendina delle suggestion.
2. aria-label su toggle degli snippet.

####

Componente `sr-update`, che al cambio rotta cambia il suo contento con il titolo della rotta.

- Il componente non deve essere visibile.
- Prima si svuota il contenuto poi si inserisce il nuovo contenuto.

```html
<div id="sr-annuncio" aria-live="polite" aria-atomic="true" hidden></div>
```

```js
this.el.textContent = '';

requestAnimationFrame(() => {
    this.el.textContent = 'Titolo';
});
```

#### I componenti che usan `smooth-scroller` devono avere la cta per tornare in cima.

#### `<Dialog>` per muovere velocemente il focus nelle macroaree del sito per template. ( non Accessibility, sviluppo personale )

- `<M>-m`: shortcut generale per il component Accessibility.
- Al primo tab eseguito dopo l'apertura il componente si apre.
- Per ogni layout ( 3/4 variati ) schema di apertura.
    - Ogni azione su una macroarea punta il focus sul container realatvo, usare `tabindex: -1` ( e corrispondente aria-label ) per dare il focus solo via javascript.

# MobJs

## InstanceName

- Spstare l'ttributo all' interno di `htmlObject`
- l'attributo diventerá `__name`.

```js
return htmlObject({
    className: MyComponent,
    InstanceName: 'my_conponent',
});
```

## Doc

- Aggiungere `basePageName` ( `MobJs.inizializeApp` )
- Aggiungere `pageName` ( `routes[...]` )

## Attributes:

- AL momento non si possono applicare attributi statici ai componenti.

## 1. Repat proxi

- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

## 2. New Observe props.

- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

## 3. Routing:

- Rendere opzionale il blocco sul caricamento della stessa rotta.

## 4. attributeChangedCallback

- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## 5. Quickset

- Aggiungere `Quickset`.

## 6. Debug

- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

### MobScroller

## 1. Gap:

- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

## 2. Docs: AsyncTimeline

- Breve riassunto con lista puntata delle feature.

## 3. SetTween.

- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???
