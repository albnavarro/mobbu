- Alias: aggiungere gli alias @ !!!!

# DOCS
- Allineare le docs con i nuovi tipi generici di `mobStore`, `mobJsComponent`
- `mobJsComponent`: aggiungere esempi per il generic <R> oggetto del componente destinatario.

# APP
### Debug component:
- tree structure espandibile
    - Basata su un unico invalidate.
    - Componente base recursivo.
    - Filtri per instance name & component name.
    - refresh button
- Dettaglio componente.
    - Cliccabile dalla vista ad albero.
    - Ricerca per id
- Dimensione (size) delle mappe di supporto.

# MobJs
### bindText

```js
/**
 * @param {string} id - componentId
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns { string }
 */
const renderText = (id, strings, ...values) => {
    // qui sará props = getSateById(id);
    const props = { test: 'test-1-value', test2: 'test-2-value' };
    const states = values.map((prop) => props?.[prop] ?? '');

    return strings.raw.reduce(
        (accumulator, currentText, i) =>
            accumulator + currentText + (states?.[i] ?? ''),
        ''
    );
};

const createBindTextWatcher = ({ id, bindContentId, watch, props, render }) => {
    setTimeout(() => {
        /**
         * Una nuova mappa salvera new Map<componentid: { parentNode, bindContentId }[]>
         * La chiave é l'id del componente.
         * Al destroy del component si elinerá l'elemento dalla mappa.
         */

        // const parent = getParentBindContentById({ id, bindContentId });

        /**
         * Per ogni props un watcher come per bind props.
         */
        console.log(props);
        console.log(render());

        // parent?.textContent(render())
    }, 500);
};

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns { string }
 */
const bindText = (strings, ...values) => {
    const componentId = '_vchfoex';
    const bindContentId = mobCore.getUnivoqueId();
    const render = () => renderText('udsjskjs', strings, ...values);

    createBindTextWatcher({
        id: componentId,
        bindContentId,
        watch: () => {},
        props: values,
        render,
    });

    return `<mobjs-bindContent componentid="${componentId}" bindconentid="${bindContentId}"><mobjs-bindContent>${render()}`;
};

console.log(bindText`pippo ${'test'} pluto ${'test2'}`);

```

### setState/updateState/setStateByName/updateStateByName
- Manca la propietá clone ereditata da mobStore `clone`

### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

### Type
- `createComponent`: `exportState` && `state` dovrebebro usare lo stesso generic<T> di `mobComponent`

### Component
- props per diabilitare il `restoreScroll` nella singola definizione del componente ( vedi `horizontalScroll` ).

### Events
- esporre delle funzioni che ritarno i vari `afterRouteChange` etc... come svelte.
- sempre che possano convivere con i generic.

```js
beforeNavigate(({props}) => {
    ///
})
```

### Methods
- Capire come gestire i tipi sui metodi.
    - Fare un tipo apposito come per lo stato pasarlo come `Methods<myInterface>`.

### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.


# MobCore

### Default:
- Spostare mq da mobMotion a mobCore.


# Mob motion

### Plugin
- Sostiuire i typedef con delle interfaccie.
- Abilitare TS check.
- Slide passare da Array a Map con Element come chiave.

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

