# REPEATER LOGIC:

<br/>

## 1- STEP1
### LOGICA NELL FASE DI CREAZIONE DEL COMPONENTE:
<br/>

- **repeatIdArray**: Raccoglie tutti gli id univoci legati ai singoli repeater.
- **repeatId**: Singolo id che verra usato come attributo per il custom html-elment


#### Ritorno della funzione repeat()

1. La funzione `getParamsForComponentFunction()` ritona un oggetto tra cui é presente la funzione `repeat()`.

2. La funzione `repeat()` si occpua di:
    - ritornare il webComponent `<mobjs-repeater><mobjs-repeater/>`.
    - salvare l'id del repater corrente `repeatId`.
    - salvare l'oggetto con tutti i paramtri che serviranno al repeater.

```
src/js/mobjs/creationStep/getParamsForComponent.js

addRepeat({
    repeatId: currentRepeatId,
    obj: {
        state: stateToWatch,
        setState,
        emit,
        watch,
        clean,
        beforeUpdate,
        afterUpdate,
        getChildren,
        key,
        id,
        render,
    },
});

return `<mobjs-repeater ${ATTR_REPEATID}="${currentRepeatId}" style="display:none;"/>`;

```

```
src/js/mobjs/temporaryData/repeater/add.js

export const addRepeat = ({ repeatId, obj }) => {
    repeatMap.set(repeatId, obj);
};
```
##### mobjs-repeater
`<mobjs-repeater></mobjs-repeater>`.<br/>
Il componente che ospita i/il repeater in fase di rendernig (`parseComponentRecursive.js`) userá un parser custom per cercare i `<mobjs-repeater>` presenti nel suo interno.<br/>
Lo scopo principale si `<mobjs-repeater>` e quello di recuperare il riferimento al suo diretto `Element` parente durante il rendering del componente.

#### Ritorno dell'array di id tutti gli definiti nel componente:
- La funzione `getParamsForComponentFunction()` nell'oggetto di ritorno restituisce l'array `repeatIdArray[]` che racoglie tutti i `currentRepeatId`, tale funzione sara poi usata della funziona priconipale `parseComponentsRecursive` per identificare tutti i repeater da inizializzare.<br/><br/>
Vedere lo <strong>step2</strong>.



<br/><br/><br/>

## 2- STEP2:
### LOGICA NELLA FASE DI RENDERING DEL COMPONENTE.
<br/>

1. Recupero dei web-component `<mobjs-repeater/>` all'interno del componente dove verrá recuperato l' `id` e il div `parent` di ogni repeater.

```
src/js/mobjs/parseComponent/parseComponentRecursive.js

const repeaterNodeList = queryGenericRepeater(newElement);
const repeatersParents = [...repeaterNodeList].map((placeholder) => {
    return {
        parent: /** @type {HTMLElement} */ (placeholder.parentNode),
        // @ts-ignore
        id: placeholder.getRepeatId(),
    };
});
```

2. `inizializeRepeat` inizializzará la funzione `watchList()` per ogni singolo repeater che a sua volta restuirá l' `emit()` per lanciara il primo rendering dei repeater.

```
src/js/mobjs/parseComponent/parseComponentRecursive.js

const repeatIdArray = componentData?.repeatIdArray;
const firstRepeatEmitArray = repeatIdArray.map((repeatId) => {
    return inizializeRepeat({
        repeatId,
        repeaterParent: repeatersParents.find(({ id }) => {
            return id === repeatId;
        }),
    });
});
```

3. Le funzioni di inizializzazione sono salvate nell'array `functionToFireAtTheEnd` che verra ciclato alla fine del parsing dei componenti dopo le funzioni di onMount e le funzioni di bind props.

```
src/js/mobjs/parseComponent/parseComponentRecursive.js

for (const item of functionToFireAtTheEnd.reverse()) {
    const { onMount, fireDynamic, fireFirstRepeat } = item;
    await onMount();
    fireDynamic();
    fireFirstRepeat();
}
```

## 3- STEP3:
### LOGICA DI INIZIALIZZAZONE/AGGIORNAMENTO DELLO STATO DEI COMPONENTI FIGLI.
<br/>

1. Creazione da un nuovo componente:<br/>
La constante `sync` resituita dalla funzione `render` del repeater contiene i riferimenti ( attributi ) a:

    ```
    key="start"
    currentlistvalue="_6rofyuf"
    repeaterchild="_c9lznhd"
    ```

- #### `key`
    chiave univoca dell'array osservato. ( se usata )
    <br/>
- #### `currentlistvalue`:
    current & index per l'elemento corrente relativi allo stato/array osservato dal repeater.
    - ##### gestione del dato di passaggio ( temporaneo ):

        - tramite la funzione `setComponentRepeaterState()` viene aggiunto ad una specifica mappa.
            - `repeater/addWithKey.js`
            - `repeater/addWithoutKey.js`
            <br/>
            <br/>
        - Viene poi recuperato durante l'esecuzione di `getParamsFromWebComponent()`  durate la fase di creazione del componente,
        in modo da poi poter essere passato all mappa generale dei componenti.
            <br/>

            ```
            parseComponentRecursive.js

            const currentRepeaterValueId = component.getRepeatValue();
            const currentRepeatValue = getComponentRepeaterState(
                currentRepeaterValueId
            );
            ```

    - ##### applicazione del dato al componente:
        - In `parseComponentRecursive.js` viene poi aggiunto ( `inizializzato` ) alla propietá (`currentRepeaterState`) della mappa degli elementi (`componentMap`).
            <br/>
            <br/>
            ```
            parseComponentRecursive.js

            /**
             * Set initial repate list current value to pass to dynamicProps.
             * When component is created.
             */
            if (currentRepeatValue?.index !== -1)
                setRepeaterStateById({ id, value: currentRepeatValue });
            ```
            <br/>
            <br/>
        - E poi aggiornato da:
            ```
            repeater/watchList.js

            [...childrenFiltered].forEach((id, index) => {
                const current = currentUnivoque?.[index];
                if (!current) return;

                /**
                 * Store current value in store
                 * to use in dynamicrops
                 */
                setRepeaterStateById({ id, value: { current, index } });
            });
            ```
        - Ora il dato potra essere preso direttamante dallo store componenti e usato a richiesta da:
            - `src/js/mobjs/temporaryData/bindEvents/index.js`
            - `src/js/mobjs/temporaryData/dynamicProps/index.js`
            - `src/js/mobjs/temporaryData/weakBindEvents/index.js`

    <br/>
    <br/>
- #### `repeaterchild`:
    Viene usato per abbianare il tag del componente ( es: my-component ) al repeater.
    - Viene aggiunto a una mappa tramite la funzione `addRepeatTargetComponent`.<br/>
    Tutti i componenti che compogono il repeater proveranno ad aggiungere il riferimento del propio `tag`, in reltá basta un solo risultato in quanto il repeater ospiterá solo un tipo di componente nel primo livello ( sara poi possibile innestare al suo interno diversi componenti ).<br/>
    Nel nostro caso solo il promo componente passara il check e aggiornerá la mappa.
    ```
    parseComponentRecursive.js

    if (componentRepeatId && componentRepeatId !== '') {
        addRepeatTargetComponent({
            repeatId: componentRepeatId,
            repeaterParentId: parentId ?? '',

            // Usato nella fase di destroy. Si rimuove dalla mappa quando viene distrutto.
            targetComponent: componentName,
        });
    }
    ```
    - `repeatId & targetComponent ( tag )` vengono usati nella funzione `watchList` per sapere quale é il tipo di componente usato nel repeater (`getRepeaterComponentTarget`).<br/>
    Questo permette di filtrare i componenti `child` di `repeaterParentElement` con un determinato `tag`
    - `repeaterParentId`: Usato nella fase di destroy del componente che ospita il repeater. da questo dato il parente eliminrá i riferimenti nella mappa `repeaterTargetComponentMap` dei repeater che ospita al suo interno.
    - La mappa come chiave ha l'id del repeater.
        ```
        const targetComponentBeforeParse = getRepeaterComponentTarget({
            id: repeatId,
        });
        ```
    <br/>
    <br/>
<br/>
<br/>

#### UDPATE _CURRENT/_INDEX
Ora che sappiamo il `tag` dei componenti presenti nel repeater e il suo `Element` parente (`repeaterParentElement`)  dalla funzione  `watch` ( `watchList.js` ) possiamo:
- filtrarli con la funzione `getChildrenInsideElement()`
- Aggiornare le propietá presenti in `currentRepeaterState` (`current/index`) nello store generale ( come fatto precedentemente ) e rendere i dati aggiornati per quando saranno usato dalla funzione `bindProps()`
- Questa operazione viene effettuata dopo l'aggiornamento del repeater per fare un update dei componenti persistenti:
  - Repeater con chiave: componenti persistenti.
  - Repeater senza chiave: componenti che hanno cambiato posizione.
