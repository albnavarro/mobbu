# Priority:

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.


# MobCore

## Store

### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

### Watch
- Fare in modo che il non ci siano piu di un watch nello stesso javascript loop, il valore buono é l'ultimo.
- Propietá opzionale.
- Aggiungere come terzo parametro `useSingleLoop = false`.
- Nel `useFrame(() => {})` e il altre situazioni é utile avere un watch immediato.

```js
// src/js/mobCore/store/index.js

watch: (prop, callback, { useSingleLoop = false } = {}) => {
    return watchEntryPoint({ instanceId, prop, callback, useSingleLoop: useSingleLoop ?? false });
},
```
- Il tipo diventrá perció:

```js
export interface callbackQueue {
    callBackWatcher: Map<
        string,
        {
            prop: string;
            fn: (
                arg0: any,
                arg1: any,
                arg2: boolean | Record<string, boolean>
            ) => void | Promise<void>;
            options?: {
                useSingleLoop?: boolean;
            };
        }
    >;
    prop: string;
    newValue: any;
    oldValue: any;
    validationValue: boolean | Record<string, boolean>;
}
```

# MobJs

### RepeaterSync.
- Evitare di passare l; attributo `${sync()}`

##### test n1
- Bozza veloce del meccanismo sul primo render, risolto questo i successivi render `withKey` `withoutKey` dovrebbero essere piu semplici non essendoci la necessita di riconvertire il blocco in stringa.
- Prevedere anche un setter/getter globale che inibisce userComponent ad aggiungersi alla mappa.

```js
    repeat: ({
        bind,
        clean = false,
        persistent = false,
        beforeUpdate = () => Promise.resolve(),
        afterUpdate = () => {},
        key,
        render,
    }) => {
        const repeatId = mobCore.getUnivoqueId();
        const hasKey = key && key !== '';

        /** type @type{Record<string, any>[]} */
        const initialState = getState()?.[bind];
        const currentUnique = hasKey
            ? getUnivoqueByKey({ data: initialState, key })
            : initialState;

        /**
         * Render immediately first DOM
         */
        const firstRender = currentUnique.map(
            (/** @type{any} */ item, /** @type{number} */ index) => {
                return {
                    render: render({
                        sync: () => '',
                        index,
                        currentValue: item,
                        html: renderHtml,
                    }),
                    current: item,
                    index,
                    key: hasKey ? item?.[key] : '',
                    bind,
                    repeatId,
                };
            }
        );

        const last = firstRender
            .map(({ render, current, index, repeatId, key, bind }) => {
                const node = document
                    .createRange()
                    .createContextualFragment(render);

                const components = queryAllFutureComponent(node, false);

                components.forEach((component) => {
                    component.setAttribute(
                        ATTR_CURRENT_LIST_VALUE,
                        setComponentRepeaterState({
                            current,
                            index,
                        })
                    );
                    component.setAttribute(ATTR_KEY, `${key}`);
                    component.setAttribute(
                        ATTR_REPEATER_PROP_BIND,
                        `${bind}`
                    );
                    component.setAttribute(
                        ATTR_CHILD_REPEATID,
                        `${repeatId}`
                    );
                });

                const serializer = new XMLSerializer();
                const xmlnAttribute =
                    ' xmlns="http://www.w3.org/1999/xhtml"';
                const pippo = serializer.serializeToString(node);
                const regEx = new RegExp(xmlnAttribute, 'g');
                const newstr = pippo.replaceAll(regEx, '');
                return newstr;
            })
            .join('');

        /**
         * When repeater is inizilized runtime, all neseted repater is initialized.
         * Fire each repeater once.
         */
        let isInizialized = false;

        setRepeaterPlaceholderMapScopeId({
            repeatId,
            scopeId: id,
        });

        setRepeatFunction({
            id,
            repeatId,
            fn: () => {
                if (isInizialized) return;

                /**
                 * Fire invalidate id after component parse
                 */
                inizializeRepeatWatch({
                    repeatId,
                    persistent,
                    state: bind,
                    setState,
                    emit,
                    watch,
                    clean,
                    beforeUpdate,
                    afterUpdate,
                    key,
                    id,
                    render,
                });

                isInizialized = true;

                setRepeaterPlaceholderMapInitialized({
                    repeatId,
                });
            },
        });

        return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${last}`;
    },
```


### Quickset
- Aggiungere `Quickset`.

### Repeat
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

### Global store
- Nella funzione inizializeApp aggiungere `globalStore`, `invalidate` potrá usare uno store esterno per la reattivitá.
- Il contenuto del watcher corrente `inizializeInvalidateWatch` dovrá essere estratto per essere unato anche dalla nuova funzione watch
- La distruzione del watcher avvine come ora per il watcher di default ( legato allo stato del componente ).

```js
    inizializeApp({
        rootId: '#root',
        contentId: '#content',
        wrapper,
        globalStore: myStore
        ...
    });


    ${invalidate({
        bind: 'anchorItems',
        bindGlobal: 'myState', // Opzionale
        render: () => {
            return getButtons({
                delegateEvents,
                bindProps,
                setState,
                getState,
            });
        },
    })}

```
- La stessa cosa sará fatta anche per `bindText`, creare una nuova utility `bindGlobalText`.
```js
    ${bindGlobalText`my text ${'globalProp'}`}
```

### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

### Type
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`

### Docs
- In ognisezione corrispondente aggiungere glie sempi tipi.
    - `MobComponent` ( state && methods ).
    - `MobComponentAsync` ( state && methods.
    - Singoli come `SetState`.
    - `ReturnBindProps`.
    - `UseMethodByName` && `useMethodArrayByName`


# Mob motion

### Plugin

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
