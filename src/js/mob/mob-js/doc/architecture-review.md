# Architecture Review — MobJs

**Data analisi**: 2026-04-23
**Versione**: branch `dev` (HEAD `537451271`)
**Scope**: `src/js/mob/mob-js/` + dipendenza `src/js/mob/mob-core/`
**Report complementare**: [bug-analysis.md](./bug-analysis.md)

---

## Sommario esecutivo

MobJs è una libreria per Single Page Applications costruita su **custom elements**, **reattività pub/sub** e **zero dipendenze esterne** (fatta salva `mob-core` interna). Le scelte architetturali sono coerenti con una visione precisa: nessun build step, nessun virtual DOM, accesso diretto ai nodi DOM tramite ID.

Dopo analisi della struttura, dell'API pubblica (44+ funzioni) e di 147 file sorgente (~11.000 LOC), il giudizio complessivo è:

- **Architettura**: coerente e con una filosofia chiara; alcune scelte sono originali e ben pensate.
- **Implementazione**: solida nei casi base, fragile negli edge case (race condition, cleanup ordering) — vedi il report bug correlato.
- **Developer Experience**: accettabile per chi proviene da lit-html o web components, ostica per chi arriva da React/Vue.
- **Maturità produttiva**: incompleta — mancano test automatizzati, SSR, devtools, error boundary.

La libreria ha un **posizionamento legittimo** in una nicchia ben precisa (SPA client-only, zero-build, zero-dep) ma ha bisogno di consolidamento prima di essere adatta a progetti mission-critical.

---

## Indice

1. [Filosofia e posizionamento](#1-filosofia-e-posizionamento)
2. [Scelte architetturali — analisi pro/contro](#2-scelte-architetturali--analisi-procontro)
3. [Developer Experience](#3-developer-experience)
4. [Performance teorica](#4-performance-teorica)
5. [Maturità e lacune](#5-maturità-e-lacune)
6. [Rischi architetturali](#6-rischi-architetturali)
7. [Confronto con alternative](#7-confronto-con-alternative)
8. [Raccomandazioni](#8-raccomandazioni)
9. [Giudizio finale](#9-giudizio-finale)

---

## 1. Filosofia e posizionamento

MobJs si colloca in una nicchia precisa:

- **Zero build step**: JavaScript puro + JSDoc + file `.d.ts` per type hinting. Si esegue nativamente in browser.
- **Zero dipendenze esterne**: `mob-js` dipende solo da `mob-core`, entrambi in-house.
- **Web Components come backbone**: i componenti utente sono custom elements (`<user-component>`) e i costrutti di sistema sono custom elements placeholder (`<mobjs-repeat>`, `<mobjs-invalidate>`, `<mobjs-bind-text>`).
- **Accesso diretto 1:1**: niente virtual DOM, niente diffing dell'albero. Ogni componente ha un ID che punta direttamente a un nodo DOM tramite `componentMap` + `WeakMap`.
- **Reattività locale per componente**: niente store globale stile Redux. Ogni componente ha il proprio store `MobStore`; esiste un unico store globale (`mainStore`) dedicato al routing.

Questa combinazione ricorda **lit-html** (web components + template literal) ma con una reattività più ricca (`bindProps`, `repeat`, `invalidate`) e un runtime più corposo.

**Target d'uso realistico**:

- SPA di dimensione piccola-media in contesti dove il vincolo di avere zero build pipeline è reale (CMS, ambienti legacy, prototipi, learning).
- Progetti dove un singolo autore controlla tutto il codice e valore la leggibilità dell'internals.

**Non adatto a**:

- SSR / hybrid rendering.
- Progetti con team numeroso che si aspetta devtools maturi.
- Applicazioni mission-critical senza audit preliminare.

---

## 2. Scelte architetturali — analisi pro/contro

### 2.1 Zero build step (JS puro + JSDoc)

| Pro                                                     | Contro                                                   |
|---------------------------------------------------------|----------------------------------------------------------|
| Esecuzione diretta nel browser, debugging con source reali | No tree-shaking automatico: bundle più grosso del necessario |
| Nessuna dipendenza da tool esterni (Vite, Webpack, Babel) | JSDoc meno rigido di TypeScript; refactoring fragile     |
| Onboarding facile: basta un `<script type="module">`    | Nessun dead-code elimination / minification automatica   |
| Nessun breakage da upgrade di toolchain                 | Impossibile usare JSX, decoratori, proposal moderne      |

**Trade-off chiave**: scambia portabilità e semplicità di setup per ergonomia del refactoring e size del bundle. Buono per scopi educativi ed embedding in contesti legacy; costoso in scenari di lungo termine.

### 2.2 Reattività pub/sub su Map globali

La libreria mantiene **27 Map globali + 9 Set globali** a livello di modulo (componentMap, bindPropsMap, repeatIdsMap, invalidateIdsMap, onMountCallbackMap, ecc.).

| Pro                                                    | Contro                                                             |
|--------------------------------------------------------|--------------------------------------------------------------------|
| Lookup O(1) per ID — semplice e veloce                 | Surface area enorme per memory leak se qualche cleanup fallisce    |
| Modello concettuale semplice: nessuna compilazione del grafo delle dipendenze | Pub/sub senza deduplicazione: un set può notificare molti watcher |
| `mob-core` ignora il binding: separation of concerns pulita | Nessuna granularità: signal-level optimization impossibile       |
| WeakRef/WeakMap tentano cleanup automatico             | Rischio di update circolari solo se il child scrive esplicitamente nel parent (vedi bug M17) |

**Comparazione**: rispetto a Solid.js (signals con auto-tracking al livello di funzione) o Vue 3 (Proxy + dependency graph compilato), il modello di MobJs è più **esplicito** ma meno **efficiente** per grafi di stato complessi.

### 2.3 Web Components come backbone

Custom element sia come API utente (`createComponent({ tag })` crea un tag `<tag>`) sia come meccanismo interno: `<mobjs-repeat>`, `<mobjs-invalidate>` sono elementi segnaposto parsati dal runtime.

| Pro                                                   | Contro                                                  |
|-------------------------------------------------------|---------------------------------------------------------|
| Sfrutta standard web platform (lifecycle, upgrade)    | Accoppiamento a browser: SSR/Node non compatibile       |
| Lazy-loading naturale tramite `import()` + `<script type="module">` | `connectedCallback` asincrono → race condition (bug C4) |
| Portabilità teorica: un componente può essere riusato fuori da MobJs | Attributi HTML = stringhe → type-unsafe di base        |
| Mescolarsi con altri framework tramite standard DOM   | Nessun DevTools dedicato (vs React/Vue DevTools)        |

**Valutazione**: scelta filosoficamente solida per la portabilità, ma costa in ecosystem maturity.

### 2.4 Parser stateful vs render pipeline dichiarativo

`parse/parse-function-while.js` implementa un `while` loop che traversa il DOM cercando placeholder non parsati.

| Pro                                                  | Contro                                                  |
|------------------------------------------------------|---------------------------------------------------------|
| Nessuna allocazione Virtual DOM — memoria lean       | Flusso distribuito su ~20 file e molti step procedurali |
| Flessibilità: ogni step può hook-in logic custom     | Stato mutabile globale → bug di ordering (C4, H7)       |
| Iterazione incrementale; supporta async component    | Testing richiede DOM reale (JSDOM+ non semplice)        |
| Modifica DOM diretta: no diff overhead               | Stack trace frammentato nel debugging                   |

**Trade-off**: il parser guadagna semplicità a discapito di predicibilità. Un render pipeline dichiarativo (come in Vue o Solid, che compilano il template) localizza i bug e rende il flusso lineare.

### 2.5 Queue a 3 tick separati

`tick`, `tickRepeater`, `tickInvalidate` sono tre code indipendenti con un limite di 100.000 operazioni ciascuna (`queque/tick.js:25-31`).

| Pro                                                   | Contro                                                |
|-------------------------------------------------------|-------------------------------------------------------|
| Separa concerns: bindProps, repeater, invalidate non si intrecciano | Tre code triplicano i punti di possibile race         |
| Batching: molti update → un tick                      | Limite è soft (emergency clear, non throw): maschera bug a monte |
| `awaitNextLoop` consente batching via microtask       | Orchestrazione fra code dipende da dettagli implementativi |
| Ordine FIFO consistente                               | Difficile per lo sviluppatore prevedere quando esattamente scatta il flush |

**Comparazione**: React (Concurrent Scheduler + Lanes), Vue (`nextTick` unico con batching), Solid (EffectBoundary esplicito). MobJs occupa una posizione intermedia: più semplice di React ma più opaco di Vue/Solid.

### 2.6 WeakRef / WeakMap per cleanup automatico

Almeno 10 file usano `WeakRef` (delegate-events, bind-text, bind-object, bind-effect, ecc.) per tenere riferimenti agli elementi DOM senza ostacolare il GC.

| Pro                                                 | Contro                                                     |
|-----------------------------------------------------|------------------------------------------------------------|
| Nessuna cleanup esplicita richiesta al developer    | `WeakRef.deref()` può tornare `undefined` in modo non deterministico |
| Prevenzione di listener orfani                      | Pattern TOCTOU: `ref.deref() → await → ref.deref()` può fallire (bug H1) |
| Relazione 1:1 elemento ↔ componentId robusta        | Fallback necessari ovunque → complessità                   |
| Browser-native (no polyfill per browser moderni)    | Debugging memory leak difficile: GC timing imprevedibile  |

**Valutazione**: elegante ma rischioso in produzione. Il pattern `withAliveRef(ref, fn)` proposto nel bug analysis mitigherebbe gran parte dei problemi.

### 2.7 Mutable state store

`MobStore` espone `set`, `update`, `emit` con semantica imperativa.

| Pro                                                 | Contro                                              |
|-----------------------------------------------------|-----------------------------------------------------|
| Intuitivo: `store.set('foo', value)`                | Time-travel debugging impossibile                   |
| Nessun overhead di cloning                          | Mutazioni accidentali: `store.get('arr').push(x)` silenzioso |
| Pipeline di `transform`/`validate` al set possibile | Nessuna structural sharing → copia di memoria per oggetti grandi |
| Computed opzionale, non forzato                     | Stato storico non tracciabile → test più fragili    |

**Comparazione**: più vicino a MobX/Zustand (mutable) che a Redux (immutable). Scelta pragmatica.

### 2.8 Routing hash-based

`location.hash` + `hashchange` + un parser semplice per query string.

| Pro                                               | Contro                                                 |
|---------------------------------------------------|--------------------------------------------------------|
| Client-only: nessun bisogno di configurare il server | SEO hostile: il `#` è un fragment, non indicizzato    |
| URL = stato completo: bookmarking banale          | History API non usata: back/forward meno precisi (bug H10) |
| Nessun 404 lato server                            | Query string parser troppo aggressivo (bug M6)         |
| Nessuna dipendenza da framework di routing        | Deep linking percepito come "datato" nel 2026          |

**Comparazione**: React Router, Vue Router, Solid Router default a History API. Hash routing è ormai minority.

### 2.9 State co-located per componente

Niente Redux-like store centrale; solo `mainStore` per routing + UI state globale essenziale.

| Pro                                              | Contro                                              |
|--------------------------------------------------|-----------------------------------------------------|
| Encapsulation: stato = responsabilità del componente | Cross-component communication = prop-drilling o eventi custom |
| Scalabilità modulare: N componenti = N store indipendenti | Debugging: stato sparso, nessuna source-of-truth visualizzabile |
| Component + state sono un'unità riusabile        | Data sharing tra più di ~5 componenti diventa doloroso |
| Niente "lift state up"                           | Test richiedono mock store per ogni componente      |

**Valutazione**: buono per applicazioni medie, problematico se il dominio richiede molta condivisione di stato.

### 2.10 Template: HTML string + htmlObject DSL

Doppia sintassi: `` html`...` `` (template literal) e `htmlObject({ tag, content, ... })` (DSL a oggetti).

| Pro                                               | Contro                                                 |
|---------------------------------------------------|--------------------------------------------------------|
| No JSX: no transpilazione                         | Due sintassi parallele → inconsistenza e costo cognitivo |
| `htmlObject` tipizzabile con JSDoc                | Template string non hanno type safety per tag/attr    |
| Hyperscript-style: composabile come funzioni      | `htmlObject` verboso per strutture annidate           |
| Familiare per chi conosce lit-html                | Nessun autocomplete IDE equivalente a JSX             |

**Valutazione**: flessibile ma divisa. Un singolo approccio (o l'uno o l'altro) ridurrebbe il cognitive load.

---

## 3. Developer Experience

### 3.1 API surface

La superficie API esportata da `modules.js` raggruppa **circa 44+ funzioni/oggetti** pubblici in cinque aree:

- **Component lifecycle & state** (13): `createComponent`, `useComponent`, `getState`, `setState`, `getStateById`, `watchById`, ecc.
- **Reattività avanzata** (9): `bindProps`, `bindEffect`, `bindEvents`, `bindText`, `bindObject`, `getProxi`.
- **DOM & dinamica** (10): `repeat`, `invalidate`, `renderComponent`, `removeDOM`, `getChildren`, `delegateEvents`, `slot`.
- **Routing** (5): `beforeRouteChange`, `afterRouteChange`, `onRouteLoading`, `getActiveRoute`, `getActiveParams`, `loadUrl`.
- **Utility & debug** (7): `inizializeApp`, `mainStore`, `tick`, `getRoot`, `staticProps`, `getDebugMode`.

**Valutazione**: superficie ampia ma coerente. Un developer che aggiunge una feature banale (es. una lista) deve toccare almeno 4 concetti (`createComponent`, `repeat`, `bindObject`, template literal). Per confronto, Svelte permette lo stesso in uno snippet di 5 righe.

### 3.2 Hello World

Un componente minimo con state + event + rendering richiede **~30 righe**; con registrazione `createComponent` si arriva a ~40. Per confronto:

- Svelte: ~8 righe.
- Vue SFC: ~15 righe.
- React: ~10 righe.
- Solid: ~12 righe.
- lit-html: ~25 righe.

Il verboso è il prezzo del "no-build": JSX riduce molto la sintassi a costo di transpilazione.

### 3.3 Type safety

Il sistema di tipi è basato su JSDoc + file `.d.ts` (19 file presenti).

**Pro**:
- Funziona in VS Code e WebStorm senza config.
- Zero build step.
- Type definitions pubbliche sono ricche (es. `type.d.ts:98-144`).

**Contro**:
- JSDoc non cattura tutti i vincoli (union types, narrowing, template literal types limitati).
- I `.d.ts` sono scritti a mano (non generati da `tsc`) → drift possibile tra implementazione e tipi.
- Errori di tipo scoperti a runtime in assenza di un IDE ben configurato.
- Nessun `tsc --noEmit` CI step (da verificare nel package.json).

### 3.4 Debugging e DevTools

**Assenti**:
- Nessuna estensione browser (al contrario di React DevTools, Vue DevTools).
- Nessun logging strutturato degli update reattivi.
- Warning minimali (`console.warn('bindProps not valid')`).
- Nessuna time-travel capability.

**Presenti**:
- Un flag `debug` per componente.
- Alcuni `console.log` nella queue per tracing manuale.
- Metodo `debug()` nei props componente (utilizzo limitato).

**Valutazione**: debug production-level difficile. Per identificare il percorso di un update reattivo servono ~15 frame di stack trace sparsi su molti file.

### 3.5 Error messages e feedback

- **Parsing**: nessun schema validator; errori di attributo HTML scoperti a runtime.
- **Circular dependencies**: solo emergency clear di queue (non throw).
- **`onMount` errors**: non catturati (bug H8) → crash della pipeline di parsing.
- **Store validation**: `console.warn` senza throw → errori silenziati.

---

## 4. Performance teorica

### 4.1 Costo di un update reattivo

```
store.set('foo', val)
  1× Map lookup (storeMap)                                  O(1)
  notify N watcher                                          O(N)
  for each watcher → incrementTickQueue                     O(1)
  await next loop → drain queue (Q operations)              O(Q)
  for each component affected → applyBindProps              O(M)
```

Worst-case complessivo: **O(N × M)** dove N = watcher, M = componenti.

**Comparazione**:
- Solid.js signal: O(dependency graph) con auto-tracking.
- React: O(Fiber tree traversal) con memoization.
- Vue 3: O(reactive graph) batchato.

**Conclusione**: MobJs è competitivo per dimensioni piccole-medie (<100 componenti reattivi) ma il modello non scala linearmente come Solid.

### 4.2 Reconciliation con `repeat`

- **Con chiave univoca**: O(N) grazie a `keyToIndex` Map.
- **Senza chiave**: O(N²) worst-case (diff posizionale).
- **Con chiavi duplicate**: risultato imprevedibile (bug H2).

Benchmark present in README (fino a 1000 componenti) ma non ci sono dati pubblicati riproducibili.

### 4.3 Memory footprint

Ogni componente occupa, stimato:

- `componentMap` entry: ~0.2 KB
- store instance: ~0.5 KB
- `weakElementMap` entry: ~0.1 KB
- watcher subscriptions: ~0.05 KB per watcher

Totale: ~0.8 KB baseline + 0.5 KB per prop reattiva. Per 1000 componenti con 20 prop ciascuno → ~1.4 MB di solo stato. Non è proibitivo ma è superiore a Svelte (compilato via) o Solid (grafi più compatti).

---

## 5. Maturità e lacune

### 5.1 Test automatizzati

**Stato**: nessun file `.test.js` o `.spec.js` trovato nella cartella `mob-js`. Esiste `test.md` (documentazione di esempi) ma non una test suite automatizzata.

Questo è la **lacuna più grave**: una libreria con ~11.000 LOC e 35 bug concreti identificati senza una rete di protezione automatizzata.

### 5.2 Documentazione

- `README.md` (119 righe): buona sulla filosofia, più leggera sui dettagli pratici.
- Cartella `doc/`: presenta `parentId.md`, `test.md`, snippet di sotto-aree.
- JSDoc inline: presente ma non uniforme.
- **Assente**: sito API reference navigabile, guide step-by-step, esempi live.

### 5.3 SSR / Hydration

**Assente per design**. La libreria dipende da DOM live (`customElements`, `window.hashchange`, `WeakRef`). Il porting a SSR richiederebbe riscrittura significativa del parser e sostituzione del routing hash-based con History API.

### 5.4 Error boundary

**Assenti**. Un throw nel componente utente si propaga e interrompe il parsing. Nessun meccanismo tipo React `<ErrorBoundary>` o Vue `errorCaptured`.

### 5.5 Async / Suspense

**Parziale**. Le `componentFunction` e `onMount` possono essere `async` ma non c'è un'astrazione tipo `<Suspense>` per sospendere il rendering in attesa di dati.

### 5.6 Dev mode vs Prod mode

**Differenziazione minima**. Un flag `debug` per componente, qualche `console.log` nelle code. Manca:

- Warning per pattern pericolosi (chiavi duplicate nel repeat, feedback loop child→parent, ecc.).
- Freezing dei plain objects in dev mode per intercettare mutazioni accidentali.
- Stripping dei log/assert in produzione.

### 5.7 TypeScript

**Support "second class"**. I file `.d.ts` sono scritti a mano, non generati. Il codice sorgente è JS+JSDoc. Un progetto che vuole usare MobJs da TypeScript sofre del drift fra `.d.ts` e implementazione.

---

## 6. Rischi architetturali

### R1 — DOM manipolato da codice esterno

Se un plugin jQuery o un altro script manipola il DOM dei nodi gestiti da MobJs, `componentMap` e `weakElementMap` diventano inconsistenti. Il parser non ri-sincronizza, rendendo la libreria fragile in ambienti ibridi.

**Probabilità**: alta in contesti legacy (che sono proprio il target dichiarato).

### R2 — SSR / Ambienti non-browser

Impossibile a livello fondamentale: `document`, `window`, `customElements`, `WeakRef`, `hashchange` sono tutti accoppiati al browser.

**Probabilità**: media — un progetto che cresce spesso vuole SSR per SEO.

### R3 — Micro-frontend / Shadow DOM host

Il parser usa `querySelector` che non penetra shadow boundaries. Uso in micro-frontends con shadow DOM è non banale.

**Probabilità**: bassa oggi, ma trend di crescita.

### R4 — Memory leak cumulativi

27 Map globali senza cleanup esplicito in tutti i percorsi. Il bug analysis ha identificato almeno 6 leak path potenziali (M2, H5, H6, M5, M12, C2).

**Probabilità**: alta in applicazioni con cicli di vita lunghi (dashboard lasciate aperte per ore/giorni).

### R5 — Race durante navigazione

Vari bug (H4, H7, M3, M8, H10) convergono sullo stesso problema: codice async che non viene cancellato quando l'utente cambia route.

**Probabilità**: alta in applicazioni con navigazione veloce o lazy-load di componenti.

---

## 7. Confronto con alternative

| Aspetto                | MobJs                     | React      | Vue 3      | Svelte    | Solid     | lit-html   |
|------------------------|---------------------------|------------|------------|-----------|-----------|------------|
| Build step             | No                        | Sì         | Sì         | Sì        | Sì        | Opzionale  |
| Bundle minimo          | ~15 KB stimato            | ~42 KB     | ~34 KB     | ~8 KB     | ~9 KB     | ~5 KB      |
| Virtual DOM            | No                        | Sì         | Sì         | No        | No        | No         |
| Reactivity model       | Pub/sub + Map             | Hooks      | Proxy      | Compile   | Signals   | Template   |
| Template syntax        | html string + htmlObject  | JSX        | SFC/JSX    | .svelte   | JSX       | Template literal |
| TypeScript first-class | Parziale (.d.ts manuale)  | Sì         | Sì         | Sì        | Sì        | Sì         |
| SSR                    | No                        | Sì         | Sì         | Sì        | Sì        | Sì         |
| Router integrato       | Sì (hash)                 | No (esterno) | No       | No        | No        | No         |
| State management       | Per componente            | Esterno    | Esterno    | Built-in  | Built-in  | Esterno    |
| DevTools dedicati      | No                        | Sì         | Sì         | Sì        | Parziali  | No         |
| Ecosystem              | Nessuno                   | Enorme     | Grande     | Medio     | Crescente | Piccolo    |
| Learning curve         | Media                     | Alta       | Media      | Bassa     | Media-alta | Bassa    |

**Conclusione del confronto**: MobJs occupa lo stesso spazio di `lit-html` (web-components-first, zero-build opzionale) ma con più funzionalità integrate (routing, repeat, invalidate). Il suo deficit principale è l'**ecosystem** (test, devtools, community).

---

## 8. Raccomandazioni

Ordinate per priorità.

### Priorità 1 — Sbloccare la production readiness

1. **Test suite automatizzata** con Vitest o Jest + JSDOM. Target: 70% coverage sui percorsi critici (parser, queue, bindProps, repeater, router). Senza test, ogni fix dei 35 bug identificati rischia una regressione.
2. **Risolvere i 3 bug CRITICAL** del report complementare (C1, C2, C4).
3. **Token di cancellazione** per operazioni async (H4, H7): un singleton `navigationToken` incrementato ad ogni `loadUrl`; ogni operazione async controlla `isCancelled` dopo ogni await.
4. **Error boundary**: almeno un try/catch in `parseComponents` e `fireOnMountCallBack` per evitare crash della pipeline (H8).
5. **Guard di idempotenza** su `inizializeApp` per supportare HMR e test (C2).

### Priorità 2 — Ridurre la superficie di bug

6. **Helper `withAliveRef(ref, fn)`** per centralizzare il pattern `WeakRef.deref()` (H1).
7. **Refactor del teardown sequence**: una singola funzione orchestratrice con ordine esplicito (freeze watcher → remove listener → destroy state → remove DOM) per risolvere C4, H3, H7, M1, M10, M16.
8. **Cycle detection** nei watcher (M17): dev-mode warning quando un child scrive nel parent durante la finestra di update di `bindProps`; `skipEqual` di default nei watcher creati da `bindProps`.
9. **Sanitize routing params** con regex ancorate (M6).

### Priorità 3 — Migliorare la DX

10. **Unificare la sintassi template**: scegliere tra `html` e `htmlObject`, deprecare l'altra o documentare esplicitamente quando usare l'una o l'altra.
11. **Dev mode con warning strutturati**: chiavi duplicate in `repeat`, feedback loop child→parent, componenti orfani, listener non cleanup.
12. **`tsc --noEmit` in CI** per verificare che i `.d.ts` non divergano dall'implementazione.
13. **Generare `.d.ts` da JSDoc** automatismo (tsc con `allowJs` + `declaration`) invece di mantenerli a mano.
14. **API reference navigabile**: TypeDoc o simile.

### Priorità 4 — Espansione strategica (opzionale)

15. **SSR minimo**: anche solo pre-rendering statico per la home page; aprirebbe la libreria a progetti content-heavy.
16. **DevTools browser extension** anche minima: lista componenti, ispezione dello state.
17. **Esempi runnable**: playground con StackBlitz o equivalente.
18. **npm package**: pubblicazione con semver per facilitare adozione esterna.

---

## 9. Giudizio finale

### Punti di forza

1. **Coerenza filosofica**. Le scelte architetturali sono consistenti fra loro e riflettono una visione chiara (no-build, no-VDOM, web components, accesso diretto).
2. **Zero dipendenze esterne**. Supply chain risk nullo. Rilevante in contesti enterprise preoccupati per la sicurezza.
3. **Web platform alignment**. Usare custom elements significa sfruttare standard stabili e a lungo termine.
4. **Flessibilità di embedding**. La libreria può essere inserita in pagine esistenti senza setup complesso.
5. **Reattività ricca out-of-the-box**. `bindProps`, `repeat`, `invalidate`, `bindText`, `bindEffect` sono primitives potenti che non richiedono librerie esterne.

### Punti deboli

1. **Zero test automatizzati**. Il fattore singolo più bloccante per la production readiness.
2. **Bug concreti non corretti**. 35 bug identificati di cui 3 critical nel report complementare.
3. **Parser stateful difficile da manutenere**. Il flusso di parse è sparso su ~20 file.
4. **Nessun devtools / debugging strutturato**. Debugging in produzione richiede esperienza interna della libreria.
5. **SSR impossibile**. Esclude la libreria da una fetta rilevante del mercato SPA moderno.
6. **TypeScript support second-class**. I `.d.ts` mantenuti a mano sono una fonte di drift.

### Quando usare MobJs

- Applicazioni SPA client-only di dimensione piccola-media.
- Prototipi o progetti educativi.
- Contesti dove il vincolo di "no build step" è reale.
- Controllo totale del codice (autore singolo o team piccolo).

### Quando NON usare MobJs

- Applicazioni mission-critical senza audit e hardening preliminari.
- Progetti che richiedono SSR o SEO serio.
- Team grandi che si aspettano devtools e community maturi.
- Codebase lunghe vive (anni) senza un piano di manutenzione dedicato.

### Valutazione finale

MobJs è un **progetto interessante e ben pensato** che dimostra che è possibile costruire una libreria SPA completa senza dipendenze esterne e senza build step. Le scelte architetturali sono coerenti e originali.

L'**implementazione** però è in una fase che tecnicamente si definirebbe **"prototype / beta avanzata"**: l'architettura funziona nei casi d'uso previsti, ma la combinazione di "zero test + bug residui + cleanup fragile" rende rischioso un uso production senza un lavoro di consolidamento.

Con il piano di raccomandazioni della sezione 8 (soprattutto Priorità 1 e 2), la libreria può ragionevolmente raggiungere uno stato production-ready nell'arco di 3-6 settimane di lavoro focalizzato.

---

## Note metodologiche

L'analisi è stata condotta tramite revisione statica del codice in tre passaggi:

1. Mappatura strutturale (cartelle, API pubblica, flussi principali).
2. Bug hunt approfondito (vedi `bug-analysis.md`).
3. Valutazione architetturale (questo documento).

Nessun test runtime è stato eseguito. Le valutazioni di performance sono **teoriche** e andrebbero confermate da profiling reale (Chrome DevTools Performance tab su scenari realistici).

Le comparazioni con React, Vue, Svelte, Solid, lit-html sono basate sulla conoscenza pubblica delle rispettive architetture al 2026; alcune metriche (bundle size, memoria per componente) sono ordini di grandezza, non misure esatte.

Le raccomandazioni della sezione 8 riflettono buone pratiche generali di ingegneria del software applicate alla specificità del progetto; non sono prescrittive ma indicative.
