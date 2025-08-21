### Docs: Stagger:
- Specificare con un `note`  che il suo utilizzo e migliore con `subscibecache`, pause, stop etc..
- Specificare i moduli che lo usano con link.

### Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

### MobCore
- Parallax/Scroltriiger
- Puo usare il metodo `freezeCache` on `scrollEnd` ? ( scrollerTween/sequencer ).

<hr/>
<hr/>

## Store/MobJs:
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

## Refs:
Usare weakRef.


## BindProps
##### Nota: puó essere un falso problema, per le massime performance i methodi possono avere un accesso diretto al componente senza intermediazione, nel caso specificarlo.
- `MobStore`: add `object` simile a fnValidate dove segnare l' ultima azione `set` / `get`
- `set` lo segnará `setProp/setObj`.
- `get` lo segnara con un nuovo metodo dello store controllato da `bindProps`.
- `bindProps` potra cosi usare lo stato solo se é stato modificato dall' ultima volta che lo ha chiamato nella funzione `updateBindProp`, dunque corrisponderá a `set`.
- In questo modo si fará un set sul `children` solo per gli effettivi stati modificati.


## src/js/mob/mob-js/parse/steps/get-params-from-web-component.js
- Parent id ternario innestato, semplificare.
- Idealmante con `weakElementMap` si puó usare solo una strategia.

## src/js/mob/mob-js/doc/ ?
- Aggiungere:
    - Parent id logic.
    - Repeat `element` vs `innerWrapper` vs `repeatIdPlaceHolderMap` ( use external map children propierties, es: `getRepeaterChild()` ).

## ParserHTML
#### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

#### Render return object.
- Funizione utility che converte un `oggetto` in `html`.

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
