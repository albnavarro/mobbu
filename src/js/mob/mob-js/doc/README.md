## Concetti base del mobulo MobJs:
Di seguito i concetti base del modulo per capire a grandi linee la logica di base.<br/>
Il concetto ricorrente é la ricerca di una astrazione il piu semplice e immediata possibile, il trick é avere sempre  accesso immediato ai vari elementi senza necessitá di filtrare grosse strutture di dati.<br/>
Il modulo deve essere mantenibile e di conseguenza **deve** essere il piu semplice e chiaro possibile.<br/>
Il modulo **non** deve evere dipendenze esterne e deve poter girare nativamante sui browser senza step di compilazione.

### Tipizzazione

Una tipizzazione tramite `jsDoc` e `d.ts` si é rivelata piú che sufficente per ottenere un buon controllo dei tipi senza step di compilazione.


### Creazione dei componenti:

I componenti vengono aggiunti al DOM sotto forma di `custom element`, tali elementi struttando il metodo `connectedCallback` possono intercettare instantaneamente il nodo `root` dell' elemento ( `host` ) e aggiungerlo ad uno specifico `Set`, il `Set` finale rispecchierá naturalmente l'ordine di inserimento dei componenti.
Una volta che il nostro DOM con tutti i componenti é stato aggiunto basterá ciclare il `Set` aggiornato e per ogni occorrenza tramite il `tag` recuperare la funzione che si occuperá di creare il componente finale. Questo tipo di operazione risulta decisamente semplice ed estremamente efficace, non necessitá di nessuna ricerca e/o filtraggio mi si tratta sempre di un accesso diretto.<br/><br/>
Anche se la creazione di un componenti parte da un `custom-element` il componenti finale non dovrá necessariamente essere un `custom-component`,  il DOM del componente finale viene ritornato dalla `funzione-componente`.

### Mappa dei componenti.

Tutti i componenti fanno riferimento ad una mappa che si occupa di gestire lo stato attuale del componente e tutti i suoi parametri in un deteminato momento.<br/> Questa mappa ha come chiave un `hash` casuale per un rapido accesso alle informazioni, una volta che il componente viene smontato verrá eliminato dalla mappa.
E' implementata anche una specifica `WeakMap` che abbina il nodo `root` del componente al suo `hash` per un accesso instantaneo alle informazioni del componente tramite l' `HTMLElement`, lo scopo é avere sempre una accesso diretto senza operazioni di ricerca.<br/><br/>
es: quest' ultima mappa viene utilizzata anche per trovare l' `hash` del componente parente in maniera ottimale e veloce ripecorrendo a ritroso l'alberatura partendo dal nodo `root` di un componente e chiedendo alla mappa l'`hash` del il nodo corrente, generalmente in 2/3 richieste si invidua il nodo/componente parente piú prossimo.<br/><br/>
La mappa dei componenti avrá di conseguenza anche tutte le informazioni per generare un albero gerarchico dei componenti correnti.

### Stato del componente.

Lo stato del componente é una semplice istanza di [MobStore](https://github.com/albnavarro/mobbu/tree/main/src/js/mob/mob-core/store), nulla viene fatto per adattarlo alla struttura, a ogni componente creato viene creato un nuovo `store` e nel caso valorizzato con i dati dei vari moduli ove necessario. I suoi parametri saranno poi passati alla funzione-componente, nulla di piú.

Lo store sfrutta il classico pattern `pub/sub` implementando anche utility come `proxi` e `computed`<br/>
Come per `MobJs` non vengono usate classi, bensí abbiamo una mappa che come chiave ha un `hash` casuale a cui vengono abbinate le informazioni dello store specifico.<br/>
Questo permette abbianare per ogni store anche piu `hash` per derivare in maniera semplice dati da altri store senza peró permesso di scrittura ( `bindStore` ).<br/><br/>

Anche in questo caso l'accesso ai dati é sempre diretto `1:1`.<br/><br/>

Srfuttando il concetto di `pub/sub`, la concatenzione degli stati tra componenti é automatica e non necessita nessuno sforzo aggiuntivo, le reazioni si propagheranno a cascata in maniera naturale, avere un accesso diretto alle varie `istanze` risultá assai performante senza complicare eccessivamante la struttura.<br/><br/>

Sfruttando il modulo `MobStore` nella sua forma piu pura l'utilizzo dello stesso standalone o all'interno di un componente risulta del tutto uguale.

`MobStore` gestisce inoltre una implementazione interna del pattern `singal` per avere un sistema di `auto-detect` delle dipendenze, importante notare come sia `opzionale`, ritengo che anche una dichiarazione esplicita delle dipendenze possa essere utile in alcuni casi.

Inoltre `MobStore` aggiunge funzionalitá interessanti quali:
- Controllo dinamico dei tipi.
- Un flow specifico per ogni stato con funzioni specifiche di
    - Validazione
    - Trasformazione del valore
    - Controllo sulla mutazione dei valori bloccante/non bloccante.


### Inizializzazione dei moduli di supporto.

I `custom component` sfruttano il concetto di `attributo`, i var moduli ( `bindProps`, `bindEffect` etc... ) sono definiti con un formato funzione che ritorna un `hash casuale`. Quando questi moduli vengono eseguiti memorizzeranno il/i parametri in ingressesso del modulo in uno specifico `Map` che come chiave ha l' hash aggiunto al componenti come `attributo`.<br/><br/>

A questo punto in fase di creazione il recupero di eventuali moduli da inizializzare risulta estremamente semplice e anche in questo caso parliamo di un accesso diretto.

### Moduli per nodi non componente.

Moduli come `bindEffect` o `delegateEvents` agiscono sia su componenti che su `nodi semplici` non tracciati dall' applicazione.<br/>
In questi casi il meccanismo é simile al precedente ( funzione che ritorna un `hash` ) ma il nodo relativo al modulo verrá memorizzato in una `weakRef()`, quando questa tornará `undefined` il modulo verrá scollegato in automatico.<br/>
Da notare che la vita della `weakRef()` viene gestita in maniera autonoma dal `GC`, perció é frequente avere un modulo attivo e una `ref` scollegata dal DOM, in questi casi é sempre previsto un valore di fallback ( nel caso per esempio che il proxi di `repeat` faccia riferimento a un elemento dell' array non piu presente ).<br/><br/>
Per i moduli che vivono all' `interno` di un tag e non `sul` tag ( `bindText`, `bindObject`, `invalidate`, `repeat` ) sono previsti `custom-element` specifici che una volta collegati al DOM rintracceranno il suo elemento parente e leggeranno gli attributi del caso prima di auto-cancellarsi.

### Repeat/Invalidate.

Questi sono i moduli piu complessi, in linea di massima funzionano come i precedenti ma con un numero maggiore di mappe di supporto ( due per modulo ) che a differenza delle altre saranno persisitenti per tutta la vita dello specifico modulo.

### Routing
Un'implentazione di un sistema di routing lato client (`hash`) é giá inclusa con tutto il necessario.

### Slot
Gli slot vengono gestiti con uno specifico custom-element.

### Memoria
Il consumo della memoria dipende dal numero di componenti/oprazioni attive in uno specifico momento, tendenzialmente cresce e diminuisce in base al contenuto della pagina. Non si rilevano perdite di memoria, tornando alla prima pagina visitata il consumo dovrebbe essere simile alla prima visita.


### Riferimenti di codice generici:

- [APP principale](https://albnavarro.github.io/mobbu/#)
- [DOCS](https://albnavarro.github.io/mobbu/#mobJs-overview)
- [Ciclo di parsing](https://github.com/albnavarro/mobbu/blob/main/src/js/mob/mob-js/parse/parse-function-while.js) principale con il flow generale della creazione dei componenti.
- [Esempio](https://github.com/albnavarro/mobbu/blob/main/src/js/mob/mob-js/modules/bind-object/index.js) di un modulo generico con referenze deboli

### Benchmark

Sono presenti delle pagine specifiche per monitare le prestazioni sulla gestione di grosse liste di max 1000 componenti, dove ogni componente usa `props reattive` e `gestione dinamica delle classi`.

- [Invalidate](https://albnavarro.github.io/mobbu/#mobJs-benchmark-invalidate)
- [Repeat senza chiave](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-no-key)
- [Repeat con chiave](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-key)
