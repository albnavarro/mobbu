# Deps
Valutare migrazione a `eslint-plugin-import-x` e finire l'update delle deps con `eslint 10`


# App

## 1. Debug.
- Fare `child` e `parent` cliccabili per accedere direttamante al dettaglio.
- Prevedere uno storico della navigazione dei componenti.


# MobJs

## 1. Repat/Invalidate:
Organizzare le action dei due moduli secondo lo schema:
- `/module-name/action/set/`
- `/module-name/action/get/`
- `/module-name/action/initialize/`
- `/module-name/action/destroy/`


## 2. Il modulo bindEffect non puó essere applicato direttamante alla creazione del componente ( nel component parente ).

##### Plan:
**src/js/mob/mob-js/constant.js**
```javascript
export const ATTR_BIND_EFFECT = 'bindeffect';

// Nuovo specifico per le istanze definite nel parent
export const ATTR_BIND_EFFECT_INSTANCE = 'bindeffect_instance';
```

**src/js/mob/mob-js/parse/steps/from-object.js**
- Intercettare un componente registrato.
   - Step 1: `compenentKey` é valorizzato
   - Step 2:  controllare che il `tag` sia nella lista dei componenti registrati.
   - Conviene creare un `new Set()` es: `availableComponentSet` che deriva da `componentListMap` per fare una semplice operazione come: `availableComponentSet.has(tag)`
- In questo modo intercettiamo i componenti aggiunti con `component` o componenti dinamici aggiunti con la propietá `tag`.
- Se abbiamo in un componente il modulo `ATTR_BIND_EFFECT` sará appeso come `ATTR_BIND_EFFECT_INSTANCE`
- Prevedere un` new Map()` dove aggiungere le eccezzioni ( ad ora solo bindEffetct ).
- Per cui conviene creare due cicli for appostivi uno per i `tag` e uno per i `component`.

```javascript
const modulesaPair = new Map([ATTR_BIND_EFFECT: ATTR_BIND_EFFECT_INSTANCE]);
```

**src/js/mob/mob-js/web-component/user-component.js**
- Aggiungere nel detect degli attrituti `ATTR_BIND_EFFECT_INSTANCE`


**src/js/mob/mob-js/parse/steps/get-params-from-web-component.js**
- Prendere l' id del modulo come fatto per gli altri con il metodo creato in `user-component`
- Faremo riferimento sempre a `ATTR_BIND_EFFECT_INSTANCE`

**src/js/mob/mob-js/parse/parse-function-while.js**
- una volta che `newElement` e pronto, chiamare un nuovo metodo apposito da `src/js/mob/mob-js/modules/bind-effetc/index.js` .
- di base il nuovo entry point di `bindEffetct` fará:

```javascript
const data = bindEffectMap.get(id);
watchBindEffect({ data, element: newElement });
````

## 3. BindStore.
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




## 4. Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

## 5. New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

## 6. Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

## 7. attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## 8. Quickset
- Aggiungere `Quickset`.

## 9. Debug
- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

### MobScroller

## 1. Gap:
- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

## 2. Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

## 3. SetTween.
- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???
