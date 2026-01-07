# Prioritá

1. `MobJs`: root.contains(element) -> element.isConnected.
2. `BindObject/BindText/BindEffect` update in sincrono con repeater/invalidate.
    - [detail:](#BindObject/BindText/BindEffect)
3. `RepeaterRender`: `nativeDOMChildren` -> testare element come weakMap per alleggerire il `GC`.
    - Verficare e nel caso portare la cosa su altri `element` gestiti nella mappe piú grandi.

### Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

### Store - deepEquality:
- Agiungere `deepEquality`, basta un `JSON.stringigfy(current) === JSON.stringigfy(current)`.
- Utile per `array/object`.
- Rivedere un controllo piu permissivo e veloce per gli `oggetti`?

# MobJs


<a name="BindObject/BindText/BindEffect"></a>
### BindObject/BindText/BindEffect update in sincrono con repeater/invalidate.
- Il meccanismo é ok, i moduli tracciano gli stati che i moduli repeat/invalidate ( se usati ) osservano nel `componente-scope`.
- Il meccanismo é `indisciminatorio` ovvero tutti i moduli si agganciano a tali stati se usati del componente a prescindere che siano figli di `repeat`/`invalidate` o meno.
- Possibile miglioramanto.
    - I  moduli si agganciano solo se figli di un repeat/invalidate.
    - Basta che il meccanismo non si riveli piu pensante che aganciare una callback a prescindere cosi come avviene ora.
    - In linea teorica l' `overhead` cosi come é ora é minimo, da valutare solo se a basso costo.





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
