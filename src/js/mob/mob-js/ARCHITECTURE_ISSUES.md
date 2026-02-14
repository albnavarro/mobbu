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
| 3 | `afterUpdate` eseguito con prop ancora frozen | **Medio** | Sequenza errata |
| 4 | Nessun cycle detection nei watch cross-componente | **Basso** | Uso scorretto utente |
| 5 | Destroy: user callback precede il cleanup framework | **Medio** | Stato sporco su errore utente |
| 6 | ~~activeRepeatMap fragile al replace del container~~ | **Non valido** | Uso scorretto utente |
| 7 | Parse limit silenzioso | **Basso** | Troncamento DOM |
