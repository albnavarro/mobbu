# App
- Usare per i colori le variabili css.

# MobJs

## IL modulo bindEffect non puó essere applicato direttamante alla creazione del componente ( nel component parente ).

##### Plan:
**src/js/mob/mob-js/constant.js**
```javascript
export const ATTR_BIND_EFFECT = 'bindeffect';

// Nuovo specifico per le istanze definite nel parent
export const ATTR_BIND_EFFECT_INSTANCE = 'bindeffect_instance';
```

**src/js/mob/mob-js/web-component/user-component.js**
- Aggiungere nel detect degli attrituti `ATTR_BIND_EFFECT_INSTANCE`
- Il nuovo parametro dovrá essere copiato dal placeHolder alla root del componente finale.

**src/js/mob/mob-js/parse/steps/from-object.js**
- Se componentKey é valorizzato il modulo `ATTR_BIND_EFFECT` sará appeso come `ATTR_BIND_EFFECT_INSTANCE`
- Prevedere un` new Map()` dove aggiungere le eccezzioni ( ad ora solo bindEffetct ).
```javascript
const modulesaPair = new Map([ATTR_BIND_EFFECT: ATTR_BIND_EFFECT_INSTANCE]);
```

- In questo modo si evitano conflitti e sará possibile aggiungere il modulo:
   - nella root del componente
   - Quendo si richiama come istanza nel parent.


**src/js/mob/mob-js/parse/steps/convert-to-real-element.js**
- Copiare come per gli altri attributo il nuovo `ATTR_BIND_EFFECT_INSTANCE`

**src/js/mob/mob-js/parse/parse-function-while.js**
- a quest punto si potrá richiamare la creazione di due moduli separati.

```javascript
applyBindEffect(element, ATTR_BIND_EFFECT);
applyBindEffect(element, ATTR_BIND_EFFECT_INSTANCE);
```



## Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

## New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

## Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

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

