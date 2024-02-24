# REPEATER LOGIC:

<br/>

## src/js/mobjs/creationStep/registerComponent.js

- **repeatIdArray**: Raccoglie tutti gli id univoci legati ai singoli repeater.
- **repeatId**: Singolo id che verra usato come attributo per il custom html-elment


#### Ritorno della funzione repeat()

1. La funzione `registerComponent()` ritona un oggetto tra cui é presente la funzione `repeat()`.

2. La funzione `repeat()` resituita al DOM del componente salverá in una apposita mappa ( `repeatMap` ) l'id (`currentRepeatId`) e l'oggetto  con tutti i riferimenti del repeater corrente usando la funzione `addRepeat`:

3. La stessa ritorna il custom-html `<mobjs-repeater>`. Il componente in fase di rendernig (`parseComponentRecursive.js`) lancera un parser custom per cercare i `<mobjs-repeater>` presenti nel suo interno e capire quale repeater usare. Lo scopo principale si `<mobjs-repeater>` e quello di recuperare il riferimento al suo diretto `Element` parente durante il rendering del componente.

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
- La funzione `registerComponent()` ritona anche un oggetto tra cui é presente l'array `repeatIdArray[]` con tutti i `currentRepeatId`, tale funzione sara poi usata della funziona priconipale de `parseComponentsRecursive`.

<br/><br/><br/>

## FASE DI RENDERING DEL COMPONENTE.

1. Recupero dei custom-htmlelment  `<mobjs-repeater/>` all'interno del componente dove verrá recuperato l' `id` e il div `parent` di ogni repeater.

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

2. Inzializzazione della funzione `watchList` per ogni singolo repeater. `inizializeRepeat` restuirá l' `emit()` per lanciara il primo rendering dei repeater.

```
src/js/mobjs/parseComponent/parseComponentRecursive.js

const repeatIdArray = componentData?.repeatIdArray;
const firstRepeatEmitArray = repeatIdArray.map((repeatId) => {
    return inizializeRepeat({
        repeatId,
        repeatersParents,
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
