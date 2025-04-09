## Parent id logic.

### Default assignment

1. `addSelfIdToParentComponent`
    - Il componente corrente assegna il suo id a tutti i `webCompnent` `placeHolder` presenti a prescindere dalla profonditá.
    - A ogni parse eventulamente il componente corrente riaggiornerá l'`id` dei figli.
    - Esauriti tutti componenti del `parse` corrente tutti i componenti avranno l'`id` del componente parente corretto

### repeater/invalidate

1. First rendering.

    - Al primo parse il DOM del modulo viene esesguito in maniera sincrona, le due funzioni `repeat` e `invalidate` ritornano direttamante il primo rendering alla prima esecuzione.
    - In quest caso vale il discorso `Default assignment`

2. Run time creation ( moduli innestati nello stesso scope )
    - In questo caso i moduli `repeat` e `invalidate` non vengono parsati nel ciclo normale ma istanziano un propio `parse` dedicato.
    - Di conseguenza non gli viene passato l' `id` corretto.
    - l' `id` del componente `scope` non corrisponde al `parent`, il `repeat`/`invalidate` si puo travare all' interno di altri componenti.
    - `getFallBackParentByElement()`
        - partendo dall' id del `invalidate`/`repeat` si potrá recuerare il nodo parente del placeholder usato per creare i moduli ( `repeatIdPlaceHolderMap` && `invalidateIdPlaceHolderMap` )
        - `repeatIdPlaceHolderMap` e `invalidateIdPlaceHolderMap` vengono popolati nei webComponent placeHolder relativi ( `mobjs-repeat` && `mobjs-invalidate` ).
        - la funzione `getFallBackParentByElement()` eseguira un `findLast` di `componentMap` andando a travare il primo componente che contiene il nodo di cui sopra.
        - Il `parse` avvenendo secondo lo schema `tree traversal` ci garantisce che il componente con una profonditá maggiore sia sempre piu in `basso` nella lista.
        - una ricerca inversa partendo dal fondo tornerá il componente dalla profonditá maggiore che contiene il nostro `nodo parente`
