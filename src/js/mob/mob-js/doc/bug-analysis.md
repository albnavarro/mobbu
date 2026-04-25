# Bug Analysis Report — MobJs

**Data analisi**: 2026-04-23 (aggiornato 2026-04-24)
**Versione analizzata**: branch `dev` (HEAD `537451271`)
**Scope**: `src/js/mob/mob-js/` con dipendenza `src/js/mob/mob-core/`

---

## Sommario esecutivo

L'analisi ha identificato **31 bug concreti** (dopo riclassificazione di 3 falsi positivi: H1, H4, H11 e downgrade di H3 a MEDIUM).

### Stato corrente (2026-04-25)

| Severità    | Trovati | Risolti | Aperti |
|-------------|---------|---------|--------|
| CRITICAL    | 3       | 3       | **0**  |
| HIGH        | 7       | 5       | **2**  |
| MEDIUM      | 17      | 2       | **15** |
| LOW         | 4       | 1       | **3**  |
| **Totale**  | **31**  | **11**  | **20** |

### Distribuzione per severità (bug trovati):

| Severità    | Conteggio | Descrizione                                                   |
|-------------|-----------|---------------------------------------------------------------|
| CRITICAL    | 3         | Crash, render inconsistente, side-effect duplicati            |
| HIGH        | 7         | Race condition, memory leak non deterministici, null-access   |
| MEDIUM      | 17        | Edge case, ordering problems, cleanup imperfetto              |
| LOW         | 4         | Ipotetici, da verificare; principalmente micro-edge-case      |

> Nota: H1 è stato riclassificato come FALSO POSITIVO dopo riverifica (2026-04-24) — la spec ECMAScript garantisce stabilità di `WeakRef.deref()` all'interno dello stesso Job. Il conteggio HIGH passa da 11 a 10.
> Nota: H3 è stato declassato a MEDIUM e assorbito in M10 dopo riverifica (2026-04-24). Il conteggio HIGH passa da 10 a 9.
> Nota: H4 è stato riclassificato come FALSO POSITIVO dopo riverifica (2026-04-24) — il triplice guard su `MAIN_STORE_ROUTE_IS_LOADING` impedisce lo scenario descritto. Il conteggio HIGH passa da 9 a 8.
> Nota: H11 è stato riclassificato come FALSO POSITIVO dopo riverifica (2026-04-24) — il filtro è defensive code coerente con `REPATE_PROXI_FAIL`. Il conteggio HIGH passa da 8 a 7.
> Nota: H7 è stato FIXED (2026-04-24) spostando `cleanDelegateEvent` dentro `applyDelegationBindEvent`, risolvendo la race async/sync fra registrazione di nuovi WeakRef e pulizia dei ref morti.
> Nota: H10 è stato FIXED (2026-04-24) sostituendo la variabile modulo `currentHistory` con un flag booleano `pendingHistoryNavigation` consumato atomicamente dal listener hashchange prima dell'`await`.
> Nota: H5 è stato FIXED (2026-04-25) — gli handler di `bind-events` sono tracciati in `componentMap.bindEventsHandlers` e rimossi in `removeAndDestroyById`. L'implementazione usa l'infrastruttura esistente invece di una Map dedicata, salvando `{eventName, handler}` per ogni listener.

I pattern ricorrenti che emergono dall'analisi sono quattro e suggeriscono interventi trasversali più efficaci rispetto a fix puntuali:

1. **`WeakRef.deref()` chiamato più volte** nello stesso blocco con async gap in mezzo (TOCTOU).
2. **Cleanup ordering**: la distruzione dei componenti nidificati ha race multiple con il route change.
3. **Idempotenza di `inizializeApp`**: listener registrati a module-load, stato globale non resettabile.
4. **Mancanza di token di cancellazione** per operazioni asincrone interrotte da navigazione.

---

## Metodologia

L'analisi è stata condotta con tre sotto-agenti paralleli che hanno letto il codice riga per riga, cercando:

- Race conditions
- Null/undefined access
- Infinite loop / stack overflow
- Memory leak (Map/Set globali, WeakRef non liberate, listener orfani)
- Order-of-operation bugs
- Off-by-one
- Error handling mancante
- TOCTOU (time-of-check / time-of-use)
- State staleness nelle closure
- Mutation durante iterazione

Sono stati **esclusi** dallo scope:

- Stile del codice (naming, indentation, commenti)
- Bug puramente ipotetici senza evidenza nel codice
- Ottimizzazioni di performance senza impatto funzionale

Ogni bug riporta: **file:linea**, **tipo**, **descrizione tecnica**, **scenario riproduttivo**, **codice problematico** e **fix suggerito**.

---

## Indice dei bug

### Critical

- [C1 — Double hashchange firing in `loadUrl`](#c1--double-hashchange-firing-in-loadurl) **FIXED**
- [C2 — Event listener `click` su `document` mai rimosso](#c2--event-listener-click-su-document-mai-rimosso) **FIXED (vedi appendice)**
- [C4 — `repeaterParentElement` null dopo `await beforeUpdate()`](#c4--repeaterparentelement-null-dopo-await-beforeupdate) **FIXED**

### High

- ~~H1 — TOCTOU con doppio `ref.deref()`~~ **FALSO POSITIVO (vedi appendice)**
- [H2 — Key-based diff con chiavi duplicate](#h2--key-based-diff-con-chiavi-duplicate) **FIXED**
- ~~H3 — Ordine cleanup: children distrutti prima del parent-state~~ **DOWNGRADED a MEDIUM, merge in M10 (vedi appendice)**
- [~~H4 — `parseComponents` non cancellabile durante route transition~~](#h4--parsecomponents-non-cancellabile-durante-route-transition) **FALSO POSITIVO**
- [H5 — Event listener di `bind-events` mai rimossi](#h5--event-listener-di-bind-events-mai-rimossi) **FIXED**
- [H6 — `cleanDelegateEvent` rimuove listener da root disconnesso](#h6--cleandelegateevent-rimuove-listener-da-root-disconnesso)
- [H7 — `removeCancellableComponent()` ordering vs `parseComponents`](#h7--removecancellablecomponent-ordering-vs-parsecomponents) **FIXED**
- [H8 — `onMount` senza try/catch](#h8--onmount-senza-trycatch)
- [H9 — `compareIdOrParentIdRecursive` senza guard su self-reference](#h9--compareidorparentidrecursive-senza-guard-su-self-reference) **FIXED**
- [H10 — `popstate` vs `hashchange` ordering su scroll restore](#h10--popstate-vs-hashchange-ordering-su-scroll-restore) **FIXED**
- ~~H11 — `getOrderedChunkByCurrentRepeatValue` filtra orfani silenziosamente~~ **FALSO POSITIVO (vedi appendice)**

### Medium

- [M1 — Mutation durante `destroyNestedInvalidate/Repeat` forEach](#m1--mutation-durante-destroynestedinvalidaterepeat-foreach)
- [M2 — `currentRepeaterValueMap` non ripulito se `get` non viene mai chiamato](#m2--currentrepeatervaluemap-non-ripulito)
- [M3 — `currentParamsFromLoadUrl` non resettato su early return](#m3--currentparamsfromloadurl-non-resettato-su-early-return)
- [M4 — `destroyComponentInsideNodeById` senza null-check su `state`](#m4--destroycomponentinsidenodebyid-senza-null-check)
- [M5 — `bindPropsMap.delete(key)` durante iterazione e mappa inversa non pulita](#m5--bindpropsmapdeletekey-durante-iterazione) **FIXED**
- [M6 — `sanitizeParams` / `sanitizeHash` troppo aggressivi](#m6--sanitizeparams--sanitizehash-troppo-aggressivi)
- [M7 — `unsubScribeFunction.length = 0` in closure](#m7--unsubscribefunctionlength--0-in-closure)
- [M8 — Scroll restore dopo `parseComponents` sovrascrive scroll manuale](#m8--scroll-restore-sovrascrive-scroll-manuale)
- [M9 — `unFreezePropById` senza finally](#m9--unfreezepropbyid-senza-finally)
- [M10 — `removeAndDestroyById`: eccezione in `state.destroy()` salta `element.remove()`](#m10--removeanddestroybyid-eccezione-in-statedestroy) **FIXED**
- [M11 — `switchBindTextMap` su placeholder già rimosso](#m11--switchbindtextmap-su-placeholder-già-rimosso)
- [M12 — `removeCurrentToBindPropsByPropsId` non sincronizzato con mappa inversa](#m12--removecurrenttobindpropsbypropsid-non-sincronizzato) **UNUSED FUNCTION**
- [M13 — Queue `maxQueuqueSize` check non strict](#m13--queue-maxqueuquesize-check-non-strict)
- [M14 — `unWatchRouteChange` senza type check](#m14--unwatchroutechange-senza-type-check)
- [M15 — `getParamsFromWebComponent` con `propsId` undefined](#m15--getparamsfromwebcomponent-con-propsid-undefined)
- [M16 — Repeater annidato: ordine di distruzione](#m16--repeater-annidato-ordine-di-distruzione)
- [M17 — Loop di microtask via feedback esplicito dal child](#m17--loop-di-microtask-via-feedback-esplicito-dal-child)

### Low

- [L1 — `watchById` ritorna undefined se id vuoto](#l1--watchbyid-ritorna-undefined-se-id-vuoto)
- [L2 — `getParentIdFromWeakElementMap` ritorna stringa vuota invece di undefined](#l2--getparentidfromweakelementmap-ritorna-stringa-vuota)
- [L3 — Race queue max-size (falso positivo probabile)](#l3--race-queue-max-size)
- [L4 — Listener `document.click` senza capture phase configuration](#l4--listener-documentclick-senza-capture-phase) **MOOT (risolto con C2)**

---

## CRITICAL

### C1 — Double hashchange firing in `loadUrl` **FIXED**

**File**: `route/router.js:328-338`
**Tipo**: double-fire / race

#### Descrizione tecnica

Quando `loadUrl()` assegna `globalThis.location.hash`, il browser genera automaticamente un evento `hashchange`. Subito dopo, il codice dispatcha manualmente un secondo `HashChangeEvent('hashchange')`. Il parser riceve quindi due notifiche consecutive nello stesso event loop: il secondo parse vede già lo stato mutato dal primo.

#### Scenario riproduttivo

L'utente chiama `loadUrl({ url: 'page?id=1' })`:

1. Il browser dispatcha `hashchange` a seguito dell'assegnazione.
2. Il codice dispatcha manualmente `hashchange`.
3. Due `parseUrlHash()` in sequenza rapida con `currentParamsFromLoadUrl` che viene azzerato nel primo e letto come `undefined` nel secondo.

#### Codice problematico

```js
// route/router.js:328-331 — il browser dispara hashchange qui
globalThis.location.hash =
    currentParamsFromLoadUrl && currentParamsFromLoadUrl.length > 0
        ? `${hash}?${currentParamsFromLoadUrl}`
        : hash;

// route/router.js:338 — secondo dispatch manuale
globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
```

#### Fix suggerito

Rimuovere il dispatch manuale. Se serve per il caso edge "hash uguale al corrente" (il browser non dispara in quel caso), gestirlo con un flag interno che forza `parseUrlHash()` una volta sola.

> Nota di verifica: controllare se `dispatchEvent` manuale esiste per supportare l'edge case `loadUrl` con stesso hash. Se sì, il fix non è solo rimuovere ma distinguere i due casi.

---

### C2 — Event listener `click` su `document` mai rimosso

**File**: `route/router.js:82-94`
**Tipo**: memory-leak / idempotency

#### Descrizione tecnica

Il listener click è registrato direttamente nel modulo `router.js` al caricamento. Non esiste una corrispondente `removeEventListener()`. Se la SPA viene reinizializzata (HMR, test suite, reset utente), il listener si accumula.

#### Scenario riproduttivo

L'utente (o il tooling HMR) richiama `inizializeApp()` una seconda volta:

1. Il modulo `router.js` era già caricato, ma registra di nuovo il listener perché l'init non è idempotente.
2. Ad ogni click, `event.preventDefault()` viene eseguito N volte consecutive.
3. In test suite, i click tra un test e l'altro trattengono riferimenti a mainStore vecchi.

#### Codice problematico

```js
// route/router.js:82-94
document.addEventListener(
    'click',
    (event) => {
        const target = event.target;
        if (!target) return;

        const link = /** @type {HTMLElement} */ (event.target).closest('a');
        if (link && mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING)) {
            event.preventDefault();
        }
    },
    { passive: false }
);
```

#### Fix suggerito

Registrare il listener dentro `inizializeApp`, salvarne il riferimento e fornire una funzione di teardown. In alternativa, introdurre una guard di idempotenza con una variabile modulo:

```js
let clickListenerBound = false;
export const initRouter = () => {
    if (clickListenerBound) return;
    clickListenerBound = true;
    document.addEventListener('click', clickHandler, { passive: false });
};
```

---

### C4 — `repeaterParentElement` null dopo `await beforeUpdate()` **FIXED**

**File**: `modules/repeater/watch/index.js:79-204`
**Tipo**: race / dom-ghost-write

#### Descrizione tecnica

Il fallback `repeaterParentElement ?? document.createElement('div')` crea un nodo DOM scollegato quando il parent è stato rimosso. Gli aggiornamenti successivi (`textContent`, `appendChild`) finiscono su questo `<div>` fantasma e sono persi. `checkRepeaterExistence` verifica solo la Map, non lo stato del DOM.

#### Scenario riproduttivo

Repeater dentro una modale:

1. Il watch del repeater è in `await beforeUpdate()`.
2. L'utente chiude la modale: il componente parent viene rimosso dal DOM.
3. `getRepeatParent({ id: repeatId })` ritorna `undefined`.
4. Il fallback crea un `<div>` locale.
5. Il render scrive su un nodo non visibile; niente errore, ma dati persi.

#### Codice problematico

```js
// modules/repeater/watch/index.js:79-80
const repeaterParentElement = getRepeatParent({ id: repeatId });

// modules/repeater/watch/index.js:204 — fallback su ghost element
repeaterParentElement:
    repeaterParentElement ?? document.createElement('div'),
```

#### Fix suggerito

Early return se il parent non è connesso:

```js
if (!repeaterParentElement?.isConnected) {
    return;
}
```

Mai sostituire con un nodo fittizio: è sempre sintomo di errore logico più a monte.

---

## HIGH

### ~~H1 — TOCTOU con doppio `ref.deref()`~~ **FALSO POSITIVO**

Riclassificato come falso positivo dopo verifica. Vedi sezione "Appendice — Falsi positivi" per il ragionamento completo.

---

### H2 — `keyToIndex` usa array raw invece di deduplicato **FIXED**

**File**: `modules/repeater/watch/index.js:275-278`
**Tipo**: incoerenza interna / index-bug

#### Descrizione tecnica

La libreria deduplica internamente l'array dei dati tramite `getUnivoqueByKey` in `update/add-with-key.js:57`, preservando solo la **prima** occorrenza di ogni chiave duplicata. Il risultato (`currentUpdated`) viene usato per il rendering e l'ordinamento.

Tuttavia, la mappa `keyToIndex` (usata per calcolare `realIndex` dei componenti) viene costruita sull'array `current` **grezzo** (pre-dedup) invece che su `currentUpdated`:

```js
// watch/index.js:275-278
const keyToIndex = hasKey
    ? new Map(current.map((item, index) => [`${item?.[key]}`, index]))  // ← usa current raw
    : new Map();
```

Se l'utente passa duplicati, `new Map(...)` preserva l'indice dell'**ultimo** duplicato (sovrascrittura), creando una discrepanza: il componente renderizzato corrisponde al primo duplicato (da `getUnivoqueByKey`), ma riceve l'indice dell'ultimo.

#### Scenario riproduttivo

```js
setState('items', [
    { id: 1, label: 'primo' },
    { id: 1, label: 'secondo' },  // chiave duplicata
    { id: 2, label: 'terzo' },
]);
```

Flusso interno:
1. `getUnivoqueByKey` → `currentUpdated = [{ id:1, 'primo' }, { id:2, 'terzo' }]` (primo duplicato vince)
2. `keyToIndex` su `current` raw → `Map { '1' → 1, '2' → 2 }` (ultimo duplicato vince)
3. Il componente con chiave `1` riceve `current: { id:1, 'primo' }` ma `index: 1` invece di `0`.

Risultato: `realIndex` sbagliato → riordinamento visivo incoerente, logica utente basata su `index` fallisce.

#### Codice problematico

```js
// modules/repeater/watch/index.js:200-205
const currentUpdated = await updateRepeater({
    current,  // array raw
    // ...
});  // ritorna currentUnique (deduplicato)

// modules/repeater/watch/index.js:275-293
const keyToIndex = hasKey
    ? new Map(current.map((item, index) => [`${item?.[key]}`, index]))  // ← usa current, non currentUpdated
    : new Map();

chunkChildrenOrdered.forEach((childArray, index) => {
    const currentValue = currentUpdated?.[index];  // usa currentUpdated (corretto)
    const realIndex = hasKey
        ? (keyToIndex.get(`${currentValue?.[key]}`) ?? -1)  // indice da array sbagliato
        : index;
    // ...
});
```

#### Fix suggerito

Usare `currentUpdated` (già deduplicato) per costruire `keyToIndex`:

```js
const keyToIndex = hasKey
    ? new Map(currentUpdated.map((item, index) => [`${item?.[key]}`, index]))
    : new Map();
```

Questo garantisce coerenza interna: stessa sorgente per render e per calcolo indici.

---

### ~~H3 — Ordine cleanup: children distrutti prima del parent-state~~ **DOWNGRADED a MEDIUM**

Dopo riverifica, il nocciolo reale coincide con **M10** (eccezione in `destroy?.()` / `state.destroy()` salta `element.remove()`). Lo scenario originale ("watcher del parent che accede a `child[1]` già parzialmente distrutto") non combacia con il flusso sincrono di `forEach`: ogni child è completamente distrutto prima che il successivo venga iterato, quindi non esiste uno stato "parzialmente demolito" visibile ai watcher. Il fix proposto (`state.freezeAllWatchers?.()`) dipende inoltre da API inesistente in `mob-core` e avrebbe side-effect troppo ampi. Vedi **M10** per il fix effettivo (try/catch/finally) e l'appendice "Falsi positivi / ridimensionamenti" per il ragionamento completo.

---

### ~~H4 — `parseComponents` non cancellabile durante route transition~~ **FALSO POSITIVO**

Riclassificato come falso positivo dopo verifica. Vedi sezione "Appendice — Falsi positivi" per il ragionamento completo.

---

### H5 — Event listener di `bind-events` mai rimossi **FIXED**

**File**: `modules/bind-events/index.js:45-70`
**Tipo**: memory-leak

#### Descrizione tecnica

`applyBindEvents` crea listener anonimi inline (`element.addEventListener(eventName, async (e) => { ... })`). Non esiste una mappa `componentId → [{ event, handler }]`, quindi al destroy del componente i listener restano legati. Se l'elemento DOM viene riutilizzato (es. riassegnato ad altro componente per riciclo), il listener vecchio rimane.

#### Scenario riproduttivo

Componente con handler click che trattiene chiusura grande (async closure con riferimenti a state):

1. Componente distrutto.
2. L'elemento DOM è detached ma trattenuto dal listener che è in `document`/parent-delegation.
3. Memoria accumula nel tempo con aggiunte/rimozioni.

#### Codice problematico

```js
// modules/bind-events/index.js:45-70
element.addEventListener(eventName, async (e) => {
    if (!getFireEvent()) return;
    preventFireEvent();
    await tick();
    allowFireEvent();
    const currentRepeaterState = getRepeaterStateById({ id: componentId });
    callback(e, currentRepeaterState?.current, currentRepeaterState?.index);
});
```

#### Fix suggerito

Tracciare handler per componente:

```js
const componentListeners = new Map(); // componentId -> [{ event, handler, element }]

const boundHandler = async (e) => { /* ... */ };
element.addEventListener(eventName, boundHandler);
const list = componentListeners.get(componentId) ?? [];
list.push({ event: eventName, handler: boundHandler, element });
componentListeners.set(componentId, list);

// In removeAndDestroyById:
(componentListeners.get(id) ?? []).forEach(({ event, handler, element }) => {
    element.removeEventListener(event, handler);
});
componentListeners.delete(id);
```

#### Implementazione attuale (2026-04-25)

L'implementazione segue il pattern suggerito ma riutilizza `componentMap` invece di creare una Map dedicata:

- **`modules/bind-events/index.js:46-84`**: gli handler sono nominati (`const handler = async ...`) e raccolti via `flatMap` in `[{ eventName, handler }]`.
- **`component/action/bind-events.js:11-21`**: `setBindEventsById` salva l'array in `componentMap.set(id, { ...item, bindEventsHandlers: handlers })`.
- **`component/action/remove-and-destroy/remove-and-destroy-by-id.js:42-44`**: al destroy, `bindEventsHandlers?.forEach(({ eventName, handler }) => element.removeEventListener(eventName, handler))` rimuove i listener.
- **`remove-and-destroy-by-id.js:138`**: `instanceValue.bindEventsHandlers = []` come cleanup finale.

Differenze rispetto al fix proposto (tutte legittime):
- Niente Map separata: storage integrato in `componentMap`.
- `element` non memorizzato per-handler (tutti condividono il root element del componente).

---

### H6 — `cleanDelegateEvent` rimuove listener da root disconnesso

**File**: `modules/delegate-events/index.js:194-220`
**Tipo**: cleanup-state-desync

#### Descrizione tecnica

Quando tutti i WeakRef per un evento sono morti, `cleanDelegateEvent` chiama `rootElement.removeEventListener`. Ma se `getRoot()` ritorna un elemento non più connesso, `removeEventListener` è no-op. Nonostante questo, `activeHandlers.delete(eventKey)` viene eseguito lo stesso: la struttura dati dimentica il handler ma il DOM ne ha memoria indiretta (inefficace per il gc root).

#### Scenario riproduttivo

1. Root element rimosso durante transition (caso estremo).
2. Nuovo root creato.
3. `cleanDelegateEvent` pulisce `activeHandlers` ma non il vecchio root.
4. Prossima `setDelegateBindEvent` registra un nuovo handler sul nuovo root.
5. Se per qualche motivo si riaccede al vecchio root, è confuso.

#### Codice problematico

```js
// modules/delegate-events/index.js:194-220
if (aliveRef.length === 0) {
    const rootElement = getRoot();
    const handlerToRemove = activeHandlers.get(eventKey);

    if (handlerToRemove) {
        rootElement.removeEventListener(eventKey, handlerToRemove);
        activeHandlers.delete(eventKey);
    }
}
```

#### Fix suggerito

```js
if (rootElement?.isConnected) {
    rootElement.removeEventListener(eventKey, handlerToRemove);
}
activeHandlers.delete(eventKey);
```

---

### H7 — `cleanDelegateEvent` vs `applyDelegationBindEvent`: race async/sync **FIXED**

**Stato**: FIXED — 2026-04-24. Vedi "Appendice — Fix applicati / H7".
**File**: `parse/parse-function-while.js:441-445` (pre-fix), `modules/delegate-events/index.js:194-220, 228-303` (pre-fix)
**Tipo**: ordering-race (async vs sync)

> Nota: l'entry originale puntava a `route/load-page.js:174-182` e descriveva un ordering problem fra `removeCancellableComponent` e `parseComponents`. Dopo verifica, quella posizione **non è la causa del bug**. Il fix applicato e l'analisi aggiornata seguono.

#### Descrizione tecnica (aggiornata)

In `parse-function-while.js` il blocco finale era:

```js
applyDelegationBindEvent(element);   // riga 441 — NON awaited
applyBindEffect(element);
switchBindTextMap();
switchBindObjectMap();
cleanDelegateEvent();                 // riga 445
```

`applyDelegationBindEvent` è `async` e inizia con `await repeaterTick()` / `await invalidateTick()` (`delegate-events/index.js:232-233`). Alla chiamata di riga 441, la funzione **si sospende al primo await**. Le righe 442-445 eseguono sincronamente. Quando `cleanDelegateEvent()` parte (riga 445):

- I nuovi `WeakRef` della route/repeater appena parsati **non sono ancora stati registrati** (la registrazione avviene solo dopo le `await`, righe 245-276).
- `eventTargetRefs` contiene solo ref morti dei componenti appena distrutti.
- Per ogni `eventKey`, `aliveRefs.length === 0` → il listener viene rimosso dal root (riga 206).

Qualche microtask dopo, `applyDelegationBindEvent` riprende, registra i nuovi `WeakRef` e ri-attacca il listener (righe 287-297).

**Effetto visibile**: remove+add inutile del listener su ogni parse. Durante la finestra micro-task intermedia, un evento utente sull'elemento del nuovo parse potrebbe non firare (il listener è temporaneamente detached).

#### Imprecisioni nella descrizione originale (ora deprecata)

L'entry originale citava un "caso limite" con elementi persistent: "se esiste una zona di mezzo dove un sottoset degli elementi della route A sopravvive (es. elementi persistent), il cleanup prematuro può disattivare listener ancora necessari". **Falso** — i componenti persistent sono **fuori** da `contentElement` (vedi `componentIsPersistent` in `component/action/component.js:89-98`: `return !contentElement?.contains(element);`). `contentElement.replaceChildren()` non li tocca, restano connected, i loro `WeakRef` sopravvivono al filter. Il listener non viene mai rimosso per gli eventi con almeno un persistent attivo.

#### Fix applicato

`cleanDelegateEvent` è stato spostato **dentro** `applyDelegationBindEvent`, in fondo alla funzione (dopo la registrazione dei WeakRef e dei listener). Il modulo `delegate-events` è ora self-contained: register → clean avviene atomicamente dal punto di vista del chiamante, senza dipendere dall'ordering esterno.

Dettagli concreti:
- `cleanDelegateEvent` declassato da `export const` a `const` (helper interno).
- Chiamata rimossa da `parse-function-while.js:445`.
- Import di `cleanDelegateEvent` rimosso da `parse-function-while.js:15`.

Vedi "Appendice — Fix applicati / H7" per codice before/after.

---

### H8 — `onMount` senza try/catch

**File**: `modules/on-mount/index.js:29-50`
**Tipo**: error-handling

#### Descrizione tecnica

`fireOnMountCallBack` fa `await callback?.({ element })` senza gestione errori. Un throw dal codice utente propaga al parser interrompendo la pipeline: i componenti figli non vengono creati, lo stato resta inconsistente.

#### Scenario riproduttivo

Componente con `onMount` che chiama una API:

```js
onMount: async ({ element }) => {
    const data = await fetch('/api').then((r) => r.json());
    if (!data) throw new Error('No data');
};
```

Se la fetch fallisce, l'intera pipeline di parsing si interrompe.

#### Codice problematico

```js
// modules/on-mount/index.js:29-50
export const fireOnMountCallBack = async ({ id, element }) => {
    const callback = onMountCallbackMap.get(id);

    const destroyCallback = await callback?.({
        element,
    });

    setDestroyCallback({ cb: destroyCallback, id });
    onMountCallbackMap.delete(id);
};
```

#### Fix suggerito

```js
let destroyCallback;
try {
    destroyCallback = await callback?.({ element });
} catch (err) {
    console.error(`[MobJs] onMount error for component ${id}:`, err);
}

setDestroyCallback({ cb: destroyCallback, id });
onMountCallbackMap.delete(id);
```

---

### H9 — `compareIdOrParentIdRecursive` senza guard su self-reference **FIXED**

**File**: `component/action/parent.js:95-124`
**Tipo**: infinite-loop

#### Descrizione tecnica

La funzione ricorsiva chiama se stessa con `moduleScopeId: parentId`. Se per qualche corruzione `componentMap` contiene un componente con `parentId === id` (self-reference), la ricorsione è infinita.

#### Scenario riproduttivo

Edge-case difficile ma non impossibile in presenza di codice utente che manipola direttamente `componentMap` o durante race di creazione/destroy con ID riutilizzati.

#### Codice problematico

```js
// component/action/parent.js:120-123
return compareIdOrParentIdRecursive({
    moduleScopeId: parentId,
    targetComponentId,
});
```

#### Fix suggerito

```js
if (parentId === moduleScopeId) {
    return false;
}
return compareIdOrParentIdRecursive({ moduleScopeId: parentId, targetComponentId });
```

O più robusto: un `Set` di ID visitati passato come argomento.

---

### H10 — `popstate` vs `hashchange`: race sulla variabile `currentHistory` **FIXED**

**Stato**: FIXED — 2026-04-24. Vedi "Appendice — Fix applicati / H10".
**File**: `route/router.js` (pre-fix righe 33, 115, 201, 204, 247, 306)
**Tipo**: race async/sync su variabile modulo condivisa

#### Descrizione tecnica (aggiornata)

Pre-fix il modulo teneva una variabile `currentHistory` usata come segnale "questa navigazione deriva da popstate". Flusso:

- Il listener `popstate` scriveva `currentHistory = event?.state?.nextId` (sincrono).
- Il listener `hashchange` faceva `await awaitNextLoop()` e poi `parseUrlHash()`, che leggeva `currentHistory` per decidere tre cose: se scrivere un nuovo entry history (`replaceState`), il valore di `isBrowserNavigation` passato a `loadPage` (scroll restore), il valore di `skipTransition`.
- Il listener `loadUrl` (navigazione programmatica) resettava `currentHistory = undefined` prima di cambiare la URL.

Fra la scrittura (popstate, sincrona) e la lettura (dentro parseUrlHash, dopo l'await) esiste una finestra micro-task in cui un secondo popstate o una `loadUrl` concorrente possono sovrascrivere la variabile, facendo sì che il primo hashchange osservi un valore non suo.

#### Lo scenario originale era descritto in maniera imprecisa

L'entry originale citava il doppio Back rapido. In realtà quel caso è **benigno**: entrambi i popstate impostano `currentHistory` a valori truthy; il secondo hashchange viene bloccato dal guard `MAIN_STORE_ROUTE_IS_LOADING`; nessuna regressione osservabile.

Lo scenario **reale** è: **popstate + `loadUrl` programmatica durante la finestra `await awaitNextLoop`**:

1. T0: Back → popstate → `currentHistory = truthy`
2. T0+ε: hashchange → `await awaitNextLoop()` → sospensione
3. T1: codice utente chiama `loadUrl('#X')` (es. dentro onMount di componente persistent). `ROUTE_IS_LOADING` è ancora false (`loadPage` non è ancora partito), quindi `loadUrl` procede e setta `currentHistory = undefined`
4. T2: primo hashchange riprende → `parseUrlHash()` legge `currentHistory = undefined` → tratta come direct-nav (scroll reset, transizione non skippata) anche se il ciclo era partito da una history-nav

Effetto osservabile: Back con `loadUrl` concorrente produce scroll reset al posto del restore e transizione attiva al posto dello skip.

#### Bug latenti aggiuntivi (risolti collateralmente dal fix)

Durante la riverifica sono emersi due difetti minori dello stesso modulo, non descritti nell'entry originale:

1. **`currentHistory` mai resettata dopo uso in `parseUrlHash`**: restava truthy indefinitamente dopo una back-nav. Una successiva modifica dell'hash da codice esterno (o URL bar del browser) veniva interpretata come history-nav "stale". Il post-fix consuma e resetta il flag in hashchange → nessuno stato residuo fra cicli.
2. **Shape dello state non validato**: `currentHistory = event?.state?.nextId` era truthy solo per state scritto da questo modulo. Una versione naïve `!!event?.state` sarebbe stata regressiva per codice esterno che usa `history.pushState({custom:...})`. Il post-fix usa `!!event?.state?.nextId` per parità semantica.

#### Il fix proposto originale NON avrebbe funzionato

L'entry originale suggeriva di "leggere `history.state` direttamente dentro `parseUrlHash`". Verifica: `parseUrlHash` stesso fa `history.replaceState({ nextId: historyObejct }, ...)` su ogni direct-nav (router.js:116 pre-fix). Quindi `history.state` è sempre truthy dopo la prima navigazione. Non può distinguere "popstate-triggered" da "direct nav con state residuo". La domanda chiave non è *"qual è lo state?"* ma *"questo hashchange deriva da un popstate?"* — una domanda sulla provenienza dell'evento, non sul contenuto history.

#### Fix applicato

La variabile modulo `currentHistory` è stata sostituita da un flag booleano `pendingHistoryNavigation` con lifecycle chiaro: il listener `popstate` alza il flag, il listener `hashchange` lo consuma (legge + resetta) in modo **sincrono prima dell'await**, e il valore catturato viene passato come parametro locale `fromHistory` a `parseUrlHash`. Nessuna variabile modulo viene letta nel corpo di `parseUrlHash`.

Vedi "Appendice — Fix applicati / H10" per codice before/after e verifica di equivalenza semantica.

---

### ~~H11 — `getOrderedChunkByCurrentRepeatValue` filtra orfani silenziosamente~~ **FALSO POSITIVO**

Riclassificato come falso positivo dopo verifica. Vedi sezione "Appendice — Falsi positivi" per il ragionamento completo.

---

## MEDIUM

### M1 — Mutation durante `destroyNestedInvalidate/Repeat` forEach

**File**:
- `modules/invalidate/action/initialize/inizialize-invalidate-watch.js:125-126`
- `modules/invalidate/action/destroy/remove-nested-invalidate.js:30-39`

**Tipo**: mutation-during-iteration

#### Descrizione

Durante il `forEach` su `invalidatToDelete`, gli unsubscribe possono causare cascading destroy che mutano la lista originale.

#### Codice problematico

```js
invalidatToDelete.forEach(({ unsubscribe, moduleId }) => {
    unsubscribe.forEach((fn) => fn());
    removeInvalidateByInvalidateId({ id, invalidateId: moduleId });
});
```

#### Fix

```js
const snapshot = [...invalidatToDelete];
snapshot.forEach(...);
```

---

### M2 — `currentRepeaterValueMap` non ripulito

**File**: `modules/repeater/repeater-value/index.js:29-36`
**Tipo**: leak

#### Descrizione

Pattern set-then-expected-read: `getComponentRepeaterState` fa `.get()` + `.delete()`. Se il lettore non viene mai eseguito (componente distrutto prima), la entry resta in memoria.

#### Codice problematico

```js
export const getComponentRepeaterState = (id = '') => {
    if (!id) return DEFAULT_CURRENT_REPEATER_STATE;
    const value = currentRepeaterValueMap.get(id);
    currentRepeaterValueMap.delete(id);
    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
};
```

#### Fix

Registrare la entry con TTL o collegarla al lifecycle del componente (remove on destroy).

---

### M3 — `currentParamsFromLoadUrl` non resettato su early return

**File**: `route/router.js:118-127` (reset solo a `:177`)
**Tipo**: state-management

#### Descrizione

`parseUrlHash` resetta `currentParamsFromLoadUrl = undefined` alla fine. Ma tutti gli early return (quando `routeIsLoading`, quando hash invalido) saltano il reset. La prossima navigazione eredita lo stato sporco.

#### Codice problematico

```js
// riga 118-127
if (routeIsLoading) {
    globalThis.location.hash = previousFullHashLoaded.replace('#', '');
    return;  // no reset
}
// ...
// riga 177 (solo se arriva qui)
currentParamsFromLoadUrl = undefined;
```

#### Fix

Spostare il reset all'inizio della funzione, dopo aver salvato il valore in una locale:

```js
const params = currentParamsFromLoadUrl;
currentParamsFromLoadUrl = undefined;
```

---

### M4 — `destroyComponentInsideNodeById` senza null-check

**File**: `component/action/remove-and-destroy/destroy-component-inside-node-by-id.js:19-34`
**Tipo**: null-access

#### Descrizione

`componentMap.get(id)` può ritornare `undefined` se un altro destroy parallelo lo ha rimosso. Il codice usa `state?.element` ma poi accede a `state?.id` senza uscire esplicitamente.

#### Fix

```js
allChild.forEach((id) => {
    const state = componentMap.get(id);
    if (!state) return;
    // ... resto del codice
});
```

---

### M5 — `bindPropsMap.delete(key)` durante iterazione **FIXED**

**File**: `modules/bind-props/index.js:391-396`
**Tipo**: iteration-safety / desync

#### Descrizione

`for..of` su `Map` + `delete()` in JS è tecnicamente sicuro, ma:

1. Se in futuro si usa un wrapper, si rompe.
2. La mappa inversa `bindComponentTobindId` non è pulita.

#### Codice problematico

```js
for (const [key, value] of bindPropsMap) {
    const { componentId: currentComponentId } = value;
    if (currentComponentId === componentId) {
        bindPropsMap.delete(key);
    }
}
```

#### Fix

```js
const keysToDelete = [];
for (const [key, value] of bindPropsMap) {
    if (value.componentId === componentId) keysToDelete.push(key);
}
keysToDelete.forEach((k) => {
    bindPropsMap.delete(k);
    // sync inverse map
});
bindComponentTobindId.delete(componentId);
```

---

### M6 — `sanitizeParams` / `sanitizeHash` troppo aggressivi

**File**: `route/router.js:38-63`
**Tipo**: edge-case parsing

#### Descrizione

`.replace('?', '')` rimuove solo la PRIMA occorrenza (non tutte, come la prima segnalazione riporta erroneamente). Resta però l'issue che il primo `?` viene sempre rimosso: se l'utente vuole un param con valore `?foo`, fallisce.

Stessa cosa per `.replace('/', '')` e `.replace('.', '')` in `sanitizeHash`.

#### Scenario

```
#page?redirect=/api/endpoint
```

Diventa `page?redirect=api/endpoint` (il primo `/` rimosso).

#### Fix

Regex ancorate al prefisso:

```js
const sanitizeParams = (value) => value.replace(/^\?+/, '').replace(/^\/+/, '');
const sanitizeHash = (value) =>
    value.replace(/^#+/, '').replace(/^\/+/, '').replace(/^\.+/, '');
```

---

### M7 — `unsubScribeFunction.length = 0` in closure

**File**: `bind-text/index.js:246`, `bind-object/index.js:203`, `bind-effetc/index.js:290`
**Tipo**: subtle-mutability

#### Descrizione

Svuotare un array con `length = 0` funziona, ma se la closure è condivisa con altri punti del codice che hanno un riferimento locale, quei puntatori vedono l'array troncato mentre altri codice può iterare il pre-truncation (durante la callback).

#### Fix

Usare `splice(0)` per coerenza o riassegnare `unsubScribeFunction = []`.

---

### M8 — Scroll restore sovrascrive scroll manuale

**File**: `route/load-page.js:196-206`
**Tipo**: scroll-race

#### Descrizione

`parseComponents` è asincrono. Durante il parsing (lazy components, animazioni), l'utente può scrollare manualmente. Al termine, `scrollTo(0, scrollY)` sovrascrive la posizione manuale.

#### Fix

Salvare lo scroll corrente prima del restore e confrontare:

```js
await parseComponents({ element: contentElement });
if (getRestoreScroll() && isBrowserNavigation && window.scrollY === 0) {
    scrollTo(0, scrollY);
}
```

O, meglio, ripristinare prima del parse quando possibile.

---

### M9 — `unFreezePropById` senza finally

**File**: `modules/repeater/watch/index.js:313-347`
**Tipo**: cleanup

#### Descrizione

`unFreezePropById` è dentro `MobCore.useNextLoop`. Se il componente è distrutto prima che il nextLoop esegua, lo state resta frozen e i watcher futuri sono zittiti.

#### Fix

```js
MobCore.useNextLoop(async () => {
    try {
        // ...
    } finally {
        unFreezePropById({ id, prop: state });
    }
});
```

---

### M10 — `removeAndDestroyById`: ordine cleanup e exception-safety *(assorbe H3)*

**Stato**: FIXED — 2026-04-24. Vedi "Appendice — Fix applicati / M10".
**File**: `component/action/remove-and-destroy/remove-and-destroy-by-id.js:17-130`
**Tipo**: cleanup-order / exception-safety

#### Descrizione tecnica

L'ordine attuale delle operazioni in `removeAndDestroyById` presenta tre problemi tra loro correlati:

**Problema 1 — `parentPropsWatcher` unsubscribed tardi (riga 63)**

`parentPropsWatcher` è un array di unwatch function che rappresentano **subscription verso il nostro state dal parent**: sono watcher registrati sullo state del parent il cui callback scrive nel nostro state via `setStateById(ourId, ...)` (meccanismo di `bindProps` / `setDynamicPropsWatch`, vedi `component/action/props.js:8-19`).

Nell'ordine attuale:

```js
// riga 58
state.destroy();

// riga 63
if (parentPropsWatcher) parentPropsWatcher.forEach((unwatch) => unwatch());
```

Tra riga 58 e riga 63 esiste una **finestra** in cui il parent state può subire un cambio (side-effect di altri destroy, watcher async, ecc.); il callback di `parentPropsWatcher` viene invocato e prova a scrivere su uno state appena distrutto. A seconda di come `mob-core` gestisce la scrittura su state morto si ottiene un throw o un no-op silenzioso.

**Problema 2 — `parentPropsWatcher` attivo durante la distruzione dei children**

Anche più subtle: durante `forEach` (righe 39-43) il `destroy?.()` di un child può scrivere sul parent state. Quel cambio propaga via `parentPropsWatcher` al nostro state ancora vivo: i nostri watcher scattano su un componente in fase di smontaggio (children in parte già morti, DOM ancora attaccato).

**Problema 3 — Eccezione in `destroy?.()` o `state.destroy()` salta l'intero cleanup a valle**

Le righe 57-58 invocano `destroy?.()` (callback utente) e `state.destroy()` senza protezione. Qualunque eccezione propaga fuori dalla funzione, saltando tutto ciò che segue:

- `parentPropsWatcher` non viene unwatchato (leak di subscription — aggravato dal Problema 1)
- `removeInvalidateId` / `removeRepeaterId` / `removeRepeaterComponentChildren` / `removeIdFromInstanceMap` / `removeNonPersisitentComponent` / `removeCurrentIdToBindProps` non invocati (desync di 6 mappe globali)
- `element.removeCustomComponent()` e `element.remove()` non eseguiti → **DOM orfano**
- `componentMap.delete(id)` saltato → `instanceValue` resta in memoria con references detached
- I children, invece, sono già stati distrutti alle righe 39-43: lo stato finale è un parent mappato ma con gerarchia children già rimossa

Il commento attuale al codice esplicita un design intenzionale (*"If destroy fire an exception app crash, at now is right, app must crash if callback is used wrong"*), ma il prezzo è la corruzione silenziosa di 6 mappe globali e del DOM: un crash "pulito" lascerebbe l'app in uno stato recuperabile, non uno stato ibrido.

#### Scenario riproduttivo (Problema 3)

Componente con callback `destroy` utente che lancia (es. pulizia manuale di risorse esterne fallita):

```js
MobJs.createComponent({
    name: 'my-comp',
    render: ({ onDestroy }) => {
        onDestroy(() => {
            throw new Error('cleanup fallito');
        });
    },
});
```

Alla distruzione: children rimossi, poi `destroy?.()` lancia → elemento DOM resta appeso, `componentMap` non ripulito, successivi parse trovano un ID già registrato ma senza elemento reale.

#### Analisi delle risorse coinvolte

Il componente tocca 13 "punti di ancoraggio" nell'applicazione:

| # | Risorsa | Chi la libera |
|---|---------|---------------|
| 1 | `componentMap` | `componentMap.delete(id)` |
| 2 | Entry nel `child` del parent | `removeItselfFromParent` |
| 3 | `parentPropsWatcher` (subscription in ingresso) | `parentPropsWatcher.forEach(unwatch)` |
| 4 | Watcher esterni sul nostro state (es. da siblings) | `state.destroy()` |
| 5 | Watcher interni dell'utente (`.watch(...)`) | `state.destroy()` |
| 6 | `invalidateIdsMap` / `invalidateInstancesMap` | `removeInvalidateId` |
| 7 | `repeatIdsMap` / `repeatInstancesMap` | `removeRepeaterId` |
| 8 | `repeatComponentChildrenMap` | `removeRepeaterComponentChildren` |
| 9 | `instanceMap` (se `instanceName`) | `removeIdFromInstanceMap` |
| 10 | `nonPersisitentComponentSet` | `removeNonPersisitentComponent` |
| 11 | `bindPropsMap` (altri ci targettano) | `removeCurrentIdToBindProps` |
| 12 | DOM node | `element.removeCustomComponent()` + `element.remove()` |
| 13 | `refs`, `methods`, `state`, `element` interni | null-out |

#### Invarianti da garantire

- **I1** — I children vanno distrutti **prima** del nostro state: i loro `parentPropsWatcher` puntano al nostro state e vengono unsubscribed durante il loro recursive destroy, che lo legge.
- **I2** — Il nostro `destroy?.()` callback deve avere `state`, `element`, `refs`, `methods` **vivi** (vedi docstring attuale: *"Refs should be used in this callback"*).
- **I3** — Dopo `state.destroy()`, **nessuno** deve più scrivere sul nostro state → i watcher in ingresso (`parentPropsWatcher`) devono essere disattivati prima.
- **I4** — `element.remove()` e `componentMap.delete(id)` devono avvenire **sempre**, anche se `destroy?.()` o `state.destroy()` lanciano eccezioni.
  > Nota post-fix: `state.destroy()` è dimostrabilmente non-throwing (vedi "Strategia di exception-safety"), quindi in pratica l'unica fonte di eccezione che richiede protezione per soddisfare I4 è `destroy?.()` utente (e per propagazione la ricorsione sui children).
- **I5** — Il null-out delle reference deve precedere `componentMap.delete` per aiutare il GC.

#### Ordine corretto proposto

```
FASE 0 — Guards
  1. if (!id) return
  2. const instanceValue = componentMap.get(id); if (!instanceValue) return
  3. destructure

FASE 1 — Freeze incoming (stop ricezione side-effect da altri componenti)
  4. parentPropsWatcher?.forEach((unwatch) => unwatch())
     → Motivazione (I3, problemi 1 e 2): nessuno deve più scriverci sopra da qui in poi.
     → No try/catch: `unwatch` è non-throwing by construction (vedi "Strategia di exception-safety").

FASE 2 — Destroy bottom-up
  5. Object.values(child ?? {}).flat().forEach((childId) => {
         try { removeAndDestroyById({ id: childId }); }
         catch (err) { console.warn(err); }
     })
     → Motivazione (I1, I4): i children leggono il nostro state; un child che lancia non deve bloccare gli altri.
     → Il try/catch qui isola la propagazione di un'eccezione dalla Fase 4 del figlio (unica fonte reale di throw nella ricorsione).

FASE 3 — Remove itself from parent (mantenuto come nell'ordine originale)
  6. removeItselfFromParent({ id, parentId, componentName })
     → Scelta: mantenere la posizione attuale (subito dopo i children, prima del destroy?.()).

FASE 4 — User callback (può ancora accedere a state + element + refs + methods)
  7. try { destroy?.() } catch (err) { console.error(`[MobJs] destroy callback error for ${componentName}:${id}:`, err); }
     → Motivazione (I2): docstring garantisce accesso a refs/element. Cambio di contratto: non crasha più l'app, logga.
     → Unica fonte reale di eccezione nel flusso: codice utente arbitrario.

FASE 5 — Destroy own state (nessuno deve più dipenderne)
  8. state.destroy()
     → Dopo questo, tutti i watcher del nostro state (inclusi watchById esterni) sono disattivati.
     → No try/catch: `destroyStoreEntryPoint` è non-throwing by construction (vedi "Strategia di exception-safety").

FASE 6 — Cleanup mappe globali (indipendenti tra loro)
  9.  removeInvalidateId({ id })
 10.  removeRepeaterId({ id })
 11.  if (componentRepeatId && componentRepeatId.length > 0) removeRepeaterComponentChildren(...)
 12.  if (instanceName && instanceName.length > 0)           removeIdFromInstanceMap(...)
 13.  if (!persistent)                                        removeNonPersisitentComponent(id)
 14.  removeCurrentIdToBindProps({ componentId: id })

FASE 7 — DOM removal
 15. element?.removeCustomComponent?.()
 16. element?.remove()

FASE 8 — Detach e GC hint
 17-22. null-out di methods, refs, repeaterInnerWrap, element, currentRepeaterState, state
 23.    componentMap.delete(id)
```

#### Strategia di exception-safety (variante V2 — isolamento puntuale)

Si è scartata la variante a `try/finally` unico esterno perché se la Fase 2 (children) lanciasse in cascata, le Fasi 4-5 (destroy/state.destroy) verrebbero saltate lasciando watcher attivi. Si è scartata anche una variante `try/finally` annidata perché mescola concern diversi (user code vs framework code).

**La variante scelta isola il codice utente (l'unica fonte reale di eccezione) con try/catch puntuali.** Analizzando il codice di `mob-core/store`, le operazioni framework sono non-throwing by construction:

- **Fase 1 — `unwatch()`**: le closure ritornate da `watchMobStore` / `watchEntryPoint` (store-watch.js:113, 163) eseguono solo `Map.get` / `Map.set` / `Map.delete` / `Array.filter`, tutte con early-return su null. Non throwano.
- **Fase 5 — `state.destroy()`**: delega a `destroyStoreEntryPoint` (destroy.js:9) che usa solo `.clear()` su Map/Set, riassegnazioni e chiamate a unwatch già analizzati. Non throwa.

**L'unica fonte reale di eccezione è `destroy?.()` utente (Fase 4)**, che contiene codice arbitrario. I try/catch applicati sono quindi due:

1. **Fase 2 — children recursion**: try/catch per-child. Non perché la ricorsione sia rischiosa in sé, ma perché al suo interno c'è la Fase 4 del figlio. Serve a evitare che un figlio con `destroy` bacato blocchi la distruzione dei fratelli (isolamento di propagazione).
2. **Fase 4 — `destroy?.()` utente**: try/catch diretto. Logga con `console.error` contestualizzato (id + componentName) e prosegue il cleanup.

Fase 1 e Fase 5 non sono protette perché sarebbe cinture-e-bretelle su codice dimostrabilmente safe. Se un domani `mob-core` introducesse un path throwing in queste API, sarebbe un bug interno e deve essere visibile (stessa regola delle Fasi 6-8).

#### Cambio di contratto deliberato

Il commento attuale del codice (*"If destroy fire an exception app crash, at now is right, app must crash if callback is used wrong"*) viene **deprecato**. Nuova semantica:

- Un'eccezione in `destroy?.()` produce un `console.error` con id, `componentName` e stack trace.
- L'app **non crasha più** su user callback buggy.
- Il cleanup delle mappe globali, del DOM e del `componentMap` avviene comunque.

Razionale: una libreria deve garantire un teardown predicibile anche davanti a codice utente scorretto; un `console.error` ben formattato è più utile di un crash che lascia 6 mappe globali desincronizzate e un DOM orfano.

#### Fix sintetico (pseudo-codice)

```js
export const removeAndDestroyById = ({ id = '' }) => {
    if (!id) return;
    const instanceValue = componentMap.get(id);
    if (!instanceValue) return;

    const {
        parentId, componentName, child, element, state, destroy,
        parentPropsWatcher, componentRepeatId, instanceName, persistent,
    } = instanceValue;

    // FASE 1 — freeze incoming (unwatch non-throwing by construction)
    parentPropsWatcher?.forEach((unwatch) => unwatch());

    // FASE 2 — children bottom-up (isola propagazione da destroy?.() dei figli)
    Object.values(child ?? {}).flat().forEach((childId) => {
        try { removeAndDestroyById({ id: childId }); } catch (err) {
            console.warn(err);
        }
    });

    // FASE 3
    removeItselfFromParent({ id, parentId, componentName });

    // FASE 4 — user callback (unica fonte reale di eccezione)
    try { destroy?.(); } catch (err) {
        console.error(`[MobJs] destroy callback error for ${componentName}:${id}:`, err);
    }

    // FASE 5 — own state (destroyStoreEntryPoint non-throwing by construction)
    state.destroy();

    // FASE 6 — global maps (indipendenti)
    removeInvalidateId({ id });
    removeRepeaterId({ id });
    if (componentRepeatId && componentRepeatId.length > 0) {
        removeRepeaterComponentChildren({ componentId: id, repeatId: componentRepeatId });
    }
    if (instanceName && instanceName.length > 0) {
        removeIdFromInstanceMap({ instanceName, id });
    }
    if (!persistent) removeNonPersisitentComponent(id);
    removeCurrentIdToBindProps({ componentId: id });

    // FASE 7 — DOM
    // @ts-ignore
    element?.removeCustomComponent?.();
    element?.remove();

    // FASE 8 — detach + componentMap
    // @ts-ignore
    instanceValue.methods = null;
    // @ts-ignore
    instanceValue.refs = null;
    // @ts-ignore
    instanceValue.repeaterInnerWrap = null;
    // @ts-ignore
    instanceValue.element = null;
    // @ts-ignore
    instanceValue.currentRepeaterState = null;
    // @ts-ignore
    instanceValue.state = null;
    componentMap.delete(id);
};
```

#### Note architetturali non adottate

Si è **scartata** l'ipotesi originale di H3 di introdurre un `state.freezeAllWatchers?.()` prima dei children, perché:

1. L'API `freezeAllWatchers` non esiste in `mob-core` e dovrebbe essere progettata ex-novo.
2. Un freeze globale dello state impatterebbe anche watcher registrati da altri componenti esterni su questo state.
3. Lo scenario originale ("watcher del parent che accede a child parzialmente distrutto") non si verifica nel `forEach` sincrono: ogni child è completamente distrutto prima del successivo. Vedi appendice "Falsi positivi" per la verifica completa.

Il problema reale di isolamento dai side-effect esterni è risolto dalla Fase 1 (unsubscribe di `parentPropsWatcher` all'inizio), che è un'operazione **localmente proprietaria** (il componente possiede i propri `parentPropsWatcher`) e non ha gli stessi side-effect di un freeze globale.

---

---

### M11 — `switchBindTextMap` su placeholder già rimosso

**File**: `modules/bind-text/index.js:140-154`
**Tipo**: null-access

#### Descrizione

Il check `if (!parentElement)` c'è, ma non copre il caso in cui `placeholder` è già stato rimosso dal DOM parent prima che `switchBindTextMap` venga chiamato (placeholder può essere garbage-collected).

#### Fix

Anticipare il check:

```js
if (!placeholder?.isConnected) {
    bindTextToInitializeMap.delete(bindTextId);
    return;
}
```

---

### M12 — `removeCurrentToBindPropsByPropsId` non sincronizzato **UNUSED FUNCTION**

**File**: `modules/bind-props/index.js:208-212`
**Tipo**: map-desync / leak

#### Descrizione

Rimuove da `bindPropsMap` ma non da `bindComponentTobindId`. Le due mappe si disallineano nel tempo.

#### Codice problematico

```js
export const removeCurrentToBindPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    bindPropsMap.delete(propsId);
};
```

#### Fix

```js
export const removeCurrentToBindPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    bindPropsMap.delete(propsId);
    for (const [componentId, id] of bindComponentTobindId) {
        if (id === propsId) bindComponentTobindId.delete(componentId);
    }
};
```

---

### M13 — Queue `maxQueuqueSize` check non strict

**File**: `queque/tick.js:25-31`, `queque/tick-repeater.js:30-36`, `queque/tick-invalidate.js:30-36`
**Tipo**: bulk-clear

#### Descrizione

Al raggiungimento del limite, `queque.clear()` scarta tutto. Tra le operazioni scartate possono esserci task validi e importanti. È un emergency exit, non un bug di correttezza, ma il log può mascherare un bug reale (loop infinito a monte).

#### Fix

Loggare con stack trace e considerare un throw in dev mode.

---

### M14 — `unWatchRouteChange` senza type check

**File**: `route/load-page.js:112-117, 240`
**Tipo**: defensive-code

#### Descrizione

Assume che `mainStore.watch` ritorni una funzione. Se in futuro il contratto cambia, fallisce silenziosamente.

#### Fix

```js
if (typeof unWatchRouteChange === 'function') {
    unWatchRouteChange();
}
```

---

### M15 — `getParamsFromWebComponent` con `propsId` undefined

**File**: `parse/steps/get-params-from-web-component.js:34`
**Tipo**: null-access

#### Descrizione

`propsId?.split(' ').join('')` → se `propsId` è undefined, `cleanProsId` è undefined. `getPropsFromParent(undefined)` dipende da come gestisce l'input.

#### Fix

```js
const cleanProsId = propsId?.split(' ').join('') ?? '';
```

---

### M16 — Repeater annidato: ordine di distruzione

**File**: `component/action/remove-and-destroy/remove-and-destroy-by-id.js:39-43`
**Tipo**: cleanup-order

Correlato a H3. In repeater annidati profondamente, il cleanup dal basso verso l'alto mantiene i watcher del parent attivi durante la distruzione dei children, con potenziale scrittura su state zombie.

---

### M17 — Loop di microtask via feedback esplicito dal child

**File**: `modules/bind-props/index.js:326-370` + qualunque chiamante di `setStateById`/`setStateByName` dentro un watcher del child
**Tipo**: feedback-loop / tick-queue-exhaustion

#### Descrizione tecnica

Il loop è possibile solo se il child **scrive esplicitamente** nello state del parent con le API imperative (`setStateById`, `setStateByName`). Esempio minimo:

```js
// Parent P con state { counter: 0 }
// Render di P:
htmlObject({
    tag: 'child-c',
    modules: bindProps({
        observe: ['counter'],
        props: ({ counter }) => ({ value: counter }),
    }),
});

// Dentro child-c:
watchById(parentId, 'value', (value) => {
    setStateById(parentId, 'counter', value + 1);  // feedback al parent
});
```

Sequenza:

1. Parent cambia `counter` → watcher bindProps triggera.
2. `updateBindProp` scrive `value` nel child.
3. Watcher del child scrive `counter + 1` nel parent.
4. Goto 1.

#### Comportamento osservabile

Il loop non causa stack overflow (ogni iterazione è schedulata su microtask successivo) ma accumula entry nella `queque` fino a `maxQueuqueSize = 100_000` (`queque/tick.js:25-31`). Raggiunto il limite, viene eseguito un emergency clear con `console.warn`. Effetto utente: UI congelata per decine/centinaia di ms, warning in console, **tutti i tick validi accumulati vengono persi insieme al loop**, lasciando lo stato potenzialmente inconsistente.

#### Fix suggerito

Tre livelli crescenti di difesa:

**1. Dev-mode warning su feedback loop sospetto**

Durante l'esecuzione di `updateBindProp`, impostare un flag write-lock per la coppia `(parentId, componentId)`. Se un `setStateById` modifica il parent durante la finestra di lock, emettere un warn con stack trace:

```js
// pseudo-codice in modules/bind-props/index.js
const writeLocks = new Map(); // parentId -> Set<componentId>

const updateBindProp = ({ componentId, currentParentId, ... }) => {
    // ...
    const lockKey = `${currentParentId}->${componentId}`;
    writeLocks.set(lockKey, true);
    try {
        // ... logica di update
    } finally {
        writeLocks.delete(lockKey);
    }
};

// in setStateById (dev mode only):
if (writeLocks.has(`${id}->${callerId}`)) {
    console.warn('Possible feedback loop: child writing to parent during bindProps update');
}
```

**2. Skip noop update nel watcher**

Confrontare il valore nuovo con quello corrente prima di triggerare il watcher. Se `mob-core` ha già `skipEqual` sul watch, forzarlo `true` di default nei watcher creati da `bindProps` (`modules/bind-props/index.js:329`):

```js
return watchById(parentId, state, async () => { ... }, { skipEqual: true });
```

Nota di verifica: controllare il contratto di `watchById` e la semantica di `skipEqual` nel core; se il confronto è per reference equality, oggetti ricostruiti ad ogni update lo renderebbero inefficace.

**3. Documentare il canale bottom-up**

A livello architetturale, chiarire nella documentazione che:

- `bindProps` è un canale unidirezionale parent → child.
- La comunicazione bottom-up dovrebbe passare da event emission o callback esplicite, non da `setStateById(parentId, ...)` diretto.
- Se il ciclo è semanticamente desiderato, il child deve usare un guard su valore o una soglia di "stabilità".

#### Scope di rischio

Probabilità **bassa** in uso canonico (`bindProps` + event callback), **media** se il team usa liberamente `setStateById`/`setStateByName` come shortcut di comunicazione. Nessun impatto in produzione finché il limite di `maxQueuqueSize` tiene; oltre il limite, lo stato è perduto ma l'app non crasha.

---

## LOW

### L1 — `watchById` ritorna undefined se id vuoto

**File**: `component/action/watch.js:12-23`
**Tipo**: api-contract

#### Descrizione

Ritorna `state?.watch(...)` che può essere `undefined`. I caller che iterano sugli unsubscribe possono fallire.

#### Fix

Fallback a no-op:

```js
return state?.watch(prop, cb, { wait: wait ?? false }) ?? (() => {});
```

---

### L2 — `getParentIdFromWeakElementMap` ritorna stringa vuota

**File**: `component/action/parent.js:82`
**Tipo**: api-contract

#### Descrizione

`return id ?? ''` rende ambiguo il "non trovato" (stringa vuota vs id mancante).

#### Fix

```js
return id ?? undefined;
```

E aggiornare tutti i caller.

---

### L3 — Race queue max-size

**File**: `queque/tick.js:25-31`
**Tipo**: falso positivo probabile

JavaScript è single-threaded; non esiste vera race sul check-and-set di una Map. Il concern dell'agente era basato su un'idea errata di concorrenza. Da classificare come false positive.

---

### L4 — Listener `document.click` senza capture phase

**File**: `route/router.js:82-94`
**Tipo**: edge-case

Il listener è in bubbling phase. Se un altro handler più interno chiama `stopPropagation`, il preventDefault del router non scatta. Non è un bug certo, ma l'API di MobJs assume di poter sempre intercettare click su link.

#### Fix

Valutare il passaggio a capture phase:

```js
document.addEventListener('click', handler, { passive: false, capture: true });
```

---

## Pattern ricorrenti

### ~~Pattern 1 — `WeakRef.deref()` multiple~~ **NON APPLICABILE**

Il pattern `ref.deref() && ref.deref()?.isConnected` appare in almeno 3 moduli (H1). L'analisi originale lo classificava come bug ricorrente. Dopo verifica (vedi appendice H1) è un **falso positivo**: la spec ECMAScript `KeepDuringJob` garantisce che multiple chiamate sincrone a `deref()` ritornino lo stesso valore all'interno di un Job.

### Pattern 2 — Cleanup ordering

I bug C4, M1, M10 (che assorbe H3), M16 sono tutti istanze dello stesso problema: la distruzione dei componenti nidificati ha race multiple con il route change. **Proposta**: un singolo refactor del teardown sequence, con un'idea chiara di:

> Nota: H7 era originariamente incluso in questo pattern, ma il fix applicato (2026-04-24) lo sposta fuori dal dominio teardown — vedi appendice.

1. Prima: disattivare i watcher (freeze).
2. Poi: rimuovere i listener.
3. Poi: distruggere lo state (bottom-up o top-down secondo regola).
4. Infine: rimuovere il DOM.

### Pattern 3 — Idempotenza di `inizializeApp`

Listener registrati a module-load (C2), stato globale non resettabile: bloccano HMR e test robusti. **Proposta**: tutto l'init deve essere dentro `inizializeApp`, con una guard di idempotenza esplicita o un teardown completo.

### Pattern 4 — Mancanza di token di cancellazione

M3, M8 sono istanze dello stesso pattern: codice async interrotto da navigazione. **Proposta**: un singleton `navigationToken` incrementato ad ogni `loadUrl`; ogni operazione async lungo il percorso controlla il proprio token dopo ogni await.

> Nota: H4 era originariamente incluso in questo pattern, ma è stato riclassificato come FALSO POSITIVO (il guard `MAIN_STORE_ROUTE_IS_LOADING` impedisce già la concorrenza — vedi appendice).
> Nota: H7 era originariamente incluso in questo pattern, ma il fix applicato (2026-04-24) l'ha spostato nel dominio interno di `delegate-events` (race async/sync) — vedi appendice.
> Nota: H10 era originariamente incluso in questo pattern; il fix applicato (2026-04-24) usa un consumo atomico del flag in hashchange invece di un navigationToken generico, sufficiente per il caso specifico senza introdurre il token pattern globalmente — vedi appendice.

---

## Priorità d'intervento suggerita

### Fase 1 — Fix critici (1-2 giorni di lavoro)

1. ~~**C2**: guard idempotenza su listener `document.click`.~~ **FIXED** (vedi appendice)
2. ~~**C1**: rimuovere doppio `hashchange` dispatch.~~ **FIXED**
3. ~~**C4**: early return se `repeaterParentElement` non connesso (eliminare il ghost div).~~ **FIXED**
4. **H8**: try/catch attorno a `onMount`.

### Fase 2 — Fix alta severità (3-5 giorni)

5. ~~**H1**: refactor con helper `withAliveRef`.~~ **FALSO POSITIVO**
6. ~~**H3**~~ assorbito in **M10**: **FIXED** (2026-04-24). Riordino delle fasi e try/catch mirati in `removeAndDestroyById` — vedi "Appendice — Fix applicati / M10".
7. ~~**H9**: guard self-reference in `compareIdOrParentIdRecursive`.~~ **FIXED**
8. ~~**H5**: tracking dei listener di `bind-events`.~~ **FIXED** (2026-04-25). Handler tracciati in `componentMap.bindEventsHandlers` e rimossi in `removeAndDestroyById`.

### Fase 3 — Refactor dei pattern (1-2 settimane)

9. **Pattern 2**: refactor completo del teardown sequence.
10. **Pattern 4**: introdurre token di cancellazione per navigazione.
11. ~~**Pattern 3**: rifondere l'init per renderlo idempotente.~~ **Parzialmente risolto con C2**
12. ~~**H11 + H2**~~: migliorare il diff del repeater con warning su key duplicate e gestione esplicita degli orfani. **H2 FIXED, H11 FALSO POSITIVO**

### Fase 4 — Hardening (quando c'è tempo)

13. Tutti i bug MEDIUM e LOW.
14. Test di regressione per i 4 pattern trasversali.

---

## Checklist di verifica prima di correggere

Per evitare di inseguire falsi positivi, prima di applicare ogni fix:

- [ ] Riprodurre il bug con uno scenario minimo.
- [ ] Controllare la git history del file (`git log -p <file>`) per capire se è intenzionale.
- [ ] Cercare nel codebase casi d'uso reali (`grep -r`).
- [ ] Verificare se esistono test che coprono il caso (`find . -name "*.test.js" | xargs grep`).
- [ ] Dopo il fix, aggiungere un test di regressione.

---

## Disclaimer

Questa analisi è stata condotta via static review a tre livelli di profondità. Alcuni bug marcati come HIGH o CRITICAL potrebbero essere **falsi positivi** nei casi in cui:

- La logica del core (`mob-core`) mitiga il problema a un livello che il review non ha ispezionato.
- L'event loop di JavaScript garantisce atomicità dove la review ha ipotizzato race.
- Il contesto d'uso reale non attiva lo scenario descritto.

Ogni bug va verificato con un test minimo prima di intervenire in produzione.

I bug più meritevoli di verifica immediata sono **C1, C2, C4, H3, H8** perché le conseguenze (double-fire, memory leak cumulativi, DOM write su ghost, inconsistenza del cleanup, crash su onMount) sono osservabili in produzione con scenari comuni.

---

## Appendice — Fix applicati

### C2 — Event listener `click` su `document` mai rimosso

**Data fix**: 2026-04-24
**Commit**: (da completare)
**File modificati**:
- `src/js/mob/mob-js/route/router.js` (listener globale rimosso)
- `src/js/mob/mob-js/parse/steps/from-object.js` (logica spostata qui)

#### Approccio

Rimosso completamente il listener globale su `document.addEventListener('click', ...)` da `router.js`. La logica di prevenzione click durante il caricamento rotte è stata spostata direttamente sugli elementi `<a>` individuali al momento della loro creazione.

#### Implementazione

1. **Helper centralizzato** in `from-object.js` (linee 14-24):
   ```js
   const guardAnchorWhileRouteLoading = (anchor) => {
       anchor.addEventListener('click', (event) => {
           if (mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING))
               event.preventDefault();
       });
   };
   ```

2. **In `htmlObject()`** (linee 64-70): quando `tag === 'a'`, il guard viene attaccato all'elemento prima del suo inserimento nel DOM.

3. **In `htmlString()`** (linee 213-218): dopo il parsing del template HTML, un `querySelectorAll('a')` trova tutti i link annidati e applica il guard a ciascuno.

#### Benefici

- ✅ **Nessun listener globale**: zero overhead di event delegation, nessuna iterazione su `closest('a')`.
- ✅ **Garbage collection automatica**: i listener vengono rimossi insieme all'elemento DOM quando questo è distrutto.
- ✅ **Idempotenza garantita**: nessuna accumulazione su re-init (HMR, test suite).
- ✅ **Risolve anche L4**: i listener diretti sull'elemento non soffrono di problemi legati al bubbling o a `stopPropagation()` di handler più interni.

#### Coverage

La soluzione copre:
- ✅ Tutti i link creati tramite `htmlObject({ tag: 'a', ... })`
- ✅ Tutti i link parsati da HTML stringificato via `htmlString()`
- ❌ **Residuo non coperto**: link inseriti tramite `insertAdjacentHTML()` in `addContentChild` (riga 170). Questo riguarda i 2 casi di `content: '<span>...</span>'` nel codebase — impatto trascurabile, in via di migrazione a oggetti.

#### Note architetturali

Il fix introduce un coupling tra il layer `parse` e il layer `route` (import di `MAIN_STORE_ROUTE_IS_LOADING` in `from-object.js`). Questo è accettabile pragmaticamente, ma per purezza massima si potrebbe in futuro iniettare il guard come configurazione esterna:

```js
// ipotetico refactor futuro
export const htmlObject = (data, { linkGuard } = {}) => {
    if (tag === 'a' && linkGuard) linkGuard(rootElement);
};
```

---

### M10 — `removeAndDestroyById`: ordine cleanup e exception-safety *(assorbe H3)*

**Data fix**: 2026-04-24
**Commit**: (da completare)
**File modificati**:
- `src/js/mob/mob-js/component/action/remove-and-destroy/remove-and-destroy-by-id.js`

#### Approccio

Riordino delle fasi di teardown secondo gli invarianti I1-I5 (vedi sezione M10 principale) e introduzione di try/catch **mirati** solo sui punti dimostrabilmente a rischio di eccezione: la ricorsione children (Fase 2) e la user callback `destroy?.()` (Fase 4). Fase 1 (`unwatch` di `parentPropsWatcher`) e Fase 5 (`state.destroy()`) sono lasciate senza protezione perché, analizzando `mob-core/store`, si è verificato che entrambe sono **non-throwing by construction**.

#### Implementazione

```js
// FASE 1 — freeze incoming (unwatch non-throwing by construction)
if (parentPropsWatcher) parentPropsWatcher.forEach((unwatch) => unwatch());

// FASE 2 — children bottom-up (isola propagazione da destroy?.() dei figli)
Object.values(child ?? {}).flat().forEach((childId) => {
    try {
        removeAndDestroyById({ id: childId });
    } catch (error) {
        console.warn(error);
    }
});

// FASE 3
removeItselfFromParent({ id, parentId, componentName });

// FASE 4 — user callback (unica fonte reale di eccezione)
try {
    destroy?.();
} catch (error) {
    console.error(
        `[MobJs] destroy callback error for ${componentName}:${id}:`,
        error
    );
}

// FASE 5 — own state (destroyStoreEntryPoint non-throwing by construction)
state.destroy();

// Fasi 6-8: cleanup mappe globali, DOM removal, detach + componentMap.delete (invariate)
```

#### Analisi "non-throwing by construction"

- **Fase 1 — `unwatch()`**: le closure ritornate da `watchMobStore` / `watchEntryPoint` (`mob-core/store/store-watch.js:113`, `:163`) eseguono solo `Map.get` / `Map.set` / `Map.delete` / `Array.filter`, tutte con early-return su null.
- **Fase 5 — `state.destroy()`**: delega a `destroyStoreEntryPoint` (`mob-core/store/destroy.js:9`) che usa solo `.clear()` su Map/Set, riassegnazioni e chiamate a unwatch.

Se un domani `mob-core` introducesse path throwing su queste API, sarebbe un bug interno del core e deve essere visibile (stessa regola di Fasi 6-8).

#### Cambio di contratto

Il commento storico *"If destroy fire an exception app crash, at now is right, app must crash if callback is used wrong"* è stato **deprecato**. Nuova semantica:

- Un'eccezione in `destroy?.()` produce `console.error` con `componentName` e `id`.
- L'app **non crasha più** su user callback buggy.
- Il cleanup delle mappe globali, del DOM e del `componentMap` avviene comunque (I4 soddisfatta).

#### Problemi risolti

- **Problema 1** (M10): `parentPropsWatcher` ora unwatchato come prima operazione (Fase 1), prima di qualunque altra fase — nessuna finestra di scrittura su state morto.
- **Problema 2** (M10): durante la distruzione dei children i `parentPropsWatcher` sono già disattivati, quindi side-effect propagati dai `destroy?.()` dei figli non scattano più sul nostro state.
- **Problema 3** (M10, ex-H3): un'eccezione in `destroy?.()` utente viene loggata e il cleanup prosegue — DOM rimosso, mappe globali pulite, `componentMap.delete(id)` garantito.

#### Coverage

- ✅ Copre i tre problemi originali di M10.
- ✅ Assorbe e chiude **H3** (ordine cleanup: children distrutti prima del parent-state).
- ✅ Mantiene I1 (bottom-up), I2 (refs vivi in `destroy?.()`), I3 (no scritture post-state.destroy), I4 (DOM + map delete garantiti), I5 (null-out prima di `componentMap.delete`).

---

### L4 — Listener `document.click` senza capture phase configuration

**Stato**: MOOT (non più applicabile)

Il bug L4 segnalava che il listener globale su `document` operava in bubbling phase, rendendolo bypassabile da `stopPropagation()` di handler più interni.

Con la rimozione del listener globale (fix C2), questo bug **non è più rilevante**: i listener sono ora attaccati direttamente sugli elementi `<a>`, quindi si attivano al primo livello di dispatch, prima di qualunque bubbling.

---

### H7 — `cleanDelegateEvent` vs `applyDelegationBindEvent`: race async/sync

**Data fix**: 2026-04-24
**Commit**: (da completare)
**File modificati**:
- `src/js/mob/mob-js/modules/delegate-events/index.js`
- `src/js/mob/mob-js/parse/parse-function-while.js`

#### Riclassificazione dello scope

L'entry originale H7 puntava a `route/load-page.js:174-182` e descriveva un ordering problem fra `removeCancellableComponent` e `parseComponents`. Dopo verifica, quella posizione **non è la causa del bug** e il fix proposto ("spostare `removeCancellableComponent` dopo il parsing") non avrebbe risolto nulla. Il bug reale vive in `parse-function-while.js` + `delegate-events/index.js`: una race async/sync fra `cleanDelegateEvent` (sync) e `applyDelegationBindEvent` (async con `await` interni).

#### Causa del bug

Pre-fix, `parse-function-while.js:441-445` eseguiva:

```js
applyDelegationBindEvent(element);   // async — NON awaited
applyBindEffect(element);
switchBindTextMap();
switchBindObjectMap();
cleanDelegateEvent();                 // sync — parte subito
```

`applyDelegationBindEvent` sospende al primo `await repeaterTick()` (`delegate-events/index.js:232`). Le chiamate sincrone successive (incluso `cleanDelegateEvent`) eseguono prima che `applyDelegationBindEvent` abbia registrato i nuovi `WeakRef` (righe 245-276 della versione pre-fix).

Quando `cleanDelegateEvent` parte:
- `eventTargetRefs` contiene solo ref morti dei componenti appena distrutti.
- Per ogni `eventKey`, `aliveRefs.length === 0` → il listener viene rimosso dal root.

Qualche microtask dopo, `applyDelegationBindEvent` riprende e ri-attacca il listener. Risultato: remove+add inutile a ogni parse, con finestra micro-task in cui eventi utente possono mancare il listener.

#### Approccio

`cleanDelegateEvent` spostato **dentro** `applyDelegationBindEvent`, dopo la registrazione di `WeakRef` e listener. Il modulo `delegate-events` è ora self-contained: register → clean avviene atomicamente nel Job che esegue la parte post-await di `applyDelegationBindEvent`, senza dipendere dall'ordering esterno.

#### Implementazione

**Prima** (`modules/delegate-events/index.js`):
```js
export const cleanDelegateEvent = () => { /* ... */ };

export const applyDelegationBindEvent = async (root) => {
    await repeaterTick();
    await invalidateTick();
    // ...register WeakRef + listener...
    eventToAdd.clear();
};
```

**Dopo**:
```js
const cleanDelegateEvent = () => { /* ... */ };   // ora helper interno

export const applyDelegationBindEvent = async (root) => {
    await repeaterTick();
    await invalidateTick();
    // ...register WeakRef + listener...
    eventToAdd.clear();
    cleanDelegateEvent();                          // pulizia after-register
};
```

**Prima** (`parse/parse-function-while.js`):
```js
import { applyDelegationBindEvent, cleanDelegateEvent } from '../modules/delegate-events';
// ...
applyDelegationBindEvent(element);
applyBindEffect(element);
switchBindTextMap();
switchBindObjectMap();
cleanDelegateEvent();
```

**Dopo**:
```js
import { applyDelegationBindEvent } from '../modules/delegate-events';
// ...
applyDelegationBindEvent(element);
applyBindEffect(element);
switchBindTextMap();
switchBindObjectMap();
```

#### Benefici

- ✅ **Nessun remove+add cycle**: il listener non viene mai disattaccato e ri-attaccato su parse con eventi condivisi.
- ✅ **Nessuna finestra di eventi persi**: `cleanDelegateEvent` vede i WeakRef nuovi come alive.
- ✅ **Self-containment del modulo**: la pulizia è responsabilità del modulo che conosce il timing della registrazione, non di un chiamante esterno.
- ✅ **Rispetta il vincolo "do not use await here"** in `parse-function-while.js`: la chiamata a `applyDelegationBindEvent(element)` resta fire-and-forget; il chiamante non deve attendere il clean.

#### Imprecisione nella descrizione originale

L'entry originale citava un "caso limite" con elementi persistent che potevano restare senza listener dopo il cleanup prematuro. Verifica: i componenti persistent sono **fuori** da `contentElement` (`componentIsPersistent` in `component/action/component.js:89-98`: `return !contentElement?.contains(element);`). `contentElement.replaceChildren()` non li tocca, restano connected, i loro WeakRef sopravvivono al filter. Quel caso limite **non esiste**.

---

### H10 — `popstate` vs `hashchange`: race sulla variabile `currentHistory`

**Data fix**: 2026-04-24
**Commit**: (da completare)
**File modificati**:
- `src/js/mob/mob-js/route/router.js`

#### Riclassificazione dello scope

L'entry originale H10 descriveva come scenario problematico il doppio Back rapido. Dopo verifica quello scenario è **benigno**: entrambi i popstate impostano `currentHistory` a valori truthy e il secondo hashchange viene bloccato dal guard `MAIN_STORE_ROUTE_IS_LOADING`. Lo scenario reale è `popstate + loadUrl programmatica` durante la finestra `await awaitNextLoop`. Il fix originale proposto ("leggere `history.state` direttamente in `parseUrlHash`") non avrebbe funzionato perché `parseUrlHash` stessa scrive sempre in `history.state` su direct-nav, rendendo impossibile distinguere la provenienza.

#### Causa del bug

La variabile modulo `currentHistory` veniva scritta sincrona da `popstate` e letta tardi, dopo un `await awaitNextLoop()`, dentro `parseUrlHash`. Fra scrittura e lettura qualsiasi altro evento (secondo popstate, `loadUrl`) poteva sovrascriverla. Inoltre `currentHistory` non veniva mai resettata dopo uso in `parseUrlHash`: restava truthy dopo una back-nav, causando misinterpretazione di successive modifiche dell'hash.

#### Approccio

Sostituita `currentHistory` con un flag booleano `pendingHistoryNavigation`, con lifecycle preciso:

- Alzato (`true`) dal listener `popstate` quando `event.state.nextId` è truthy (parità semantica con il controllo originale sulla shape dello state)
- Consumato dal listener `hashchange` in modo **sincrono prima di qualsiasi await**: il valore viene copiato in una costante locale e il flag viene immediatamente resettato a `false`
- Il valore catturato viene passato a `parseUrlHash` come parametro locale `fromHistory`
- `loadUrl` resetta il flag sincrono prima di modificare `location.hash`, per coerenza con "navigazione programmatica ≠ history"

Nessuna variabile modulo viene più letta nel corpo di `parseUrlHash`: la decisione "fromHistory" è incapsulata nel parametro passato dal chiamante.

#### Implementazione

**Prima** (`route/router.js`):
```js
/** @type {import('./type').HistoryType | undefined} */
let currentHistory;

export const parseUrlHash = async ({ shouldLoadRoute = true } = {}) => {
    // ...
    if (!currentHistory)
        history.replaceState({ nextId: historyObejct }, '', fullHashWithParmas);
    // ...
    await loadPage({
        // ...
        isBrowserNavigation: getRestoreScrollVale({ hash: currentCleanHash }) && !!currentHistory,
        skipTransition: (currentHistory ?? currentSkipTransition) ? true : false,
    });
};

// init
globalThis.addEventListener('popstate', (event) => {
    currentHistory = event?.state?.nextId;
});
globalThis.addEventListener('hashchange', async () => {
    await awaitNextLoop();
    parseUrlHash();
});

// loadUrl
currentHistory = undefined;
```

**Dopo**:
```js
/** @type {boolean} */
let pendingHistoryNavigation = false;

export const parseUrlHash = async ({ shouldLoadRoute = true, fromHistory = false } = {}) => {
    // ...
    if (!fromHistory)
        history.replaceState({ nextId: historyObejct }, '', fullHashWithParmas);
    // ...
    await loadPage({
        // ...
        isBrowserNavigation: getRestoreScrollVale({ hash: currentCleanHash }) && fromHistory,
        skipTransition: (fromHistory || currentSkipTransition) ? true : false,
    });
};

// init
globalThis.addEventListener('popstate', (event) => {
    pendingHistoryNavigation = !!event?.state?.nextId;
});
globalThis.addEventListener('hashchange', async () => {
    const fromHistory = pendingHistoryNavigation;   // consumo atomico
    pendingHistoryNavigation = false;                // reset sincrono pre-await
    await awaitNextLoop();
    parseUrlHash({ fromHistory });
});

// loadUrl
pendingHistoryNavigation = false;
```

#### Verifica di equivalenza semantica (per non introdurre regressioni)

| Sito | Pre-fix | Post-fix | Equivalenza |
|---|---|---|---|
| Dichiarazione iniziale | `undefined` (falsy) | `false` | ✅ entrambi falsy |
| Scrittura popstate | `event?.state?.nextId` (truthy solo per state con nextId) | `!!event?.state?.nextId` (stesso predicato, cast a bool) | ✅ identico |
| `if (!currentHistory)` → replaceState | write se falsy | `if (!fromHistory)` → write se false | ✅ identico |
| `!!currentHistory` per isBrowserNavigation | cast a bool | `fromHistory` (già bool) | ✅ identico |
| `currentHistory ?? currentSkipTransition` | `??` | `fromHistory \|\| currentSkipTransition` | ✅ identico sotto cast `? true : false` (tavola di verità verificata) |
| Reset `loadUrl` | `currentHistory = undefined` | `pendingHistoryNavigation = false` | ✅ identico |

L'unica differenza sintattica che richiede verifica è `??` vs `||`. Dato `fromHistory: boolean`, la tavola di verità con `currentSkipTransition ∈ { undefined, false, true }` è identica sotto il cast finale `? true : false`.

#### Benefici

- ✅ **Race H10 risolta**: consumo atomico del flag prima dell'await impedisce che un secondo popstate o una `loadUrl` concorrente corrompano il segnale osservato dal primo handler.
- ✅ **Nessuno stato residuo fra cicli**: il flag viene resettato dopo ogni hashchange. Pre-fix `currentHistory` restava truthy indefinitamente dopo una back-nav.
- ✅ **Signature esplicita di `parseUrlHash`**: la dipendenza "derivo da history" è un parametro, non una variabile modulo implicita.
- ✅ **Nessuna regressione su state esterno**: il controllo `!!event?.state?.nextId` mantiene la parità con pre-fix (state con shape diversa da `{ nextId: ... }` viene trattato come direct-nav).

#### Limite fuori scope (non coperto né pre-fix né post-fix)

Se popstate fira **senza** una successiva hashchange (es. Back fra due entry history con stesso hash ma URL diversa creata esternamente via `pushState`), il flag resta alzato fino alla prossima hashchange. Pre-fix aveva la stessa limitazione e non è obiettivo di H10.

---

## Appendice — Falsi positivi

### H1 — TOCTOU con doppio `ref.deref()`

**Data verifica**: 2026-04-24
**Stato**: FALSO POSITIVO
**File**:
- `modules/bind-text/index.js:241-257`
- `modules/bind-object/index.js:198-214`
- `modules/bind-effetc/index.js:282-314`

#### Descrizione originale (errata)

L'analisi originale segnalava che il pattern `ref.deref() && ref.deref()?.isConnected` fosse soggetto a TOCTOU: tra due chiamate a `deref()` il GC avrebbe potuto raccogliere l'oggetto, rendendo la seconda `deref()` undefined e causando `TypeError` all'uso successivo.

#### Verifica spec ECMAScript

La specifica ECMAScript per WeakRef definisce il meccanismo **KeepDuringJob**:

> *"Every WeakRef whose target is a live object at the time of a `deref()` call adds that target to the Kept Objects list for the current Job. Objects in that list MUST NOT be reclaimed by the garbage collector until the current Job completes."*

In pratica:

1. Alla prima `deref()` che ritorna un oggetto vivo, l'engine aggiunge l'oggetto alla lista "Kept Objects" del Job corrente.
2. L'oggetto **non può** essere raccolto dal GC fino alla fine del Job.
3. Tutte le successive chiamate `deref()` nello stesso Job ritornano lo stesso oggetto.

Un "Job" corrisponde a un turno del microtask loop (una callback sincrona eseguita fino alla fine o fino al prossimo `await`).

#### Verifica dei punti citati

| File | Linea | deref() multipli | `await` tra i deref? | Stesso Job? |
|---|---|---|---|---|
| `bind-text/index.js` | 241-257 | sì (5 chiamate) | no | sì |
| `bind-object/index.js` | 198-214 | sì (5 chiamate) | no | sì |
| `bind-effetc/index.js` | 282-292 | sì (2 sulla stessa riga) | no | sì |
| `bind-effetc/index.js` | 302-312 | sì (3 chiamate) | no | sì |

Tutti i siti sono blocchi sincroni dentro `useFrame` / callback async senza `await` tra i `deref()`. Un engine JavaScript conforme allo spec **non può** far ritornare valori diversi.

#### Perché NON introduciamo un helper `withAliveRef`

Proposta dello scenario originale: un helper che cacha `const el = ref.deref()` e passa `el` alla callback.

Problema: se la callback contiene `await`, `el` resta catturato nella closure per tutta la durata della callback, creando una **strong reference** che va contro lo spirito di WeakRef. L'oggetto verrebbe trattenuto in memoria più a lungo del necessario.

Il codice attuale, chiamando `deref()` fresh ogni volta, rispetta meglio la semantica WeakRef: non estende artificialmente la vita dell'oggetto oltre il Job corrente.

#### Conclusione

- H1 **non** descrive un bug reale: la spec ECMAScript previene lo scenario ipotizzato.
- Il codice attuale è corretto e semanticamente pulito rispetto a WeakRef.
- Non vengono adottate modifiche (nessun commento aggiuntivo, nessun helper).

#### Concern residuo (non di bug)

Se in futuro qualcuno introducesse un `await` **in mezzo** ai `deref()`, la garanzia KeepDuringJob non copre più il caso (sono Job diversi). In quello scenario tornerebbero validi sia il TOCTOU sul `deref()` sia lo staleness di `isConnected`. Mitigazione affidata a code review, non a refactor preventivo.

---

### H4 — `parseComponents` non cancellabile durante route transition

**Data verifica**: 2026-04-24
**Stato**: FALSO POSITIVO
**File**: `route/load-page.js:47-243`, `route/router.js:88-230`, `parse/steps/from-object.js:14-24`

#### Descrizione originale (errata)

L'analisi originale ipotizzava che una navigazione verso Route B potesse partire mentre `parseComponents` della Route A era ancora in volo, portando `removeCancellableComponent()` della seconda `loadPage` a distruggere nodi ancora in parsing. Veniva proposto un token di cancellazione.

#### Verifica del flusso reale

Lo scenario è bloccato da un **triplice guard** su `MAIN_STORE_ROUTE_IS_LOADING`, che copre tutti gli entry-point verso la navigazione:

| Entry-point | Guard | File |
|---|---|---|
| `parseUrlHash` (anche chiamata da `hashchange`) | `if (routeIsLoading) { location.hash = previousFullHashLoaded; return; }` | `route/router.js:100-110` |
| `loadUrl` (navigazione programmatica) | `if (!url || mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING)) return;` | `route/router.js:274` |
| Click su `<a>` | `event.preventDefault()` se `ROUTE_IS_LOADING === true` (fix C2) | `parse/steps/from-object.js:21` |

#### Timing del flag

- Impostato a `true` **sincronamente** a `load-page.js:54`, prima di qualsiasi `await`.
- Impostato a `false` solo a `load-page.js:242`, dopo `parseComponents` + transizioni + scroll restore.

Il flag copre l'intera durata di `loadPage`, incluso il tempo in cui `parseComponents` è in volo.

#### Call sites di `loadPage`

`loadPage` è importata e chiamata solo da `router.js:196` (dentro `parseUrlHash`). Nessun altro file la importa — non esiste bypass.

#### Conclusione

- H4 non descrive un bug reale: una seconda `loadPage` **non può** partire mentre la prima è in esecuzione.
- Il token di cancellazione proposto non è necessario: il problema è già risolto dal flag `MAIN_STORE_ROUTE_IS_LOADING` + tre guard a monte.
- Non vengono adottate modifiche.

#### Concern residuo (non di bug)

Rischio teorico se dentro la `layout()` utente (awaitata a `load-page.js:148`) il codice chiamasse manualmente `mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, false)` e triggerasse una navigazione. Sarebbe un abuso dell'API interna, non un bug di framework — non copre lo scenario H4.

---

### H3 — Ordine cleanup: children distrutti prima del parent-state

**Data verifica**: 2026-04-24
**Stato**: RIDIMENSIONATO — assorbito in M10, declassato a MEDIUM
**File**: `component/action/remove-and-destroy/remove-and-destroy-by-id.js`

#### Descrizione originale (parzialmente errata)

L'analisi originale descriveva uno scenario in cui, durante la distruzione dei children in `forEach`, un state change di `child[0]` avrebbe triggerato un watcher del parent che accedeva a `child[1]` "già parzialmente distrutto".

#### Verifica del flusso reale

Riga 39-43 di `remove-and-destroy-by-id.js`:

```js
Object.values(child ?? {})
    .flat()
    .forEach((childId) => {
        removeAndDestroyById({ id: childId });
    });
```

Osservazioni:

1. `Object.values(...).flat()` produce uno **snapshot array**: eventuali mutazioni su `instanceValue.child` durante il loop non impattano l'iterazione.
2. `forEach` è **sincrono**: `child[0]` viene completamente distrutto (incluso `componentMap.delete(child[0].id)` a riga 129 della chiamata ricorsiva) **prima** che `child[1]` inizi. Non esiste un momento in cui entrambi siano "parzialmente distrutti" contemporaneamente.
3. I watcher registrati dal parent sullo stato dei children (via `watchById(childId, ...)`) vivono nello state del child e vengono rimossi quando `child[0].state.destroy()` viene invocato, prima che qualunque watcher del parent possa ancora accedervi.

#### Scenario residuo (teorico, molto specifico)

L'unico scenario riproducibile richiede **tre condizioni contemporanee**:

1. Il parent ha un watcher sul proprio stato (`watchById(parentId, ...)`).
2. Quel watcher accede ai children via `componentMap.get(childId)`.
3. Il callback `destroy?.()` del child scrive esplicitamente sul parent state con `setStateById(parentId, ...)`.

In questo caso, dopo che `child[0]` è stato rimosso da `componentMap`, il watcher del parent leggerebbe `undefined`. È un edge-case che:

- Non è osservato nel codice applicativo canonico.
- Richiede un anti-pattern esplicito nel callback `destroy` del child (scrivere sul parent durante teardown).
- È mitigato a monte dalla stessa documentazione che risolve M17 (feedback loop bottom-up).

#### Fix originale non applicabile

Il fix suggerito era:

```js
state.freezeAllWatchers?.();
```

Problemi:

1. **API inesistente**: `freezeAllWatchers` non è implementato in `mob-core`, il fix non è applicabile as-is.
2. **Scope eccessivo**: "freezare tutti i watcher" di uno state impatta anche watcher registrati da altri componenti esterni, producendo bug silenziosi più gravi dell'originale.
3. **Non ricorsivo**: il freeze sul parent non aiuta con watcher dei child che mutano durante il loro stesso destroy.

#### Conclusione

Il contenuto concreto e azionabile di H3 coincide con **M10**: un'eccezione in `destroy?.()` o `state.destroy()` salta tutta la catena di cleanup a valle, incluso `element.remove()` e `componentMap.delete()`. Questo è deterministico, osservabile, e si risolve con un semplice try/catch/finally — senza bisogno di freeze di watcher.

H3 viene quindi:

- **Declassato** da HIGH a MEDIUM.
- **Assorbito** nell'entry M10 (estesa con descrizione completa, codice, e fix).
- **Mantenuto nell'indice** come riferimento deprecato con puntatore a M10.

---

### H11 — `getOrderedChunkByCurrentRepeatValue` filtra orfani silenziosamente

**Data verifica**: 2026-04-24
**Stato**: FALSO POSITIVO
**File**: `modules/repeater/utils.js:210-247`

#### Descrizione originale (errata)

L'analisi originale segnalava che `.filter((item) => item !== undefined)` rimuovesse "gruppi DOM che non trovano corrispondenza nei dati", causando render parziale con `chunkChildrenOrdered` più corto del previsto e indici disallineati nei loop downstream.

#### Verifica del flusso reale

Tracciando il flusso completo si scopre che:

1. **Gli orfani DOM sono rimossi a monte**, non dal filtro:
   - In `add-with-key.js:128`: `removeAndDestroyById({ id })` distrugge tutti i componenti la cui chiave non è presente in `currentUnique`
   - In `add-without-key.js:151`: stesso pattern per gli elementi in eccesso quando `diff < 0`

2. Quando `getOrderedChunkByCurrentRepeatValue` viene invocato in `watch/index.js:258`, `childrenFilteredByRepeatId` (riga 220) contiene **solo i componenti correnti**: gli orfani sono già stati distrutti.

3. Il filtro lavora nella **direzione opposta** a quella descritta dal bug: rimuove i `data` item che non hanno un chunk corrispondente, non i chunk senza data.

#### Quando il filtro scarta effettivamente qualcosa

L'unico scenario in cui il filtro ha effetto è quando `updateRepeaterWithtKey` ritorna `undefined`, cosa che avviene **esclusivamente** in caso di `REPATE_PROXI_FAIL` (vedi `update/utils.js:126`):

```js
if (proxiObject?.['value'] === REPATE_PROXI_FAIL) return;
```

Il commento in loco chiarisce: *"If proxi return false repeater is destroyed before proxi creation - Should skip item render"*.

In questo scenario:
- Il repeater è in fase di distruzione mid-update
- Il nuovo render viene legittimamente skippato
- L'eventuale disallineamento di indici downstream è **inconsequential**: il cleanup del repeater sovrascrive comunque tutto

#### Conclusione

Il filtro è **defensive code coerente** con il pattern `REPATE_PROXI_FAIL`. Non causa render parziale in flusso canonico. L'analisi originale aveva confuso la direzione del filtro (orfani vs componenti mancanti).

#### Mitigazione

Per evitare future confusioni, è stato aggiunto un commento esplicito in `modules/repeater/utils.js:238-251` che documenta:

- Perché il filtro non rimuove orfani (gestiti a monte)
- Quale è l'unico scenario in cui ha effetto (`REPATE_PROXI_FAIL`)
- Perché in quello scenario il flusso downstream è ininfluente

#### Concern residuo (legittimo, ma altrove)

L'unico rischio reale tracciabile a questa zona è che il flusso continui a eseguire su un repeater destroyed senza un early-return esplicito. Questo è già coperto da:

- **Pattern 4** — Mancanza di token di cancellazione

Quindi non serve mantenere H11 come bug indipendente.

> Nota storica: il riferimento puntava originariamente a H4, poi sostituito con H7. Entrambi risultano oggi non attinenti — H4 è FALSO POSITIVO e H7 è FIXED con fix sullo scope diverso (race async/sync interna a `delegate-events`, non ordering di teardown). Il concern residuo resta però valido e tracciato sotto Pattern 4.
