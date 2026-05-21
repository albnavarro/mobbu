# Accessibility:
1. `MobCore`: creare `useEscHandler()` && `useTabHandler({ direction })`

2. Usare i nuovi due eventi in:
   - src/js/component/common/debug/debug-overlay/debug-overlay.js
   - src/js/component/common/search/search-overlay/search-overlay.js
   - src/js/component/layout/navigation/nav-container.js
   - src/js/component/pages/animated-pattern/n0/animated-pattern-n0.js
   - src/js/component/pages/async-timeline/async-timeline.js
   - src/js/component/pages/canvas/n1/caterpillar-n1.js
   - src/js/component/pages/canvas/n2/caterpillar-n2.js
   - src/js/component/pages/move-3d/move-3d-page.js
   - src/js/component/pages/rosa-di-grandi/rosa-di-grandi-page.js
   - src/js/component/pages/scroller/n0/scroller-n0.js
   - src/js/component/pages/scroller/n1/scroller-n1.js

3. I componenti che usan `smooth-scroller` devono avere la cta per tornare in cima.

4. Smooth scroller accessibility ?

5. FocusRouter(<alias elemento>)

6. `<Dialog>` per muovere velocemente il focus nelle macroaree del sito per template.

7. Le ancore devono spostare il focus.


# MobJs

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

