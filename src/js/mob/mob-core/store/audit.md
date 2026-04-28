# Store audit — bug e issue da verificare

Documento di lavoro: bug logici, problemi semantici e nice-to-have rilevati nel modulo `mob-core/store`. Ogni voce ha gravità, riferimento al file/righe e suggerimento di fix.

Legenda gravità:
- 🔴 alta — bug runtime certo, riproducibile
- 🟠 media — bug latente, edge case o problema semantico
- 🟡 bassa — DX / leggibilità / refactor

---

## 🔴 Bug confermati

### #1 — `storeComputedAction`: rilevamento dipendenze circolari errato

**File:** `store-set.js:731-740`

```js
const hasCircularDependecies = [...callBackComputed].reduce(
    (previous, { prop: currentProp, keys: currentKeys }) => {
        return (
            currentKeys.includes(prop) &&
            keys.includes(currentProp) &&
            !previous           // ← BUG
        );
    },
    false
);
```

L'operatore `&& !previous` cancella il `true` rilevato in iterazioni precedenti. Esempio: se l'iterazione 1 trova un ciclo (`true`) e l'iterazione 2 non lo trova, la 2 calcola `… && !true = false` → il ciclo viene perso. Anche due `true` consecutivi danno `false` (`true && !true`).

**Effetto:** un computed circolare può sfuggire al check, generando ricorsione infinita su `fireComputed`.

**Fix:**
```js
const hasCircularDependecies = [...callBackComputed].some(
    ({ prop: currentProp, keys: currentKeys }) =>
        currentKeys.includes(prop) && keys.includes(currentProp)
);
```

---

### #2 — Wait-watcher silenziato per `null` / `undefined`

**File:** `fire-queque.js:112-127`

```js
if (
    current &&
    current.newValue !== undefined &&
    current.newValue !== null      // ← BUG
) {
    for (const currentFunction of current.callbacks) { … }
}
```

Se `set('prop', null)` o `set('prop', undefined)` (es. reset di stato) e il watcher ha `wait: true`, il callback **non viene chiamato**. Inoltre l'entry resta orfana nella `waitMap` perché il `delete` avviene comunque dopo il blocco `if`, ma il callback non parte mai.

**Effetto:** valori legittimi (null come "nessun selezione", undefined come "non inizializzato") non triggerano i watcher in modalità `wait`.

**Fix:** rimuovere il check sui valori, mantenere solo `if (current)`:
```js
if (current) {
    for (const currentFunction of current.callbacks) {
        currentFunction(current.newValue, current.oldValue, current.validationValue);
    }
}
```

---

### #3 — `emitAsync` + watcher `wait` pendente → doppio fire

**File:** `store-emit.js:84-112`, `fire-queque.js:150-163`

`runCallbackQueqeAsync` itera tutti i watcher senza distinguere `wait`. Scenario:

1. T0: `store.set('prop', x)` con un watcher `wait:true` → entry messa in `waitMap`, schedulato `useNextLoop` per il flush.
2. T0+ε: `await store.emitAsync('prop')` → fire **sincrono** dello stesso watcher (via `for…await`).
3. Tick successivo: `useNextLoop` flushha `waitMap` → fire **di nuovo** lo stesso callback.

**Effetto:** il watcher `wait` viene chiamato due volte. La readme suggerisce che `wait` non sia compatibile con `emitAsync` ("Only effective when emit-async is not used"), ma il comportamento attuale produce un fire duplicato anziché bypassare correttamente il `wait`.

**Fix opzioni:**
- (A) In `runCallbackQueqeAsync` saltare i watcher `wait`:
  ```js
  for (const { fn, wait } of propWatchers.values()) {
      if (wait) continue;
      await fn(newValue, oldValue, validationValue);
  }
  ```
- (B) In `storeEmitAsync`, dopo l'await, fare drain della `waitMap[instanceId][prop]` per evitare il doppio fire.

L'opzione (A) è più semplice e coerente con la versione sync.

---

## 🟠 Problemi semantici

### #4 — `mergeStoreFromBindInstance`: bound store sovrascrive self

**File:** `store-set.js:589-595`

```js
return bindInstance.reduce((previous, current) => {
    const currentState = getStateFromMainMap(current);
    if (!currentState) return previous;
    const { store: currentStore } = currentState;
    return { ...previous, ...currentStore };   // bound override self
}, store);
```

In caso di key conflict (solo *warned* in `bind-store.js`, non bloccato), il valore del bound store **vince** sul self in tutte le valutazioni di computed. Comportamento contro-intuitivo (di solito self avrebbe priorità).

**Decisione richiesta:**
- (A) Invertire ordine spread → self vince.
- (B) Bloccare il bind in caso di conflict (errore invece di warning).
- (C) Lasciare così e documentare esplicitamente in readme.

---

### #5 — Proxy `set` ritorna `false` su prop sconosciuta

**File:** `store-proxi.js:62-86`

```js
set(_, prop, value) {
    const mainState = storeMap.get(instanceId);
    if (!mainState) return false;
    if (!(prop in mainState.store)) return false;   // silent
    …
}
```

In strict mode (modulo ES, sempre con bundler moderni), un Proxy `set` handler che ritorna `false` lancia `TypeError`. L'utente vede uno stack-trace senza contesto invece di un warning informativo.

**Fix:** loggare un `console.warn` prima del `return false`:
```js
if (!(prop in mainState.store)) {
    storeProxiUnknownPropWarning(prop, logStyle);
    return false;
}
```

---

### #6 — `watchEntryPoint`: prop locali finiscono in `unsubscribeBindInstance`

**File:** `store-watch.js:136-177`

Il ramo bound viene attivato quando `bindInstance.length > 0`. Il `find` può restituire `instanceId` stesso (se la prop è in self). In tal caso l'unsubscribe wrapper viene comunque pushato in `unsubscribeBindInstance` di self, "sporcando" un array che dovrebbe contenere solo unsubscribe di watcher esterni.

**Effetto:** funzionale ma confuso; al destroy gli unsubscribe locali rieseguono `updateMainMap` inutilmente.

**Fix:** entrare nel ramo bound solo se `prop` non è in `state.store`:
```js
if (prop in state.store) {
    return watchMobStore({ instanceId, prop, callback, wait });
}
```

---

### #7 — Dependency tracking statico (computed autodetect)

**File:** `store-set.js:842-848`

La dep-detection avviene una sola volta a definizione del computed eseguendo `callback({})`. Se la callback contiene rami (es. `if (proxi.flag) return proxi.a; else return proxi.b;`), `proxi.b` non viene tracciato finché `flag` è truthy → mutazioni di `b` non triggerano il computed.

**Effetto:** limitazione comune (Vue 2-style) ma non documentata. La readme suggerisce "automatic & complete tracking".

**Decisione richiesta:**
- (A) Documentare la limitazione in readme.
- (B) Re-tracciare le dipendenze a ogni esecuzione del computed (cambiamento più invasivo, allinea a Vue 3 / Solid).

---

### #8 — Frozen array/object durante dep-detect può lanciare

**File:** `store-proxi.js:137-145` + `store-set.js:842-848`

`shouldFreeze` ritorna `true` per Array/Object e il proxy GET wrappa in `Object.freeze([...value])`. Se la callback del computed fa mutazioni inline (`.push`, `[i] = …`) durante la dep-detection, throw in strict mode → registrazione del computed abortita senza messaggio chiaro.

**Effetto:** edge case, ma sconcertante per chi non sa che la callback viene eseguita una volta a vuoto.

**Fix:** in `storeComputedEntryPoint`, valutare un `try/catch` attorno a `callback({})` con warning specifico (in conflitto col design "no try/catch" — discutere).

---

## 🟡 Minori / DX

### #9 — `setObj`: `hasKeys` rifiuta tutto se anche una key è ignota

**File:** `store-set.js:229-235`

```js
const hasKeys = valKeys.every((item) => propKeys.includes(item));
if (!hasKeys) {
    storeSetObjKeysWarning(valKeys, prop, logStyle);
    return;
}
```

Rifiuta l'intero `set` se anche una sola key non esiste. Il warning logga `valKeys` ma non specifica quale fosse la key incriminata.

**Fix:** loggare solo le keys mancanti (`valKeys.filter(k => !propKeys.includes(k))`).

---

### #10 — `extractkeyFromProp` cattura solo la prima dep

**File:** `current-key.js:50-57`

```js
return getFirstCurrentDependencies();
```

Per selettori prop (`set/watch/emit`) funziona; ma se l'utente passa per errore `() => proxi.a + proxi.b` viene preso solo `'a'` senza warning.

**Fix:** in modalità prop-selector, se `current_computed_keys.length > 1` loggare un warning ("selector touched multiple props, using only the first").

---

### #11 — `callBackComputed` come `Set<{prop, keys, fn}>`

**File:** `inizialize-instance.js:23`, `store-set.js:747-751`

Set di oggetti → equality di reference, dedup affidata interamente a `checkIfPropIsComputed` upstream. Una `Map<prop, {keys, fn}>` sarebbe più espressiva, più veloce per lookup e renderebbe ridondante il check di duplicato.

**Fix:** refactor a `Map<string, ComputedEntry>` chiavata su `prop`.

---

### #12 — Refusi nei nomi pubblici/interni

Identificatori con typo: `Lsit`, `Queque`, `Warining`, `Compunted`, `Dependecies`, `Sallow`, `inizialize`, `addToComputedWaitLsit`, `runCallbackQueqe`, `storeComputedKeyUsedWarning` (oltre a usi interni). Rendono difficile il grep e la ricerca per nome.

**Fix:** rename pass — non urgente, ma bloccante per refactor futuri.

---

### #13 — `cloneValueOrGet`: ordering Object prima di Array

**File:** `store-utils.js:174-192`

```js
if (checkType(Object, value)) return { ...value };
if (checkType(Array, value)) return [...value];
```

Funziona perché `storeType.isObject` usa `[object Object]` (gli array non passano), ma è fragile a refactor di `isObject`. Spostare il check Array prima di Object aumenta robustezza.

---

### #14 — Asimmetria emit iniziale del computed

**File:** `index.js:212-214`

```js
useNextLoop(() => {
    storeEmitEntryPoint({ instanceId, prop: propParsed });
});
```

Dopo `myStore.computed(...)` fa un emit deferred. Se il watcher è installato **prima** di `computed`, riceve il valore iniziale; se installato **dopo**, no. Comportamento asimmetrico, va documentato.

---

### #15 — `destroy`: pattern di cleanup con state stantio

**File:** `destroy.js:13-53`

Dopo che gli unsubscribe wrapper invocano `updateMainMap` (sostituendo il wrapper nella mappa), il riferimento `state` locale è stantio. Il `state.unsubscribeBindInstance.length = 0` finale agisce su un array detached. Funzionalmente OK perché `removeStateFromMainMap` chiude tutto, ma il codice è fuorviante.

**Fix:** rileggere lo state corrente dopo il forEach, oppure rimuovere la riga `length = 0` (ridondante con la rimozione finale dalla mappa).

---

### #16 — `subscribeWatch` ricostruisce wrapper completo invece di patch

**File:** `store-watch.js:10-53`

Pattern `{...state, watcherByProp, watcherMetadata}` ricostruisce il wrapper. In single-thread JS è safe, ma rende fragile l'introduzione futura di codice asincrono. Considerare un helper `patchMainMap(instanceId, partial)` che fonde solo i campi modificati con il wrapper corrente.

---

## ✅ Falsi positivi rilevati nel primo passaggio

Annotati per memoria, **non sono bug**:

- **`oldValue` pinato al primo evento del tick** (`fire-queque.js:85`) — comportamento corretto: `oldValue` rappresenta lo stato "prima del batch corrente", non quello dell'ultima `set`. Verificato con sequenze `set` consecutive e `emit` + `set`.
- **`subscribeWatch` race condition** — JS single-threaded, no await tra get e update; non c'è race.
- **`validationStatusObject[prop]` undefined su prop semplici** — `inizializeAllProps` chiama `setProp` con `useStrict: false` e `initalizeStep: true`, quindi `validationStatusObject[prop] = isValidated` è sempre eseguito durante init.
- **`addToComputedWaitLsit` perde props se chiamato durante `fireComputed`** — il `Set` `computedPropsQueque` è condiviso tra wrapper (shallow copy), le `add` durante un tick si accumulano correttamente; `fireComputed` resetta il set DOPO aver letto `computedFiltered`.

---

## Priorità di intervento

| Ordine | Item | Severità | Effort |
|--------|------|----------|--------|
| 1 | #1 Circular check | 🔴 | xs (1 riga) |
| 2 | #2 Wait + null/undefined | 🔴 | xs (rimuovere check) |
| 3 | #3 emitAsync double fire | 🔴 | s |
| 4 | #5 Proxy set warning | 🟠 | xs |
| 5 | #6 watchEntryPoint local prop | 🟠 | xs |
| 6 | #4 Bind override semantics | 🟠 | discussione |
| 7 | #7 Dep tracking static | 🟠 | doc o refactor |
| 8 | #9, #10 DX warnings | 🟡 | xs |
| 9 | #11 callBackComputed → Map | 🟡 | m |
| 10 | #12 Rename typos | 🟡 | s (mass rename) |
