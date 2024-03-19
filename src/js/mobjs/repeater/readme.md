# REPEATER LOGIC:

<br/>

## 1- STEP1
### LOGICA NELL FASE DI CREAZIONE DEL COMPONENTE:
<br/>

- **repeatIdArray**: Raccoglie tutti gli id univoci legati ai singoli repeater.
- **repeatId**: Singolo id che verra usato come attributo per il custom html-elment


#### Ritorno della funzione repeat()

1. La funzione `registerComponent()` ritona un oggetto tra cui é presente la funzione `repeat()`.

2. La funzione `repeat()` oltre che ha tornare il web-component `<mobjs-repeater>`  salverá in una apposita mappa ( `repeatMap` ) l'id (`currentRepeatId`) e l'oggetto  con tutti i riferimenti del repeater corrente usando la funzione `addRepeat()`:

3. La stessa ritornerá il web-component `<mobjs-repeater>`. Il componente che ospita i/il repeater in fase di rendernig (`parseComponentRecursive.js`) userá un parser custom per cercare i `<mobjs-repeater>` presenti nel suo interno. Lo scopo principale si `<mobjs-repeater>` e quello di recuperare il riferimento al suo diretto `Element` parente durante il rendering del componente.

```
src/js/mobjs/creationStep/registerComponent.js

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

#### Ritorno dell'array di id tutti gli definiti nel componente:
- La funzione `registerComponent()` nell'oggetto di ritorno restituisce l'array `repeatIdArray[]` che racoglie tutti i `currentRepeatId`, tale funzione sara poi usata della funziona priconipale `parseComponentsRecursive` per identificare tutti i repeater da inizializzare.

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
### LOGICA DI INIZIALIZZAZONE/AGGIORNAMENTO DEI COMPONENTI FIGLI.
<br/>

1. Creazione da un nuovo componente:<br/>
La constante `sync` resituita dalla funzione `render` del repeater contiene i riferimenti ( attributi ) a:

```
key="start"
currentlistvalue="_6rofyuf"
repeaterchild="_c9lznhd"
parentid="_hegws76"
```

- `key`: chiave univoca dell'array osservato.
    <br/>
    <br/>
- `currentlistvalue`: current & index per l'elemento corrente relativi allo stato/array osservato dal repeater.
    - tramite la funzione `setComponentRepeaterState()` viene aggiunto ad una specifica mappa.
    - Viene poi recuperato dirante l'esecuzione di `getComponentData()` (`getComponentData.js`) durate la fase di creazione del componente.
    ```
    const currentRepeaterValueId = component.getRepeatValue();
    const currentRepeatValue = getComponentRepeaterState(
        currentRepeaterValueId
    );
    ```
    - In `registerComponent.js` viene poi aggiunto alla propietá (`currentRepeaterState`) della mappa degli elementi (`componentMap`) tramite la funzione `setRepeaterStateById()`
    - Ora il dato potra essere preso direttamante dallo store componenti e usato dalla funzione `bindProps({})`, che ritornerá i due valori insieme ai valori di stato specifici.
    <br/>
    <br/>
- `repeaterchild`: Viene usato per abbianare il tag del componente ( es: my-component ) al repeater.
    - Viene letto dal web-component (`userComponent.js`) nella fase di inizializzazione.
    - Viene aggiunto a una mappa tramite la funzione `addRepeatTargetComponent`.<br/>
    Tutti i componenti che compogono il repeater proveranno ad aggiungere il riferimento del propio `tag`, in reltá basta un solo risultato in quanto il repeater ospiterá solo un tipo di componente nel primo livello ( sara poi possibile innestare al suo interno diversi componenti ).<br/>
    Nel nostro caso solo il promo componente passara il check e aggiornerá la mappa.
    ```
    addRepeatTargetComponent({
        repeatId: this.#isChildOfRepeatId,
        targetComponent: this.#componentname,

        // Usato nella fase di destroy. Si rimuove dalla mappa quando viene distrutto.
        repeaterParentId: this.#parentId,
    });
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
- `parentid`: parent id ( il componente in cui il repeater viene usato ).<br/> Utilizzato per tutte le operazioni di ruotine nella creazione dei componenti.
<br/>
<br/>

#### UDPATE _CURRENT/_INDEX
Ora che sappiamo il `tag` dei componenti presenti nel repeater e il suo `Element` parente (`repeaterParentElement`)  dalla funzione  `watch` ( `watchList.js` ) possiamo:
- filtrarli con la funzione `getChildrenInsideElement()`
- Aggiornare le propietá presenti in `currentRepeaterState` (`current/index`) nello store generale ( come fatto precedentemente ) e rendere i dati aggiornati per quando saranno usato dalla funzione `bindProps()`
- Questa operazione viene effettuata dopo l'aggiornamento del repeater per fare un update dei componenti persistenti:
  - Repeater con chiave: componenti persistenti.
  - Repeater senza chiave: componenti che hanno cambiato posizione.
