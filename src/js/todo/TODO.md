# MobJs

### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

### parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.
- FallBack se i vari tentativi di precompilare/resuperare il parentId falliscono dovrebbe evitare di usare qualsiasi tipo di querySelector ( setParentsIdFallback ).

#### runTime/repater
Ipotesi per evitare l'aggiunta dell'attributo  ` ${ATTR_PARENT_ID}="${id}" ` sul nodo, in particolar modo per `${syncparent}`:

- ipotesi 1:
    - parseDom esce dalla funzione (`getParamsForComponent.js`) e usa mainStore per mandare un parseDom asicncrono per evitare cycle-dependencies:
    - Di conseguenza value diventará un oggetto (`'any'` o un oggetto nativo dello store)  `{element: HTMLElement, parentID: string}`.

        ```js
            parseDom: async () => {
                mainStore.set(
                    MAIN_STORE_REPEATER_PARSER_ROOT,
                    { element, id }
                    false
                );
                await mainStore.emitAsync(MAIN_STORE_REPEATER_PARSER_ROOT);
            }
        ```
    - Adeguare il comportamento in `updateChildren.js`
    - In parseComponentRecursive() il valore id passato verra unasto solo al primo ciclo e non passato durante la recursione.

# Mob motion

### AsyncTimeline
- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

