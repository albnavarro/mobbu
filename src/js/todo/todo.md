# MobJs

## 1. BindStore UX piú splicita.

#### 1. type [x]
- La modifica al tipo é la prima cosa da fare a prescindere.
- Aggiungere al tipo la propietá `onlyBounded`, semplifica la dichiarazione dei tipi a priori.


```javascript
export interface BenchMarkExternal {
    props: {
        selfProp: number;
    };
    state: {
        selfState: number;
    };
    bindStore: Readonly<ExternalStore>;
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
```

```javascript
export type ExtractState<T> = T['state'];
export type ExtractProps<T> = T['props'];
export type ExtractBoundedStore<T> = T['bindStore'];
export type ExtractPropsAndState<T> = T['state'] & T['props'] & T['bindStore'];
```

#### 2. get, getProp, watch, emit, emitAsync [ ]
- Rimangono come ora, viene incetivato l' uso dei proxi per selzionare la prop.
- L' uso della chiave-stringa comprende tutto.
- L' uso del proxi sará piú specifico.

#### 3. Proxi: [ ]
- Aggiungere due proxi separati.

- getProxi rimane e:
   - Funzionerá da proxi unificato.
   - Default di `mobStore`.

- Utilizzare lo stesso entry-point aggiungendo un parametro in entrata:
   - `ALL` ( default `getProxi()` attuale ).
   - `SELF`
   - `BOUNDED`
- Alla fine memorizzeremo 3 proxi distinti.


```javascript
/**
* Usa T['state'] && T['props'] && ['bindStore']
*/
const proxi = getProxi();

/**
* Usa T['state'] && T['props']
*/
const selfProxi = getSelfProxi();

/**
* Usa T['bounded']
*/
const boundedProxi = getBoundedProxi();
```

-  La gestioen dei tipo sará molto semplice, basta duplicare le presenti e cambiare l'unione di stati.
```javascript
export type PartialGetProxi<T> = () => ExtractPropsAndState<T>;
export type PartialGetProxiState<T> = ExtractPropsAndState<T>;
```

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

