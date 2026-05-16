# MobJs

## MobCore
- Store, passare dalla definizione funzione per gli stati complessi a delle key private:

```javascript
export const navigationStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').NavigationStore>} */
    ({
        activeNavigationSection: () => ({
            value: '',
            type: String,
            skipEqual: false,
        }),
        navigationIsOpen: () => ({
            value: false,
            type: Boolean,
        }),
    })
);
```

a:

```javascript
export const navigationStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').NavigationStore>} */
    ({
        activeNavigationSection: {
            __value: '',
            __type: String,
            __skipEqual: false,
        },
        navigationIsOpen: {
            __value: false,
            __type: Boolean,
        },
    })
);
```

## 1. BindStore UX piú splicita.
- Aggiornare DOC `mobCore` `mobJs`.


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

