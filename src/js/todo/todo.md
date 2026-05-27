# Accessibility:
1. rs-annuncient : bozza logica allegata
   - Rispetto alla traccia non forziamo il focus sul main ma lasciamolo dove si trova.
   - Annunce esporra il name della nuova rotta e le areee attive solo se sono diverse dalle precedenti ( confronto tra template corrente e precedente ).
   - Suggestion: mandare annuncio quando la suggestion list si apre.
   - Stessa cosa per i risultati della ricerca mandare un annuncio con la query cercata, 'risultati per X'
2. aria-label su toggle degli snippet.
3. debug filter update move(0) list.

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

## SmoothScroller
- Add useArrowHandler facoltativa:
- Bozza veloce:
- Creare mobCore arrow-handler pub/sub.
- Rinominare tutti i subscribe in unsubscribe.

```javascript
if (this.#screen !== globalThis) {
    /** @type {HTMLElement} */ (this.#screen).addEventListener(
        'keydown',
        (event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
                return;

            const valueToAdd = event.key === 'ArrowDown' ? 100 : -100;
            this.#endValue = clamp(
                Math.round(this.#endValue + valueToAdd),
                0,
                this.#maxValue
            );

            /**
             * Preveniamo il caso in cui la gesture `enter` venga interpretata come mouseClick.
             *
             * - In questo case il check `preventChecker` impedirebbe di eseguire l'azione di click
             * - FirstTouchValue && endValue devono coincidere, non stiamo draggando l'elemento, ma il sistema puo
             *   pensare di si.
             */
            this.#firstTouchValue = this.#endValue;
            this.#updateScrollState();
            this.#executeScroll();
            event.preventDefault();
        }
    );
}
```


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

