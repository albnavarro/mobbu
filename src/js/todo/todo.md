# App:

- Aggiungere pagine `500` speculare alla pagina `400`.

- `Sharia coding`:
    - Prevedere link in home.
    - Lettegin semplice: `Sharia coding`.
    - `Taliban style` `Indo-kush vibe`.
    - `Left`: `mullha Omar` con coltelli e mano che cerca `ai`, faccia grossa, corpo piccolo con coltello.
    - `Right`: lista di regole
        - Rules:
            - Use and update  you project static analyzer instead AI.
            - No alcol, no herbs, use mushroom to expand allucination not AI.
            - Rationalize Chaos use `Melt Banana` power

- `Shiva coding`
    - Prevedere link in home.
    - Lettegin semplice: `Shiva coding`.
    - Concept: `no pendencies`, `no sovrastutture` focus sulla tua logica, testa con pochi pensieri e ditrazioni.
    - `Left`: `Shiva` ...
    - `Right`: lista di regole
        - Rules:
            - Use and update  you project static analyzer instead AI.
            - No alcol, si herbs, si mushoroom.



# MobCore

### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.


### eslint:
- Valutare per ora solo a livello di store https://github.com/eslint-functional/eslint-plugin-functional

### Store - deepEquality:
- Agiungere `deepEquality`, basta un `JSON.stringigfy(current) === JSON.stringigfy(current)`.
- Utile per `array/object`.
- Rivedere un controllo piu permissivo e veloce per gli `oggetti`?

# MobJs

## removeCancellableComponent
- Usare un evento apposito in `mainStore` che viene scatenato al momento di cancellare i componenti.
- `src/js/mob/mob-js/component/index.js` lanciare `removeAndDestroyById()` e `unsubscribe` all' evento.
- usare `mainStore` all' interno della funzione che restituisce il component potrebbe portare problemi di GC, in sospeso.

## src/js/mob/mob-js/parse/steps/get-params-from-web-component.js
- parent id ternario innestato, semplificare.

## DOCS:
- Spiegare i meccanismi base `html-element`, consumo memoria etc.., fare sezione apposta.

## src/js/mob/mob-js/doc/ ?
- Aggiungere:
    - Parent id logic.
    - Repeat `element` vs `innerWrapper` vs `repeatIdPlaceHolderMap` ( use external map children propierties, es: `getRepeaterChild()` ).
    - Nel caso integrare con il punto seguente.

## Repeater Proxi
- Aggiunto `warning` quando ci sono le chiavi duplicate in:<br/>
 `src/js/mob/mob-js/modules/repeater/update/get-proxi.js`
- E' possibile correggere la situazione a monte ?

## ParserHTML
#### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

#### Render return object.
- Funizione utility che converte un `oggetto` in `html`.

## Search
- Splittare `currentSearch` per spazi ?

## BindStore
- Capie se é possibile usare gli stati di bindStore come, per rendere il tutto piú chiaro:
- **Problema:** se non si usa il proxi il discorso non funziona piú `otherStore.proxi` in formato stringa non puó funzionare.

```js
// da:
proxi.state

// a:
proxi.otherStore.state
```
## Web component:

#### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

## BindProps:

- Valutare await `applyBindProps` in `parse-function.js`

```js
initializeBindPropsWatcher: async () => {
    await applyBindProps({
        componentId: id,
        repeatPropBind,
        inizilizeWatcher: true,
    });
},
```

```js
for (const item of functionToFireAtTheEnd.reverse()) {
    const {
        onMount,
        initializeBindPropsWatcher,
        fireInvalidateFunction,
        fireRepeatFunction,
    } = item;

    await onMount();
    fireRepeatFunction();
    fireInvalidateFunction();
    await initializeBindPropsWatcher();
}
```

## Page transition.

- Possibilitá di sovrascrivere le due funzioni per rotta.

## Props ( export props ), da valutare ??

- Prevedere che gli stati esportati all' interno del componente siano usati `readOnly`
- In generale basta agire in `src/js/mob/mob-js/component/index.js` e aggungere `checkIfStateIsExportable(...)`, `setStateById()` agisce direttmante sull' istanza store perció questo controllo non ha effetto su `bindProps()`
- Tenere conto del proxi: getProxi puó avere una propietá `{excludeSet = []}` che puó essere valorizzata da `src/js/mob/mob-js/component/index.js`,
- Raccogliere tutti gli stati esportabili e passargli a `excludeSet`

```js

// stati esportabili
const exportableState = getExportableState({ componentName });

...
getProxi({ excludeSet: exportableState })
```



## Repeat

#### Use object

- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

## Quickset

- Aggiungere `Quickset`.

## Debug

- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

### AsyncTimeline

- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

### Sequencer

- default `start`: ultimo `end` in ordine di inserimento.
- Aggiungere span:<br/>

```
    mySequencer
        .goTo( { x:10 }, { start: 2, end: 4}); // 1
        .goTo( { x:20 }, { span: 2 }); // 3
        .goTo( { y:20 }, { start: 2, span: 2 }); // 3
```

- 1: parte da 2 e finisce a 4. ( logica corrente ).
- 2: parte da 4 e finisce a 6.
- 3: parte da 2 e finisce a 4.
