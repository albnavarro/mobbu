# MobJs

## 1. BindStore.
- Il miglioramanto della selezione della propietá di uno store `bindato` é sempre attuale.
- Possiamo anche ipotizzare di modificare solo la dichiarazione secondo il seguente schema:
```javascript
...
bindStore: [{ store: MobJs.mainStore, pick: ['prop', 'prop2'] }],
...
```

- Cosi rendiamo esplicito nella definizione il nome delle prop usate.
- In mobStore raccolgiamo in un `new Set()` tutti i pick e se necessario li usiamo per filtrare.
- La cosa piu importante e che i nome delle prop siano in chiaro nella definizione per essere subito visibili, un pó come fosse un commento.
- L'ideale poi e usarle nello store come filtro generico per tutti gli store `bindati`.




## 2. Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

## 3. New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

## 4. Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

## 5. attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## 6. Quickset
- Aggiungere `Quickset`.

## 7. Debug
- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

### MobScroller

## 1. Gap:
- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

## 2. Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

## 3. SetTween.
- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???
