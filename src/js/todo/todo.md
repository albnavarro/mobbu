# Prioritá

1. `BindObject/BindText/BindEffect` optimization all' interno di un repeat/invalidate senza componente.
    - [detail:](#BindObject/BindText/BindEffect)
2. La funzione html potrebbe tornare un oggetto del seguente tipo in previsione del punto `( 6 )`.
    ```js
    {
        type: ('string', value);
    }
    ```
3. Component render puó ritornare un `oggetto` al posto del DOM formato `stringa`, che verrá convertito direttamante in DOM Element.
4. Component app: `dragger` con `pinch zoom`.

# App

### Docs: AsyncTimeline

- Breve riassunto con lista puntata delle feature.

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

### BindObject/BindText/BindEffect all' interno di un repeater/invalidate senza componente.

- Con le ultime modifiche ogni istanza di `bindObject` etc.., si scollega molto piu rapidamente ogni qual volta il `watch` viene invocato.
- Funziona bene per i dati legati al proxi del repeater, ad ogni aggiornamanto del `repeater` gli elementi rimossi scatenano l'unsubscribe.
- Funziona meno bene per i bind diretti sullo stato del componente, per scollegarsi hanno bisogno che lo stato venga `triggerato`, questo si puó riperquotere sopratutto negli invalidate.
- Risolvere l'unsubscribe immediato dei moduli non legati al proxi del repeater senza sovraccaricare il resto.
- Idealmente i moduli all' interno di un `repeater/invalidate` e al di fuori di un componente dovrebbero osservare anche lo stato che usa il `repeater/invalidate`.
- Attualamente iniettiamo uno stato reattivo inerte in questo modo `${() => current.value && ''}` cosi da triggerare il watch ogni volta che il repeater si aggiorna, e scollegare il modulo se l'elemento é disconsso dal DOM, il modulo `bindEffect` usa un ragionamento simile.
- La docs é aggiornata a questo step manuale.

```js
${bindObject`counter: ${() => proxi.counter} ${() => current.value && ''}`}
```

- `Fondamentale:` I moduli sono pensati per essere il piú indipendenti possibili. Il modulo `repeater` non dove essere sovraccaricato di altra logica, lo ritnego arrivato al muo massimlo livello di complessitá.





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
