# App
- Usare per i colori le variabili css.

# MobJs

## fromObject step 2. ?? valutare se é il caso di eseguirlo.
### 1 Dopo aver converito tutto con fromOject.

### 2 Repeater/Invalidate
    - torneranno un array:
    - `return [webcomponent, nodo1, nodo2 ]
    - I moduli andranno spreddati all' uso
    - ...invalidate({ ... })

**Prima di convertire in DOM reale ( step 3 )**
- eliminare `join('')` dai map ( es. invalidate benchmark ).
- applicare fix come sopra e vedere che sia ok,
- Invalidate accettare `string` e `string[]`
- Invalidate potrebbe reallentare

### 3 Repeater/Invalidate
- Tornare un elemento del DOM reale e allineare mobjs.
- Punti critici:
    - Invalidate al momento non accetta array.
    - Approfondimento nel prossimo punto:


## Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

## New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

## Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

## Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

## attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## Quickset
- Aggiungere `Quickset`.

## Debug
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

