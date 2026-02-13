# MobJs - Problemi Architetturali

## 1. Drop silenzioso di setState durante il repeater (BASSO)

**File:** `component/index.js:96-110`, `modules/repeater/watch/index.js:108`

### Analisi approfondita

Il repeater utilizza un doppio meccanismo di protezione contro mutazioni concorrenti:

**Step 1 (primario): `freezePropById`** — Il watcher del repeater (linea 108 di `watch/index.js`) congela la prop **sincronamente** prima di qualsiasi `await`. Poiché il watcher non ha `wait: true`, viene eseguito inline da `runCallbackQueqe`. Il freeze è attivo prima che `store.set()` ritorni al chiamante.

Da quel momento, qualsiasi `setState` sulla stessa prop viene silenziosamente ignorato:

```js
// component/index.js:95-110
setState: (prop, value, { emit = true } = {}) => {
    const isFreezed = getFreezePropStatus({ id, prop });
    // ...
    if (isFreezed || isProp) return; // ← drop silenzioso, nessun warning
    store.set(propToString, value, { emit: emit ?? true });
},
```

Lo stesso check è presente in `setStateById` (`set-state-by-id.js:23-26`) e `updateStateByName`.

**Step 2 (backup): `activeRepeatMap`** — Il check a linea 114-132 di `watch/index.js` con il revert via `setState(state, previous, { emit: false })` è un fallback che non dovrebbe mai scattare in condizioni normali, come confermato dal commento nel codice: *"Secure step 2 (if step 1 fail, but i don't think)"*.

### Il problema reale

Il problema non è "revert silenzioso" ma **"drop silenzioso"**: durante la finestra in cui il repeater è in esecuzione (dalla `freezePropById` alla `unFreezePropById` dentro `useNextLoop`), `setState` ritorna senza fare nulla e senza avvisare. Lo stato dell'utente viene perso.

La finestra è ampia perché `unFreezePropById` avviene in `useNextLoop` (linea 308), quindi copre tutto il tempo dell'update DOM + un tick aggiuntivo.

### È realistico?

Per interazioni UI normali (click, input), il repeater è sufficientemente veloce e il problema non si manifesta. Per scenari con aggiornamenti rapidi e consecutivi (WebSocket, polling aggressivo, input rapido dell'utente su una lista), la finestra di freeze esiste ed è reale, ma resta un caso limite.

**Gravità ridimensionata a BASSO** — il meccanismo funziona come design di protezione, il problema è solo l'assenza di feedback all'utente.

---

## 2. La tick queue in overflow è trattata come "risolta" (ALTO)

**File:** `queque/tick.js:18-36`

Lo stesso pattern è presente in tutti e 3 i file di queue:

- `queque/tick.js` (main tick, max: 100.000)
- `queque/tick-repeater.js` (repeater tick, max: 1.000)
- `queque/tick-invalidate.js` (invalidate tick, max: 1.000)

```js
export const incrementTickQueuque = (props) => {
    if (queque.size >= maxQueuqueSize) {
        console.warn(`maximum loop event reached: (${maxQueuqueSize})`);
        return () => {};  // no-op decrementer
    }
    // ...
};

const queueIsResolved = () => {
    return queque.size === 0 || queque.size >= maxQueuqueSize;
};
```

Quando la queue raggiunge il max:

- Nuovi incrementi restituiscono decrementori no-op.
- `queueIsResolved()` ritorna `true` perché `size >= max`.
- `await tick()` si risolve immediatamente pensando che tutto sia completato.
- La queue resta piena di operazioni mai completate, e i no-op decrementors non la svuoteranno mai.

**Risultato:** la queue resta permanentemente piena. Ogni successiva chiamata a `tick()` si risolve subito, rompendo tutto il meccanismo di batching per il resto della vita dell'applicazione.

### Come si raggiunge l'overflow

Tutti e 3 i consumer seguono lo stesso pattern: **increment sincrono, decrement differito** (in `useNextLoop` o dopo `await`). Se qualcosa fallisce tra i due, la entry resta nella queue per sempre.

| Consumer | Increment | Decrement | Leak se... |
|---|---|---|---|
| **repeater** (`watch/index.js:93`) | Sincrono | `useNextLoop` (linea 313) | `beforeUpdate` o `updateRepeater` lancia |
| **bindProps** (`bind-props/index.js:344`) | Dopo `await` | `useNextLoop` (linea 368) | `updateBindProp` lancia |
| **invalidate** (`inizialize-invalidate-watch.js:87`) | Sincrono | `useNextLoop` (linea 153) | `beforeUpdate` o `emitAsync` lancia |

Caso specifico nell'invalidate (linee 104-107): se `invalidateParent` è null (componente distrutto mentre il watcher è attivo), la funzione esce senza chiamare `descrementQueue()` né `decrementInvalidateQueque()`, e `watchIsRunning` non viene mai resettato. Ogni trigger successivo lascia 2 entry orfane.

**Scenari di raggiungimento:**

- **Bug nel callback utente** (`beforeUpdate` che lancia sempre): ogni state change aggiunge 1-2 entry leak. In una SPA long-lived, accumulabile.
- **Invalidate parent null**: componente distrutto con watcher attivi, accumulo silenzioso senza errori visibili.
- **Loop infinito** (issue #4, misuso utente): raggiunge il max rapidamente.

### Soluzione proposta: Circuit Breaker

**A) `incrementTickQueuque`: quando si raggiunge il max, svuotare forzatamente la queue (circuit breaker).**

```js
export const incrementTickQueuque = (props) => {
    if (queque.size >= maxQueuqueSize) {
        console.error(
            `maximum queue size reached (${maxQueuqueSize}). ` +
            `Likely an infinite watch loop. Queue force-cleared.`
        );

        queque.clear();
        return () => {};
    }

    const id = MobCore.getUnivoqueId();
    queque.set(id, props);

    return () => queque.delete(id);
};
```

**B) `queueIsResolved`: rimuovere la condizione di overflow.**

```js
const queueIsResolved = () => {
    return queque.size === 0;
};
```

### Verifica edge cases della soluzione

| Scenario | Dopo `clear()` | Risultato |
|---|---|---|
| Decrementers in volo dei vecchi entry | `queque.delete(oldId)` su chiave inesistente → no-op | Innocuo |
| `tick()` in attesa | `size === 0` dopo clear → resolve | tick si sblocca |
| Nuove operazioni dopo clear | Incrementano normalmente su queue vuota | Queue operativa |
| Loop infinito ripetuto | Fill → clear → fill → clear | `console.error` ripetuto, sistema non si blocca mai |
| Tick ricorsivo | `awaitNextLoop` → check `size === 0` → resolve | Nessun rischio di ricorsione infinita |

**La stessa correzione va applicata identicamente a tutti e 3 i file di queue.**

---

## 3. `afterUpdate` eseguito con prop ancora frozen (MEDIO)

**File:** `modules/repeater/watch/index.js:284-327`

### Analisi approfondita

Dentro `useNextLoop` (linee 284-327) l'ordine delle operazioni è:

```
useNextLoop:
  1. afterUpdate()              ← prop ANCORA frozen, activeRepeat ANCORA set
  2. removeActiveRepeat()
  3. unFreezePropById()         ← solo ora la prop è scrivibile
  4. descrementQueue()
  5. inizializeNestedInvalidate()
  6. inizializeNestedRepeat()
```

`afterUpdate()` è il callback utente che segnala "l'aggiornamento è finito". Ma quando viene eseguito, la prop è ancora frozen (il `freezePropById` della linea 108 non è stato ancora rimosso). Se l'utente fa `setState` sulla prop del repeater dentro `afterUpdate`, la chiamata viene silenziosamente ignorata dal check in `component/index.js:96-110`.

### È realistico?

Si. L'utente riceve un callback che comunica "l'update è completo" ma non può agire sulla prop del repeater. Es: inside `afterUpdate` l'utente vuole aggiungere un elemento in coda alla lista appena aggiornata, o vuole normalizzare i dati. Il `setState` viene droppato senza feedback.

### Soluzione proposta: riordinare le operazioni

Spostare `removeActiveRepeat` e `unFreezePropById` prima di `afterUpdate`:

```js
MobCore.useNextLoop(async () => {
    removeActiveRepeat({ id, state, container: repeaterParentElement });
    unFreezePropById({ id, prop: state });

    if (mainComponent) {
        afterUpdate();
    }

    descrementQueue();
    descrementRepeaterQueue();

    inizializeNestedInvalidate({ invalidateParent: repeaterParentElement, id });
    inizializeNestedRepeat({ repeatParent: repeaterParentElement, id });
});
```

Dopo il riordino, quando l'utente chiama `setState` dentro `afterUpdate`:

- La prop non è frozen → `setState` passa.
- `activeRepeat` non è set → il backup non scatta.
- Il watcher del repeater si riattiva → un nuovo ciclo parte normalmente.
- Le tick queue sono ancora incrementate (decrement dopo), quindi `await tick()` aspetta correttamente.

**Nota:** il file `modules/repeater/improvment.md` già presente nel progetto documenta problemi correlati (zombie components in `useNextLoop`, try-catch mancanti). La soluzione di riordino è compatibile con i fix proposti in quel file.

---

## 4. Nessuna protezione contro catene circolari di watch (BASSO)

**File:** `modules/bind-props/index.js:328-371`

I watcher di `bindProps` osservano lo stato del parent e aggiornano lo stato del child. Non c'è protezione esplicita contro cicli:

```
Componente A (parent) -> bindProps -> Componente B (child)
                                        |  watch su prop
                                        v
                                      setState su A (via metodo/callback)
                                        |
                                        v
                              Componente A -> bindProps -> Componente B -> ...
```

Il flag `watchIsRunning` (linea 326) previene l'esecuzione multipla dello stesso watcher nel medesimo tick, ma non previene cicli cross-componente.

**Nota:** questo scenario richiede un uso scorretto del sistema da parte dell'utente. Il flusso dati in MobJs è unidirezionale by design (parent -> child via `bindProps`). Per creare un ciclo bisogna forzare esplicitamente il flusso inverso (child -> parent) con `setStateById` o `useMethodByName`. In condizioni normali non si verifica.

Un cycle detection esplicito avrebbe impatto sulle performance (hot path di ogni mutazione di stato) per proteggere da un caso d'uso scorretto. Il circuit breaker della issue #2 (`queque.clear()`) funge già da rete di sicurezza: se un loop infinito si verifica, la queue viene svuotata e il `console.error` segnala il problema.

---

## 5. `removeAndDestroyById`: il callback utente precede il cleanup del framework (MEDIO)

**File:** `component/action/remove-and-destroy/remove-and-destroy-by-id.js`

### Analisi

L'ordine attuale delle operazioni nella funzione di destroy è:

```js
destroy?.();                            // linea 53 - user callback (PRIMO)
state.destroy();                        // linea 54
parentPropsWatcher.forEach(unwatch);    // linea 59
removeInvalidateId({ id });             // linea 64
removeRepeaterId({ id });               // linea 65
// ...
element?.removeCustomComponent?.();     // linea 100
element?.remove();                      // linea 101
componentMap.delete(id);                // linea 125
```

Se `destroy?.()` (il callback utente, linea 53) lancia un'eccezione, il comportamento corretto è che l'app si fermi — è un bug dell'utente e va corretto. Tuttavia, con l'ordine attuale l'eccezione lascia il framework in stato sporco (store vivo, watcher attivi, componentMap non pulita), rendendo il debug più difficile: l'errore del callback utente produce effetti collaterali che inquinano la console.

### Soluzione proposta: user callback per ultimo

Spostare `destroy?.()` alla fine della catena, dopo tutto il cleanup interno del framework:

```js
// 1. Cleanup framework (stato interno garantito pulito)
state.destroy();
if (parentPropsWatcher) parentPropsWatcher.forEach((unwatch) => unwatch());
removeInvalidateId({ id });
removeRepeaterId({ id });
// ... tutto il cleanup delle mappe e reference ...
element?.removeCustomComponent?.();
element?.remove();
// ... nulling reference ...
componentMap.delete(id);

// 2. User callback per ultimo
destroy?.();
```

Se il callback utente lancia, lo stato del framework è già pulito. L'errore è isolato e leggibile, senza effetti collaterali sulle strutture interne.

---

## 6. ~~`activeRepeatMap` fragile al replace del container~~ (NON VALIDO)

**File:** `modules/repeater/active-repeater/index.js`

### Analisi rivista

Lo scenario ipotizzato (container del repeater sostituito durante un `invalidate`) non è raggiungibile con uso normale del framework:

- Il repeater crea/rimuove figli **dentro** il container, non sostituisce il container stesso.
- Un `invalidate` sul componente parent distruggerebbe e ricreerebbe l'intero repeater (nuovo `repeatId`, nuova entry nella map), non solo il container.
- L'unico modo per avere un container diverso è manipolazione diretta del DOM da parte dell'utente, che è un uso scorretto del pattern.

Il confronto per reference (`container === repeat.container`) è corretto perché il container è stabile per design. **Issue declassata a non valida.**

---

## 7. Il parse loop ha un limite silenzioso (BASSO)

**File:** `parse/parse-function-while.js:348-360`

```js
if (parseLimitReached) {
    console.warn(`dom parse reached max parse limit`);
    break;
}
```

Se si raggiunge il limite (default 5000), i componenti rimanenti restano come placeholder nel DOM, non inizializzati. Solo un `console.warn` lo segnala. In sviluppo potrebbe passare inosservato, e in produzione non sarebbe mai visto.

---

## Riepilogo

| # | Problema | Gravità | Tipo |
|---|---|---|---|
| 1 | Drop silenzioso di setState durante il repeater | **Basso** | Caso limite, by design |
| 2 | Tick queue overflow = risolto per sempre | **Alto** | Corruzione stato |
| 3 | `afterUpdate` eseguito con prop ancora frozen | **Medio** | Sequenza errata |
| 4 | Nessun cycle detection nei watch cross-componente | **Basso** | Uso scorretto utente |
| 5 | Destroy: user callback precede il cleanup framework | **Medio** | Stato sporco su errore utente |
| 6 | ~~activeRepeatMap fragile al replace del container~~ | **Non valido** | Uso scorretto utente |
| 7 | Parse limit silenzioso | **Basso** | Troncamento DOM |
