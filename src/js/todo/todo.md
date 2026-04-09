# App
- Usare per i colori le variabili css.

# MobJs

## fromObject
#### Struttura:
- Poter passare alla funzione un array/oggetto .
- trasforma un oggetto in stringa per essere compatibile con il sistema esistente.
- funzione ricorsiva che un oggetto come il seguente restituisce una stringa compattata.
- Propietá necessarie:
    - `tag` : stringa
    - `className` : stringa
    - `style` : stringa
    - `dataAttributes` : oggetto di attributi
    - `attributes` : oggetto di attributi
    - `modules` : array le funzioni modules torneranno sempre stringhe.
    - `content` : singola stringa|elemento ( ricorsivitá ) o un array degli stessi.

#### Gestire i tag senza chiusura:
```javascript
const VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr',
    'img', 'input', 'link', 'meta', 'param',
    'source', 'track', 'wbr'
]);

const isVoid = VOID_ELEMENTS.has(tag.toLowerCase());

if (isVoid) {
    return `<${tag} />`;
}
```

#### API example:
```javascript
return fromObject({
    tag: 'div',
    className: 'my-div relative',
    style: 'background: #000;',
    dataAttributes: { id: 'my id' },
    attributes: { slot: 'my-slot' },
    modules: [
        setRef('canvas'),
        delegateEvents({
            click: () => {
                proxi.controlsActive = true;
            },
        }),
        bindEffect({
            toggleClass: {
                active: () => proxi.controlsActive,
            },
        }),
    ],
    content: [
        {
            tag: 'div',
            content: {
                tag: 'span',
                content: 'my span',
            },
        },
        'text content',
        {
            tag: 'div',
            className: 'my-repeater-container',
            content: repeat({
                observe: () => proxi.isMounted,
                render: ({ current }) => {
                    return fromObject({
                        tag: 'my-component',
                        modules: [
                            bindProps(() => ({
                                key: `${current.value.key}`,
                                value: `${current.value.value}`,
                                index: current.index,
                            })),
                        ],
                    });
                },
            }),
        },
    ],
});
```

#### Esempio tipi:
```typescript
export type ModuleFunction = () => string;

/**
 * Tipo ricorsivo per il contenuto.
 */
export type NodeContent =
    | string
    | NodeDescriptor
    | Array<string | NodeDescriptor>;

/**
 * Tipo per il nodo del DOM.
 */
export interface NodeDescriptor {
    tag: keyof HTMLElementTagNameMap | (string & {});
    className?: string;
    style?: string;
    dataAttributes?: Record<string, string | number | boolean>;

    /**
     * Attributi HTML standard.
     * Exclude 'class' e 'style'.
     */
    attributes?: Omit<Record<string, string | number | boolean>, 'class' | 'style'>;
    modules?: ModuleFunction[];
    content?: NodeContent;
}

export type FromObject = (data: NodeDescriptor) => string;
```

```javascript
/**
 * @type {FromObject}
 */
export const fromObject = (data) => {
    ....
    return htmlString;
};
```

```javascript
/**
 * @type {FromObject}
 * @param {NodeDescriptor} data - Descrittore del nodo
 * @returns {string} HTML string
 */
export const fromObject = (data) => {
    const { tag, className, content, modules } = data;
    ....
    return htmlString;
};
```

### Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

### Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

### Quickset
- Aggiungere `Quickset`.

### Debug
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

