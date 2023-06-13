# Logica generale del metodo repeat ( liste dinamiche )

## Nel componente:

### 1) si presuppone di utilizzare un array di oggetti.

```js
${repeat({
    watch: 'data',
    component: 'TestComponent2',
    key: <univique key>
    props: ({ current }) => {
        return { childrenProp: () => <current?.prop>};
    },
    updateState: ({ index, setChildState }) => {
        setChildState('state', <myvalue>);
    },
    beforeUpdate: ({ container, childrenId }) => {
        // Before update
    },
    afterUpdate: ({ container, childrenId }) => {
        // After update
    },
})}
```

## 2) registerGenericElement.js

-   Viene creato un array di id uniovoci per ogni repeater presente.
-   Esecuzione della funzione <b>addRepeat()</b>
-   Ritorna uno span placeholder con un data attribute contente l'id univoco
-   Il placeholder prendera momentaneamente il posto dei futuri eliementi della lista.
-   La userFunction ( funzione componente ) insieme a tutti idati del componente ( render, onMont, etc..) ritorna che l'array con tuytti gli id unici creati per ogni lsita ( repeatId ).

```js
const repeatId = [];
```

```js
const currentRepeatId = getUnivoqueId();
repeatId.push(currentRepeatId);

addRepeat({
    repeatId: currentRepeatId,
    obj: {
        state, // main component state
        watch, // watch function of main component
        targetComponent, // children component to render in list
        props, // function used by the future children for props
        updateState,
        beforeUpdate,
        afterUpdate,
        getChildren, // main component getChildren function
        key,
        id, // id of main component
    },
});

return `<span data-repeatid="${currentRepeatId}" style="display:none;"/>`;
```

## 3) repeat.js ( addRepeat() )

-   Viene aggiunto nell' array di liste nel mainStore un oggetto:

```js
{ [repeatId]: obj }
```

## 4) coponentParse.js

-   Esegue un querySelector all' interno dell' elemento corrente alla ricerca dei placeholder (data-repeatid) e rispettivo id, e recupera il parentNode ( qui il componente é giá stato renderizzato ).
-   Cicla l'array di id univoci di repeater ritornati dal componente e per ogni occorrenza lancia la funzione inizializeRepeat() pasandogli, id e un oggetto con tutti i dati di ogni sigola lista che saranno poi filtrati.

```js
const placeholdreList = newElement.querySelectorAll('[data-repeatid]');
const placeholderListObj = [...placeholdreList].map((placeholder) => {
    const { repeatid: id } = placeholder.dataset;
    return {
        parent: placeholder.parentNode,
        id,
    };
});

const repeatIdArray = componentData?.repeatId;
repeatIdArray.forEach((repeatId) => {
    inizializeRepeat({
        repeatId,
        placeholderListObj,
    });
});
```

## 5) repeat.js

La funzione inizializeRepeat eseguirá:

-   Recupera i dati del singolo repeater ( obj )
-   Recupera il nodo parente della lista
-   Lancia la funzione <b>watchList()</b>:
-   Elimina la referenza del repeater all'interno del mainStore.

```js
watchList({
    ...obj,
    containerList: containerList?.parent,
});
```

## 6) watchList.js

-   Controlla se un repeater con stesso id si sta renderizzando ( multiple chiamte con async ), nel caso resetta il nuovo stato al precendente sezna cosi lanciare un' altro ciclo prima della fine del corrente e ritorna.
-   Aggiunge se stesso al mainStore come active repeater.
-   Lancia tutte le funzioni necessarie ( beforeUpdate, updaterChidlren, ... )
-   Rimuove se stesso dal mainStore come active repeater.
-   Aquesto punto nel componente sono stati aggiunti i componenti grezzi come tag.
-   Lancia la funzone <b>parseRuntime({ container: containerList });</b> per renderizzare i nuovi componenti.

## 7) utils.js ( parseRuntime() )

-   Funzione ricorsiva.
-   Controlla se ci sono componenti tag ( i figli della lista ggiunti ) da renderizzare.
-   Se ci sono, recupera dal tag l'id univoco data-runtime
-   Lancia la funzione <b>parseComponents()</b>
-   Rilancia se stessa, una volta renderizzato il component lista esso stesso puo avere altri componenti definiti da renderizzare al suo interno.

```js
await parseComponents({
    element: container,
    runtimeId: uniqueId,
});
```
