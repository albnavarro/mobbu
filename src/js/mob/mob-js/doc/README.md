## Premessa
Questo modulo come gli altri é pensato per un **uso personale**, ma potrebbe ( ipotesi alquanto remota ) poter risultare interessante.<br/><br/>
Il seguente documento intende solo dare **spunti generici**, avendoli utilizzati ritengo che siano validi.<br/>
Anche se nel sito c'é una estesa documentazione serve prima di tutto per **mettere alla prova il sisitema** e poi per il **me stesso utente**.<br/><br/>
Motivo per cui non verrá fatto nessuno pacchetto **npm**, consideriamo che tutto questo é stato scritto per non avere dipendenze **npm**.<br/><br/>
Se mai ci fosse dell' interesse basta scaricare il **repository**.


## Concetti base del mobulo MobJs:
Di seguito i concetti base del modulo per capire a grandi linee la logica di base.<br/>
Il concetto ricorrente é la ricerca di una astrazione il piú **semplice** e immediata possibile, il trick é avere sempre  **accesso immediato** ai vari elementi senza necessitá di filtrare grosse strutture di dati.<br/>
- Il modulo deve essere mantenibile e di conseguenza **deve** essere il piu semplice e chiaro possibile.<br/>
- Il modulo **non** deve evere **dipendenze esterne** e deve poter girare nativamante sui browser senza step di compilazione.

### Tipizzazione

Una **tipizzazione** tramite **jsDoc** e **d.ts** si é rivelata piú che sufficente per ottenere un buon controllo dei tipi senza step di compilazione.

### Strutture dati:

Viene fatto un ampio uso delle strutture dati di tipo **Map**/**Set** e in casi particolari **WeakMap**/**WeakSet**/**WeakRef**.<br/>
Queste strutture sono tra le piú efficienti e comode per accedere ai dati essendo pensate in maniera specifica per un accesso diretto.<br/> Dovenedo ragionare con **HTMLElement univochi** rendono anche piú robusto tutto il sistema essendo progettare propio in questo senso.<br/>
Il modulo é strutturato per sfruttare al massimo la potenzialitá di queste strutture dati. Le query sul DOM sono da considerarsi l'ultima soluzione, ragionando con grandi numeri sono **lente** e spesso non **determistiche**, ragionare in termini di realzioni **1:1** rende tutto il sisitema piú efficiente e meno soggetto a errori.


### Perché i custom-component ?

I componenti vengono aggiunti al DOM sotto forma di **custom-element**, tali elementi sfruttano il metodo **connectedCallback** per intercettare il nodo **root** dell' elemento ( `host` ) e aggiungerlo ad uno specifico **Set**, se il nodo cambia posizione ( usiamo degli slot ) e viene aggiunto piú volte non genererá nessun problema essendo una struttura di dati **univoci**.<br/> Il **Set** finale rispecchierá naturalmente l'ordine di inserimento dei **componenti** ( **Preorder traversal** ).<br/><br/>
**Non sara il mudulo che cerca i componenti da renderizzare ma saranno gli stessi che si renderanno disponibili.**<br/><br/>
Una volta che il nostro DOM con tutti i componenti é stato aggiunto basterá ciclare il **Set** aggiornato e per ogni **occorrenza** tramite il **tag** recuperare la funzione che si occuperá di **renderizare** il componente finale. Questo tipo di operazione risulta decisamente semplice ed estremamente efficace.<br/><br/>
In questo caso non possiamo avere un accesso diretto ma di base useremo sempre l'elemento con indice piu basso. Se ragioniamo in termini di **find** avremmo nel 99% dei casi una **singola iterazione**.<br/><br/>
L' unica accortezza e controllare che il **primo nodo disponibile** sia figlio del **nodo root** del blocco DOM che stiamo analizzando, altrimenti passiamo al prossimo, al 99% delle situazioni é un controllo superfluo ma essendo del tutto ininfluente in termini prestazionali viene cmq. effettuato.<br/><br/>
Anche se la creazione di un componente parte da un **custom-element** il componente finale non dovrá necessariamente essere un **custom-component**,  il DOM del componente finale viene ritornato dalla **funzione-componente**.<br/>

### Mappa dei componenti.

Tutti i componenti fanno riferimento ad una mappa che si occupa di gestire lo stato attuale del componente e tutti i suoi parametri in un deteminato momento. **Questa mappa rappesenta il cuore del modulo**. Conoscendo l'**id** del componente avremmo sempre un accesso instantaneo a tutte le sue informazioni.<br/><br/>
E' implementata anche una specifica **WeakMap** che ha come chiave il nodo **root** del componente  e come valore il suo **id**, questo permette un accesso diretto anche partendo dal **nodo html** e non dal suo **id**. Anche qui sfruttiamo la capacitá di avere solo **elementi univoci**<br/><br/>
**Nota**: Quest'ultima mappa viene utilizzata anche per trovare l'**id** del componente **parente** in maniera ottimale e veloce ripercorrendo a ritroso l'alberatura partendo dal nodo **root** di un componente e chiedendo alla mappa l'**id** del nodo corrente, generalmente in **2/3 cicli** si invidua il **nodo-componente** parente piú prossimo eseguendo operazioni sul DOM molto banali ( **node.parentNode** ).<br/><br/>
**La mappa dei componenti avrá di conseguenza anche tutte le informazioni per generare un albero gerarchico dei componenti correnti.**<br/><br/>
**Nota**: Il modulo **repeater** ( lista dinamicha ) terrá traccia questi **id** nella sua struttura dati per poter accedere ai componenti contenuti in maniera efficace, in modo analogo il componente stesso avrá traccia dell' **id** del modulo **repeater** in cui é innestato, é un ragionamento semplice ma efficace, é solo un esempio per capire come é impostata tutta la logica del modulo.

### Stato del componente.

Lo **stato** del componente é una semplice istanza di **[MobStore](https://github.com/albnavarro/mobbu/tree/main/src/js/mob/mob-core/store)**, nulla viene fatto per adattarlo alla struttura, per ogni componente creato viene creato un nuovo **store** e nel caso valorizzato con i dati dei vari moduli ove necessario. I suoi parametri saranno poi passati come argomento alla **funzione-componente**, e lo stesso abbinato al componente nella **mappa generale**.<br/><br/>


Il **goal** in questo caso é stato quello di includere lo **store** senza dover aggiungere alcuna specifica ma lasciandolo vivie come modulo esterno. Lavorare su un modulo senza dover pensare che sará parte integrante di un componente ha **semplificato** tutto il processo notevolmente.<br/><br/>
**La libreria di componenti semplicemente usará le sue API come farebbe un utente in un suo utilizzo standalone**.
<br/></br>

Lo **store** sfrutta il classico pattern **pub/sub** implementando anche utility come **proxi** e **computed**.<br/><br/>
Come per **MobJs** non vengono usate **classi** bensi una primitiva di tipo **Map** che abbina una chiave ai dati.
Questo permette abbianare per ogni **store** anche piu **chiavi** per **derivare** in maniera semplice dati da altri **store** ( senza peró permesso di scrittura, parliamo di **bindStore** ).<br/><br/>

Anche in questo caso l'accesso ai dati é sempre diretto **1:1**.<br/><br/>

Srfuttando il concetto di **pub/sub**, la **concatenzione** degli stati tra componenti é automatica e non necessita nessuno sforzo aggiuntivo, le reazioni si **propagheranno a cascata in maniera naturale**.<br/><br/>

**MobStore** gestisce inoltre una implementazione interna del pattern **singal** per avere un sistema di **auto-detect** delle dipendenze ( pensiamo ai **computed** ), importante notare come sia **opzionale**, ritengo che anche una dichiarazione esplicita delle dipendenze possa essere utile in alcuni casi.

Inoltre **MobStore** aggiunge funzionalitá interessanti quali:
- Controllo dinamico dei tipi.
- Un flow per ogni stato che comporende:
    - Validazione
    - Trasformazione del valore
    - Controllo sulla mutazione dei valori bloccante/non bloccante.


### Inizializzazione dei moduli di un componente.

I **custom component** sfruttano il concetto di **attributo**, i var moduli ( **bindProps**, **bindEffect** etc... ) sono definiti come una **funzione che ritorna una chiave**.<br/><br/> Quando questi moduli vengono eseguiti salveranno **i parametri in ingressesso** del modulo in una specifica **mappa** la cui chiave verrá aggiunta al **custom-component** come attributo, che potra leggerla e salvarla.

A questo punto in fase di creazione bastera **interrogare** il **custom-component** da renderizzare e recuperare le **chiavi accumulate** per ottenere i **dati originali** da utilizzare.

### Moduli per nodi non componente.

Moduli come **bindEffect** o **delegateEvents** agiscono sia su **componenti** che su **nodi semplici** non tracciati dall' applicazione.<br/><br/>
In questi casi il meccanismo é simile al precedente ( funzione che ritorna una chiave ) ma il nodo relativo al modulo verrá memorizzato in una **weakRef()**, quando questa diventerá **undefined** il modulo verrá scollegato in automatico. Questo semplice meccanismo ha permesso di avere per la maggior parte dei moduli un **singolo file di codice** del tutto indipendente.<br/><br/>
Da notare che la vita della **weakRef()** viene gestita in maniera autonoma dal **garbage collector**, perció é frequente avere un modulo attivo e una **ref** scollegata dal DOM, in questi casi é sempre previsto un valore di **fallback** ( **l'ultimo valore valido ottenuto** ) per non generare errori.<br/><br/>
Per i moduli che vivono all' **interno di un tag** e non **sul tag** ( **bindText**, **bindObject**, **invalidate**, **repeat** ) sono previsti **custom-element** specifici che una volta collegati al DOM rintracceranno il suo **elemento parente** e recupereranno gli **attributi** del caso prima di **auto-cancellarsi**.<br/><br/>

In ottica di **semplificazione** tutte le operazioni dinamiche che avvengono all'interno di un **nodo** prevedono sempre il **rimpiazzo dell'intero contenuto del nodo**, questo limite é, a parere mio, del tutto **accettabile**, la semplificazione che porta e maggiore agli svantaggi che sono assolutamante minimi.<br/><br/>

**bindText** e **bindObject** utilizzando massivamante le **String.raw** per aggiornare contenuti testuali, ogni occorrenza in una stringa verrá sempre converitita nel suo valore **corrente**.<br/>


### Repeat/Invalidate.

Questi sono i moduli piu complessi, in linea di massima funzionano come i precedenti ma con un numero maggiore di mappe di supporto ( due per modulo ) che a differenza delle altre saranno persisitenti per tutta la vita dello specifico modulo.

### Routing
Un'implentazione di un sistema di **routing** lato client (`hash`) é giá inclusa con tutto il necessario.

### Slot
Gli **slot** vengono gestiti con uno specifico **custom-element**.

### Tick
Un **tick** ( orologio interno ) dell' applicazione risulta utile per scandire l'ordine degli eventi ed evitare problemi, per esempio le props si devono aggiornare solo dopo che tutti gli aggiornamanti del DOM sono stati completati, oppure un evento di click deve essere bloccato se il sistema non é pronto a riceverlo ed é occupato per esempio a renderizzare un nuovo blocco di dom.<br/>

### Memoria
Il consumo della memoria dipende dal numero di componenti/operazioni attive in uno specifico momento, tendenzialmente cresce e diminuisce in base al contenuto della pagina. **Non si rilevano perdite di memoria**, tornando alla prima pagina visitata il consumo dovrebbe essere simile alla prima visita.


### Riferimenti di codice generici:

- [APP principale](https://albnavarro.github.io/mobbu/#)
- [DOCS](https://albnavarro.github.io/mobbu/#mobJs-overview)

### Benchmark

Sono presenti delle pagine specifiche per monitare le prestazioni sulla gestione di grosse liste di max 1000 componenti, dove ogni componente usa `props reattive` e `gestione dinamica delle classi`.

- [Invalidate](https://albnavarro.github.io/mobbu/#mobJs-benchmark-invalidate)
- [Repeat senza chiave](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-no-key)
- [Repeat con chiave](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-key)
