## Dynamic component assignment:

<div>
   <myComponent
       data-dynamic="
        ${createDynamicProps({
            watch: computedState|state,
            states: [state1, stat2 ...],
            props: ({ state1, state2, ... }) => {
                return {stateChild1: state1, stateChild2: state2}
            }
        })}
       ">
   </myComponent>
</div>

Logica molto simile a data-props.
Titorna un id viene salvato in main store.

Quando viene recuperato e rimosso dal mainStore:
1- Assegnazione prop "normale" la prima volta:


//Get single state value and merge in array
//Expected result:
{state1: value, state2:value, ....}

```javascript
const values = states.map((state) => {
    return {[state]: getStateById(parentId, state, false) }
}).reduce((p, c) => ({ ...p, ...c }), {});
```


// execute props function passing all the values.
// expected result:
{ stateChild1: state1Val, stateChild2: state2Val}

// Eseguo la funzione props
```javascript
const propsToMerge = props(values)
```


Merge propsToMerge come come getProps


2- create i watcher:
Watch sul singolo stato del parente ( preferibilmente un computed )
Creo un oggetto statoParente: valore come sopra.
Eseguo la funzione props cosi da recuperare stato figlio: valore.
Aggiorno tutti gli stati figli.


```javascript
watchById(parentId, watch, (val) => {

    const values = states.map((state) => {
        return {[state]: getStateById(parentId, state)}
    }).reduce((p, c) => ({ ...p, ...c }), {});

    const propsToMerge = props(values)

    Object.enries(propsToMerge).forEach(([ key, value  ]) => {
       setStateById(childId, key, value)
    })
})
```


### Now:

- aggiungere allos tore un array per salvare le funzioni di unwach di dynamicProps
- onDestroy lanciarle
- elminare watch e fare un watch per ogni state come se fosse un computed.
