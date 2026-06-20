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

## Attributes:

- Al momento non si possono applicare attributi statici ai componenti.

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

## 0. RTL. adeguare parallasse horizzontale.

## 1. Gap:

- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

## 2. Docs: AsyncTimeline

- Breve riassunto con lista puntata delle feature.

## 3. SetTween.

- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???
