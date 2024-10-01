## Repeater & Invalidate base logic

### Initialization

`getParamsForComponent.js`
- Le funzioni `invalidate` e `repeat` generano una funzione che ritornerá il primo DOM che verrá appeso direttamente al primo render del componente principale.
    - nel caso di `invalidate` la stessa funzione verrá poi usata per aggiornare il modulo quando cambia la dipendenza osservata
    - le due funzioni ritornano un webComponent `mobjs-invalidate` && `mobjs-repeat` con l'`id` dell' `invalidate/repeater` seguiti dal primo rendering del modulo.


### Parent node storage
- I due webComponent appena appesi al DOM traccieranno il `parent` del loro `host`, ovvero il nodo che li contiene e li aggiungeranno ad una specifica mappa insieme all' id del modulo.
    - `invalidateIdPlaceHolderMap`
    - `repeatIdPlaceHolderMap`
- Le due mappe avranno la struttura:
    - key: repeat/invalidateId
    - value: parent node

### Prepare dynamic update & async initialization
- Le due funzioni `repeat` & `invalidate` chimeranno due funzioni: `setRepeatFunction` && `setInvalidateFunction`
- Queste duefunzioni saranno usate per L'inizializzazione del `watcher` del modulo.
- Le due funzioni popoleranno le mappe `repeatFunctionMap` & `invalidateFunctionMap`
- Le due mappe avranno la struttura:
    - key: l' `id` del component scope
    - values:
        - un array con un oggetto quale:
            - invalidate/repeater id
            - funzione che inizializza il `watcher`
            - funzione di `unsubscribe` del `watcher` ( inzialmente NOOP, finche il watcher non parte ).
- All' id del componente vegono cosi associate tutte le informazioni relative a tutti i moduli contenuti.

### Inzializzazione del watcher statico ( primo render )
- `parseComponentsRecursive()`
- Per ogni componente tramite il suo `id` vengono recuperate dalla mappa `invalidateFunctionMap` & `repeatFunctionMap` tutte le funzioni che inzializzano i `watcher` dei moduli in esso contenuti.
- Le funzioni verranno lanciate alla fine del `parse` generale insieme alla funzione `onMount`

### Funzione watcher
- Recupera il primo `parentId` da passare alla funzione watch.
    - Questo elemento servirá per inzializzare il `parseComponentsRecursive` asincrono
    - La funzione di parse asincrona partirá cosí con un `parentId` corretto dopo di ché continuerá per la sua strada nel modo tradizionale.
- Recupera la funzione di `unsubscribe` del watcher.
- Attraverso l'`id` del componente scope e l'id dell' `invalidate` || `repeater` potrá aggiornare le rispettive mappe con la funzione di `unsubscribe`.

### Rimozione di default di repeat/invalidate
- Nella funzione `removeAndDestroyById()` verranno eliminati delle mappe i moduli partendo dall' `id componente`
- Non c'é bisogno di distruggere i componenti innestati perché vengono giá distrutti essendo figli.

### Rimozione di repeat/invalidate innestati
- Si parte dalla funzione `watcher` dove abbiamo l' `id` del componente scope e i `repeatId` && `invalidateId`
- Ogni qual volta un `repeat` || `invalidate` si aggiorna bisognerá elminare i moduli attivi in essi contentuti.
- Per ogni elemento eliminato verranno lanciate le funzioni `destroyNestedInvalidate()` && `destroyNestedRepeat()`
    - `Invalidate`: Le funzioni vengono lanciate una sola volta, `invalidate` é un blocco di DOM univoco.
    - `Repeater`: Le funzioni vengono lanciate per ogni componente al suo interno.
- Le due funzioni utilizzaranno il `parentNode` dei moduli per lo scopo.
    - viene recuperato il `parentNode` del modulo dalle mappa `invalidateIdPlaceHolderMap` & `invalidateFunctionMap` tramite `repeatid` || `invalidateId`
    - `Invalidate`: Si controllano tutti i `parentNode` dei moduli `invalidate` per vedere quali sono figli del `parentNode` corrente.
    - `repeater`: Si controllano tutti i `parentNode` dei moduli `invalidate` per vedere quali sono figli del `componente corrente`.
- Ora le due funzioni `destroyNestedRepeat` && `destroyNestedInvalidate` potranno:
    - Recuperare e distruggere i componenti contenuti nel `parentNode`
    - Lanciare le funzioni di `unsubscribe` immagazzinate nelle mappe `invalidateFunctionMap` && `repeatFunctionMap` tramite `repeatid` && `invalidateId`
    - Ripulire entrambe le mappe dai `repeater` && `invalidate` tramite `repeatid` && `invalidateId`.

### Inizializzazione di repeat/invalidate inestati.
- L' inzializzazione di watcher avvengono di base nel parse del `componente scope`
- Quando i repeater/invalidate innestati vengono aggiornati il `componente scope` é giá stato eseguito.
- All' interno delle funzioni `watcher` dopo che il DOM é stato aggiornato vengono chiamate le funzioni `inizializeNestedRepeat` && `inizializeNestedInvalidate`
- La procedura é speculare a quella usata per la distruzione.
- Teniamo presente che a questo punto un nuovo elemento `placeHolder` é stato aggiunto alle due mappe `invalidateIdPlaceHolderMap` && `repeatIdPlaceHolderMap`
    - `invalidate`: si cerca un `placeHolder`  contenuto nel `parent node` principale.
    - `repeat`: si cerca un `placeHolder`  contenuto nel nuovo elemento creato.
- Individuati `plaholder` avremmo anche i `repeatid` && `invalidateId`
- a questo punto si possono lanciare le funzioni che inizializzano i `watcher`
- Le funzioni potranno essere eseguite una sola volta, importante quando si hanno X moduli innestati per cui questa operazione verrebbe lanciata multiple volte.
