# Bug Analysis Report — MobJs

**Data analisi**: 2026-04-23
**Versione analizzata**: branch `dev` (HEAD `537451271`)
**Scope**: `src/js/mob/mob-js/` con dipendenza `src/js/mob/mob-core/`

---

## Sommario esecutivo

L'analisi ha identificato **35 bug concreti** distribuiti su tre aree funzionali della libreria:

- **Parsing, Queue e Bind-Props** (15 bug)
- **Repeater e Invalidate** (8 bug)
- **Routing, Events, Lifecycle e Cleanup** (13 bug)

Distribuzione per severità:

| Severità    | Conteggio | Descrizione                                                   |
|-------------|-----------|---------------------------------------------------------------|
| CRITICAL    | 3         | Crash, render inconsistente, side-effect duplicati            |
| HIGH        | 11        | Race condition, memory leak non deterministici, null-access   |
| MEDIUM      | 17        | Edge case, ordering problems, cleanup imperfetto              |
| LOW         | 4         | Ipotetici, da verificare; principalmente micro-edge-case      |

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

- [C1 — Double hashchange firing in `loadUrl`](#c1--double-hashchange-firing-in-loadurl)
- [C2 — Event listener `click` su `document` mai rimosso](#c2--event-listener-click-su-document-mai-rimosso)
- [C4 — `repeaterParentElement` null dopo `await beforeUpdate()`](#c4--repeaterparentelement-null-dopo-await-beforeupdate)

### High

- [H1 — TOCTOU con doppio `ref.deref()`](#h1--toctou-con-doppio-refderef)
- [H2 — Key-based diff con chiavi duplicate](#h2--key-based-diff-con-chiavi-duplicate) **FIXED**
- [H3 — Ordine cleanup: children distrutti prima del parent-state](#h3--ordine-cleanup-children-distrutti-prima-del-parent-state)
- [H4 — `parseComponents` non cancellabile durante route transition](#h4--parsecomponents-non-cancellabile-durante-route-transition)
- [H5 — Event listener di `bind-events` mai rimossi](#h5--event-listener-di-bind-events-mai-rimossi)
- [H6 — `cleanDelegateEvent` rimuove listener da root disconnesso](#h6--cleandelegateevent-rimuove-listener-da-root-disconnesso)
- [H7 — `removeCancellableComponent()` ordering vs `parseComponents`](#h7--removecancellablecomponent-ordering-vs-parsecomponents)
- [H8 — `onMount` senza try/catch](#h8--onmount-senza-trycatch)
- [H9 — `compareIdOrParentIdRecursive` senza guard su self-reference](#h9--compareidorparentidrecursive-senza-guard-su-self-reference) **FIXED**
- [H10 — `popstate` vs `hashchange` ordering su scroll restore](#h10--popstate-vs-hashchange-ordering-su-scroll-restore)
- [H11 — `getOrderedChunkByCurrentRepeatValue` filtra orfani silenziosamente](#h11--getorderedchunkbycurrentrepeatvalue-filtra-orfani-silenziosamente)

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
- [M10 — `removeAndDestroyById`: eccezione in `state.destroy()` salta `element.remove()`](#m10--removeanddestroybyid-eccezione-in-statedestroy)
- [M11 — `switchBindTextMap` su placeholder già rimosso](#m11--switchbindtextmap-su-placeholder-già-rimosso)
- [M12 — `removeCurrentToBindPropsByPropsId` non sincronizzato con mappa inversa](#m12--removecurrenttobindpropsbypropsid-non-sincronizzato)
- [M13 — Queue `maxQueuqueSize` check non strict](#m13--queue-maxqueuquesize-check-non-strict)
- [M14 — `unWatchRouteChange` senza type check](#m14--unwatchroutechange-senza-type-check)
- [M15 — `getParamsFromWebComponent` con `propsId` undefined](#m15--getparamsfromwebcomponent-con-propsid-undefined)
- [M16 — Repeater annidato: ordine di distruzione](#m16--repeater-annidato-ordine-di-distruzione)
- [M17 — Loop di microtask via feedback esplicito dal child](#m17--loop-di-microtask-via-feedback-esplicito-dal-child)

### Low

- [L1 — `watchById` ritorna undefined se id vuoto](#l1--watchbyid-ritorna-undefined-se-id-vuoto)
- [L2 — `getParentIdFromWeakElementMap` ritorna stringa vuota invece di undefined](#l2--getparentidfromweakelementmap-ritorna-stringa-vuota)
- [L3 — Race queue max-size (falso positivo probabile)](#l3--race-queue-max-size)
- [L4 — Listener `document.click` senza capture phase configuration](#l4--listener-documentclick-senza-capture-phase)

---

## CRITICAL

### C1 — Double hashchange firing in `loadUrl`

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

### C4 — `repeaterParentElement` null dopo `await beforeUpdate()`

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

### H1 — TOCTOU con doppio `ref.deref()`

**File**:
- `modules/bind-text/index.js:241-257`
- `modules/bind-object/index.js:198-214`
- `modules/bind-effetc/index.js:282-314`

**Tipo**: race / TOCTOU

#### Descrizione tecnica

Il pattern `ref.deref() && ref.deref()?.isConnected` chiama `deref()` due volte nello stesso branch. Tra le due chiamate (anche se il gap è microtask) il referent può essere raccolto dal GC. Nei blocchi dentro `MobCore.useFrame` / `useNextLoop` il gap è ampio abbastanza da essere osservabile sotto pressione GC.

#### Scenario riproduttivo

Sotto carico elevato con rimozioni/creazioni rapide di nodi:

1. Prima `deref()` → nodo vivo.
2. Il GC raccoglie il nodo tra le righe.
3. Seconda `deref()` → `undefined`.
4. `ref.deref().textContent = ''` → `TypeError`.

#### Codice problematico

```js
// bind-text/index.js:241-257
if (ref.deref() && !ref.deref()?.isConnected) {
    unsubScribeFunction.forEach((fn) => { if (fn) fn(); });
    unsubScribeFunction.length = 0;
}

if (ref.deref() && ref.deref()?.isConnected) {
    ref.deref().textContent = '';
    ref.deref().insertAdjacentHTML('afterbegin', render());
}
```

#### Fix suggerito

Un helper riutilizzabile:

```js
const withAliveRef = (ref, fn) => {
    const el = ref.deref();
    if (!el?.isConnected) return;
    fn(el);
};

withAliveRef(ref, (el) => {
    el.textContent = '';
    el.insertAdjacentHTML('afterbegin', render());
});
```

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

### H3 — Ordine cleanup: children distrutti prima del parent-state

**File**: `component/action/remove-and-destroy/remove-and-destroy-by-id.js:39-58`
**Tipo**: cleanup-order

#### Descrizione tecnica

`removeAndDestroyById` distrugge i figli prima di distruggere lo state del parent. Se il parent ha watcher che ancora puntano ai figli, quei watcher possono triggerare durante la distruzione dei children e lanciare sui figli già parzialmente demoliti. Inoltre, se `state.destroy()` del parent lancia, `element?.remove()` (riga 103-105) viene saltato lasciando il DOM orfano.

#### Scenario riproduttivo

Parent con watcher su `children[i].prop`:

1. `removeAndDestroyById(parent)` invoca ricorsivamente destroy sui children.
2. Durante la distruzione di `child[0]`, un suo state change triggera il watcher del parent.
3. Il watcher accede a `child[1]` che è già parzialmente distrutto.

#### Codice problematico

```js
// remove-and-destroy-by-id.js:39-58
Object.values(child ?? {})
    .flat()
    .forEach((childId) => {
        removeAndDestroyById({ id: childId });
    });

// ...

state.destroy();  // se lancia, non arriva a element.remove()
```

#### Fix suggerito

Inserire try/finally e disattivare i watcher del parent prima di distruggere i children:

```js
try {
    state.freezeAllWatchers?.();  // opzionale, da implementare nel core
    Object.values(child ?? {}).flat().forEach((id) => removeAndDestroyById({ id }));
    state.destroy();
} finally {
    element?.removeCustomComponent?.();
    element?.remove();
    instanceValue.element = null;
}
```

---

### H4 — `parseComponents` non cancellabile durante route transition

**File**: `route/load-page.js:148-182`
**Tipo**: race / cleanup-order

#### Descrizione tecnica

`loadPage()` ottiene il `contentElement`, lo svuota, prepare il nuovo content, chiama `parseComponents()` in modo asincrono. Se l'utente scatena una nuova navigazione mentre `parseComponents` è in corso, la seconda chiamata di `loadPage` invoca `removeCancellableComponent()` distruggendo nodi che il parser della prima chiamata sta ancora processando.

#### Scenario riproduttivo

1. Route A: `layout()` async lento.
2. Utente clicca link Route B prima che A finisca.
3. Nuovo `loadPage` svuota `contentElement` e rimuove i componenti non-persistenti.
4. Il `parseComponents` della Route A riprende e cerca elementi che non esistono più.

#### Codice problematico

```js
// route/load-page.js:174-182
contentElement.replaceChildren();
removeCancellableComponent();
contentElement.prepend(content);
// ...
await parseComponents({ element: contentElement });
```

#### Fix suggerito

Introdurre un token di cancellazione:

```js
let currentLoadToken = 0;

export const loadPage = async (args) => {
    const token = ++currentLoadToken;
    // ...
    await parseComponents({ element: contentElement, isCancelled: () => token !== currentLoadToken });
};
```

Il parser controlla `isCancelled()` dopo ogni await e ritorna early.

---

### H5 — Event listener di `bind-events` mai rimossi

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

### H7 — `removeCancellableComponent()` ordering vs `parseComponents`

**File**: `route/load-page.js:174-182`
**Tipo**: cleanup-order

#### Descrizione tecnica

`removeCancellableComponent()` viene chiamato prima di `parseComponents()`. I componenti non-persistent vengono eliminati, ma se hanno listener delegati registrati tramite WeakRef in `eventTargetRefs`, i ref diventano dead. `cleanDelegateEvent` non distingue tra "rimosso intenzionalmente" e "raccolto dal GC": può rimuovere un listener che sarà appena reinstallato dal nuovo parse.

#### Scenario riproduttivo

1. Route A ha elementi con delegate click.
2. Route B sta caricando: rimuove A.
3. `cleanDelegateEvent` viene invocato subito dopo: vede 0 ref alive.
4. Rimuove il handler dal root.
5. Route B registra nuovi elementi con lo stesso evento click.
6. `setDelegateBindEvent` ri-registra handler: OK per i nuovi.

Caso limite: se esiste una zona di mezzo dove un sottoset degli elementi della route A sopravvive (es. elementi persistent), il cleanup prematuro può disattivare listener ancora necessari.

#### Codice problematico

```js
// route/load-page.js:174-182
contentElement.replaceChildren();
removeCancellableComponent();
contentElement.prepend(content);
// ...
await parseComponents({ element: contentElement });
```

#### Fix suggerito

Spostare `removeCancellableComponent` dopo la fase di parsing dei nuovi componenti, o separare la pulizia in due fasi: prima struttura, poi listener.

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

### H10 — `popstate` vs `hashchange` ordering su scroll restore

**File**: `route/router.js:263-276`
**Tipo**: race

#### Descrizione tecnica

`popstate` salva `currentHistory = event?.state?.nextId` sincronamente in una variabile modulo. `hashchange` fa `await awaitNextLoop()` e poi `parseUrlHash`. Se tra popstate e hashchange arriva una navigazione parallela (un `loadUrl` programmatico o un secondo Back), `currentHistory` viene sovrascritto.

#### Scenario riproduttivo

L'utente preme Back rapidamente due volte:

1. Primo Back: popstate → `currentHistory = A`.
2. Il tick di `hashchange` è rinviato a `awaitNextLoop`.
3. Secondo Back: popstate → `currentHistory = B`.
4. Primo hashchange esegue `parseUrlHash` con state `B` invece che `A`.

#### Codice problematico

```js
// route/router.js:263-265
globalThis.addEventListener('popstate', (event) => {
    currentHistory = event?.state?.nextId;
});

// route/router.js:270-276
globalThis.addEventListener('hashchange', async () => {
    await awaitNextLoop();
    parseUrlHash();
});
```

#### Fix suggerito

Leggere `history.state` direttamente dentro `parseUrlHash` (è sempre aggiornato dal browser) anziché mantenere una variabile modulo che si desincronizza.

---

### H11 — `getOrderedChunkByCurrentRepeatValue` filtra orfani silenziosamente

**File**: `modules/repeater/utils.js:210-247`
**Tipo**: diff-bug

#### Descrizione tecnica

`.filter((item) => item !== undefined)` rimuove gruppi DOM che non trovano corrispondenza nei dati. `chunkChildrenOrdered` finisce più corto del previsto e i loop successivi saltano indici, causando render parziale.

#### Scenario riproduttivo

Reorder aggressivo dell'array con chiavi che cambiano:

```js
// Prima
[{ id: 1 }, { id: 2 }, { id: 3 }]
// Dopo
[{ id: 3 }, { id: 1 }]
// Durante la transizione, { id: 2 } è ancora nel DOM ma non in data
```

Il gruppo `id: 2` viene filtrato silenziosamente, ma il DOM non lo rimuove.

#### Codice problematico

```js
// modules/repeater/utils.js:244-246
return data
    .map((item) => childrenMap.get(item[key]))
    .filter((item) => item !== undefined);
```

#### Fix suggerito

Distinguere esplicitamente "orfani da rimuovere" da "ordinati":

```js
const ordered = data.map((item) => childrenMap.get(item[key]));
const orphans = Array.from(childrenMap.values()).filter(
    (group) => !ordered.includes(group)
);
// orphans deve essere rimosso esplicitamente dal DOM
return { ordered: ordered.filter(Boolean), orphans };
```

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

### M10 — `removeAndDestroyById`: eccezione in `state.destroy()` salta `element.remove()`

**File**: `component/action/remove-and-destroy/remove-and-destroy-by-id.js:58-121`
**Tipo**: cleanup-order

Vedi H3 per descrizione dettagliata. Correlato.

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

### M12 — `removeCurrentToBindPropsByPropsId` non sincronizzato

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

### Pattern 1 — `WeakRef.deref()` multiple

Il pattern `ref.deref() && ref.deref()?.isConnected` appare in almeno 3 moduli (H1). È una classe di bug ricorrente. **Proposta**: introdurre un helper centralizzato `withAliveRef(ref, fn)` e applicarlo dovunque.

### Pattern 2 — Cleanup ordering

I bug C4, H3, H7, M1, M10, M16 sono tutti istanze dello stesso problema: la distruzione dei componenti nidificati ha race multiple con il route change. **Proposta**: un singolo refactor del teardown sequence, con un'idea chiara di:

1. Prima: disattivare i watcher (freeze).
2. Poi: rimuovere i listener.
3. Poi: distruggere lo state (bottom-up o top-down secondo regola).
4. Infine: rimuovere il DOM.

### Pattern 3 — Idempotenza di `inizializeApp`

Listener registrati a module-load (C2), stato globale non resettabile: bloccano HMR e test robusti. **Proposta**: tutto l'init deve essere dentro `inizializeApp`, con una guard di idempotenza esplicita o un teardown completo.

### Pattern 4 — Mancanza di token di cancellazione

H4, H7, M3, M8, H10 sono tutti istanze dello stesso pattern: codice async interrotto da navigazione. **Proposta**: un singleton `navigationToken` incrementato ad ogni `loadUrl`; ogni operazione async lungo il percorso controlla il proprio token dopo ogni await.

---

## Priorità d'intervento suggerita

### Fase 1 — Fix critici (1-2 giorni di lavoro)

1. **C2**: guard idempotenza su listener `document.click`.
2. **C1**: rimuovere doppio `hashchange` dispatch.
3. **C4**: early return se `repeaterParentElement` non connesso (eliminare il ghost div).
4. **H8**: try/catch attorno a `onMount`.

### Fase 2 — Fix alta severità (3-5 giorni)

5. **H1**: refactor con helper `withAliveRef`.
6. **H3 + M10**: try/finally in `removeAndDestroyById`.
7. **H9**: guard self-reference in `compareIdOrParentIdRecursive`. **FIXED**
8. **H5**: tracking dei listener di `bind-events`.

### Fase 3 — Refactor dei pattern (1-2 settimane)

9. **Pattern 2**: refactor completo del teardown sequence.
10. **Pattern 4**: introdurre token di cancellazione per navigazione.
11. **Pattern 3**: rifondere l'init per renderlo idempotente.
12. **H11 + H2**: migliorare il diff del repeater con warning su key duplicate e gestione esplicita degli orfani.

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
