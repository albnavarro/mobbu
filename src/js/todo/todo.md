# Prioritá

0. `ComponentMap` funzione che ritorna una copia come nello `store`.
1. `BindObject/BindText/BindEffect` potrebbero scrollegarsi prima senza aspettare il deref() che diventerebbe un check si sicurezza.
    - [detail:](#BindObject/BindText/BindEffect)
2. `BindEffect/BindObject/BindText`, await repeat/invalidate.
    - [detail:](#await-repeat-invalidate)
3. La funzione html potrebbe tornare un oggetto del seguente tipo in previsione del punto `( 6 )`.
    ```js
    {
        type: ('string', value);
    }
    ```
4. Component render puó ritornare un `oggetto` al posto del DOM formato `stringa`, che verrá convertito direttamante in DOM Element.
5. Custom component: aggiungere la possibilitá di usare `connectedMoveCallback`.
6. Component app: `dragger` con `pinch zoom`.

# App

### Docs: AsyncTimeline

- Breve riassunto con lista puntata delle feature.

# Store/MobJs:

### Map & Set

- Scenario 1: Clonando il Map/Set avró il `precendente` é il `successivo` diversi.

```js
// definition
myMap: () => ({
    value: new Map(),
    type: Map,
}),

// component
watch(
    () => proxi.myMap,
    (current, previous) => {
        console.log(current, previous);
        console.log(current.get(counter));
    }
);

updateState(
    'myMap',
    (value) => {
        return value.set(counter, counter * 10);
    },
    { clone: true }
);


//log:
Map(2) {1 => 10, 2 => 20} // current
Map(1) {1 => 10} // previous
20 // current.get(counter)
```

- Scenario 2: usando il `proxi/Set` e `skipEqual = false` avró una modifica diretta sul `precendete` ma il `Map` verrá cmq. sovrascritto.

```js
myMap: () => ({
    value: new Map(),
    type: Map,

    // la modifica diretta senza clone modificherá il previous.
    // il previous sará uguale al corrente, vá sempre mantenuto false.
    skipEqual: false,
}),

// component
watch(
    () => proxi.myMap,
    (current, previous) => {
        console.log(current, previous);
        console.log(current.get(counter));
    }
);

// proxi
proxi.myMap = proxi.myMap.set(counter, counter * 10);

// set
setState(() => proxi.myMap, proxi.myMap.set(counter, counter * 10));

//log:
Map(2) {1 => 10, 2 => 20}
Map(2) {1 => 10, 2 => 20}
20 // current.get(counter)
```

#### Proposta:

- Aggiungere `skipUpdate` in modo che nello scenario 2 il `Map/Set` non venga aggirnato, che per un `Map/Set` ha senso essendo una primitiva di per sé mutabile.
- Inoltre senza clonare il `Map/Set` e settando `skipEqual = false` il dato viene cmq. aggiornato nello store ( il `previous` ).

```js
myMap: () => ({
    value: new Map(),
    type: Map,

    // la modifica diretta senza clone modificherá il previous.
    // il previous sará uguale al corrente, vá sempre mantenuto false.
    skipEqual: false,

    // non si sovrascrive mai la mappa sfruttando la mutabilitá.
    skipUpdate: true
}),
```

- Questo puó valere anche per `Array.push()`.
- Opzione 1) aggiungere il controllo dopo `isEqual`.
- Opzione 2) aggiungere il controllo prima di `isEqual` e se `skipUpdate === true` `skipEqual` viene bypassato ( cosi basta mettere `skipUpdate` ).
- Sarebbe meglio estendere il comportamanto anche a `setObj` oltre che ha `setProp`.

```js
// src/js/mob/mob-core/store/store-set.js
/**
 * Check if last value is equal new value. if true and skipEqual is true for this prop return.
 */
const isEqual = skipEqual[prop]
    ? checkEquality(type[prop], oldVal, valueTransformed)
    : false;
if (isEqual) return;

/**
 * Finally set new value
 */
store[prop] = valueTransformed;
```

### New Observe props.

- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

### eslint:

- Valutare per ora solo a livello di store https://github.com/eslint-functional/eslint-plugin-functional

### Store - deepEquality:

- Agiungere `deepEquality`, basta un `JSON.stringigfy(current) === JSON.stringigfy(current)`.
- Utile per `array/object`.
- Rivedere un controllo piu permissivo e veloce per gli `oggetti`?

# MobJs

<a name="BindObject/BindText/BindEffect"></a>

### BindObject/BindText/BindEffect

#### Problema:

All' interno di un repeater senza componenti la logica delle referenze deboli funziona a meno che il numero di item non sia troppo grande, in questo caso ( ed 1000 item con 3 bindObject ) si possono avere dei leak.<br/>
In quest casi va usato un repeater con i componenti al suo interno, quando il componente viene distrutto viene scollegato anche lo store relativo invalidano di moduli.

#### Proposta:

1. Una variabile `globale` puó sapere se nel ciclo `while` di `parseComponentsWhile` vengono interecettati componenti.
    - Teoricamante se la varibile globale fosse un `contatore` sia il valore **0** ( non ci sono componenti ) o **1** ( abbiamo dei componenti ma siamo sempre al primo livello ) andrebbero bene.
2. Il `placeholder` del modulo nel metodo `connectedCallback()` puó sapere dunque se si trova all'interno di un repeater/invalidate ma fuori da un componente.
3. Creare una funzione chiamata `getAllActiveRepeater()` in `src/js/mob/mob-js/modules/repeater/active-repeater/index.js`, tornará un Set in cui ci sono le informazioni del repeater attivo.
    ```js
    export const getAllActiveRepeater = () => {
        return [...activeRepeatMap];
    };
    ```
4. Nota: `activeRepeatMap` si dovrebbe chiamare `activeDynamicBlockSet()` e dovrebbe tracciare sia `repeater` che `invalidate` ( con la modifca che estende il controllo anche agli invalidate ).
5. Con queste informazioni possiamo creare una nuova mappa in cui ad ogni id di `repeat` o `invalidate` si puó collegare un array di id di moduli `bindText/bindObject/bindEffect` che saranno soggetti al controllo.

Da migliorare/verificare:

- Il Set legato ( ad ora ) al `repeater` ( in futuro anche `invalidate` ) attivo traccia lo stato da osservare.
- Basta a questo punto aggiungere un `watcher` sullo stato e vedere un frame dopo se `ref.deref().parentNode` esiste ancora.
- Quest'ultima soluzione non é entusiasmante, l' ideale e che `bindObject` etc.. sapessero se il loro elemento esiste ancora dai dati dello stato in quel momento, ma qui é un pó piu complesso, pensiamoci.

<a name="await-repeat-invalidate"></a>

### BindEffect/BindObject/BindText await

- Questi moduli potrebbero iplementare:

```js
return watchById(id, state, async () => {
    await repeaterTick({ debug: true });
    await invalidateTick({ debug: true });
```

- Secondo tentativo, capire dove fallivano la volta precedente, non noto errori ora.

### Create component:

- Prendere due picconi con una fava.
- Potrebbe tornare un oggetto con:
- L' idea é di rendere accessibile goTo definition nel tag
- In questo modo non bisogna nenache registrare il componente.
- Sarebbe anche meglio aggiungere un if per caricare il componente una volta sola.
- Non bisogna nenache passargli i figli.
- Quando il component viene richiamato verrá inserito nella lista dei componenti.

```js
   export const createComponent = ({
       tag = '',
       component = () => '',
       state = {},
       bindStore,
       exportState = [],
       scoped,
       connectedCallback = () => {},
       disconnectedCallback = () => {},
       adoptedCallback = () => {},
       attributeToObserve = [],
       attributeChangedCallback = () => {},
       style = '',
       child = [],
   }) => {
       /**
        * Se tag non é presente in availableComponent Fare un funzione che fá il check if .....
        */

       useComponent([
           {
               [tag]: {
                   componentFunction: component,
                   componentParams: {
                       exportState,
                       scoped,
                       state,
                       bindStore,
                       connectedCallback,
                       disconnectedCallback,
                       adoptedCallback,
                       attributeToObserve,
                       attributeChangedCallback,
                       style,
                       child,
                   },
               },
           },
       ]);

       return tag;
   };


   export const BenchMarkRepeatNoKey = MobJs.createComponent(
       /** @type {CreateComponentParams<import('../type').BenchMark>} */
       ({
           tag: 'benchmark-repeat-no-key',
           component: BenchMarkRepeatNoKyFn,
           ...benchMarkDefinitionPartial(),
       })
   );

   <${BenchMarkRepeatNoKey}><${BenchMarkRepeatNoKey}>
```

### Routing:

- Rendere opzionale il blocco sul caricamento della stessa rotta.

### PageTrasition:

- possibilitá di disabilitare le trasizioni di pagina per rotta ( nella definizione della rotta ).

### src/js/mob/mob-js/parse/steps/get-params-from-web-component.js

- Parent id ternario innestato, semplificare.
- Idealmante con `weakElementMap` si puó usare solo una strategia.

### src/js/mob/mob-js/doc/ ?

- Aggiungere:
    - Parent id logic.
    - Repeat `element` vs `innerWrapper` vs `repeatIdPlaceHolderMap` ( use external map children propierties, es: `getRepeaterChild()` ).

### ParserHTML

#### Sanitize

- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

#### Render return object.

- Funizione utility che converte un `oggetto` in `html`.

### Web component:

#### attributeChangedCallback

- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

### BindProps:

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

### Page transition.

- Possibilitá di sovrascrivere le due funzioni per rotta.

### Repeat

#### Use object

- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

### Quickset

- Aggiungere `Quickset`.

### Debug

- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

## MobScroller

- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

### MobCore

- Parallax/Scroltriiger
- Puo usare il metodo `freezeCache` on `scrollEnd` ? ( scrollerTween/sequencer ).

### Velocity.

- Inserire nei timeTween/lerp/Spring in concetto di velocity.

#### SetTween.

- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???

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
