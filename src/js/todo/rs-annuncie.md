# SPA — Notifiche Screen Reader con Announcer Component

## Principio fondamentale

Una live region annuncia **solo il testo scritto al suo interno**.
Non rileva né rilegge il resto del DOM.

```
Announcer  →  informa l'utente del cambiamento
focus()    →  porta l'utente al contenuto aggiornato
```

---

## Il componente Announcer

Un singleton con **due canali separati**, montato come primo figlio del `<body>` prima dell'avvio dell'app.

```html
<div id="sr-announcer">
    <div aria-live="polite"></div>
    <!-- attende la lettura in corso -->
    <div aria-live="assertive"></div>
    <!-- interrompe — solo per errori critici -->
</div>
```

### API pubblica

| Metodo                     | Quando usarlo                            |
| -------------------------- | ---------------------------------------- |
| `Announcer.mount()`        | Una volta sola, prima dei frame          |
| `Announcer.polite(msg)`    | Cambio rotta, conferme, aggiornamenti UI |
| `Announcer.assertive(msg)` | Errori bloccanti, alert critici          |
| `Announcer.clear()`        | Prima di un cambio pagina                |

---

## Regola dell'ordine

Aggiorna sempre il DOM **prima** di annunciare.
Lo SR legge il valore reale presente nel DOM al momento della navigazione.

```javascript
// ✅ Corretto
updateMain(route);
updateAside(route);
Announcer.polite('Contenuto aggiornato');

// ❌ Sbagliato
Announcer.polite('Contenuto aggiornato');
updateMain(route); // DOM ancora vecchio
```

---

## Flusso 1 — Primo caricamento (rendering ritardato)

L'app rileva gli FPS del monitor prima di renderizzare.
L'Announcer va montato **prima** del loop dei frame.

```javascript
Announcer.mount(); // subito, prima dei frame

requestAnimationFrame(function waitForFPS(timestamp) {
    if (!appIsReady(timestamp)) {
        requestAnimationFrame(waitForFPS);
        return;
    }

    renderApp(); // 1. aggiorna DOM
    document.title = getPageTitle(location.hash); // 2. titolo
    Announcer.polite(`Applicazione pronta. ${document.title}`); // 3. notifica
    document.getElementById('main-content').focus(); // 4. focus
});
```

---

## Flusso 2 — Cambio rotta (hash change)

```javascript
window.addEventListener('hashchange', async () => {
    const route = location.hash;
    const main = document.getElementById('main-content');

    main.setAttribute('aria-busy', 'true'); // 1. segnala caricamento

    await updateMain(route); // 2. aggiorna DOM
    await updateAside(route);

    main.setAttribute('aria-busy', 'false'); // 3. caricamento terminato
    document.title = getPageTitle(route); // 4. aggiorna titolo

    Announcer.clear(); // 5. pulisci annuncio precedente
    Announcer.polite(document.title); // 6. notifica

    main.focus(); // 7. porta il focus
});
```

---

## Flusso 3 — Operazioni asincrone

```javascript
// Salvataggio
async function onSave() {
    Announcer.polite('Salvataggio in corso…');
    await api.save();
    Announcer.polite('Dati salvati correttamente.'); // DOM già aggiornato
}

// Errore bloccante
function onError(message) {
    Announcer.assertive(message); // unico caso per assertive
}
```

---

## Markup minimo necessario

```html
<body>
    <!-- 1. Announcer: primo figlio, presente prima dell'app -->
    <div id="sr-announcer">
        <div aria-live="polite" aria-atomic="true"></div>
        <div aria-live="assertive" aria-atomic="true"></div>
    </div>

    <header>…</header>

    <!-- 2. tabindex="-1" rende main focusabile via JS -->
    <main id="main-content" tabindex="-1" aria-busy="false">…</main>

    <!-- 3. aria-label descrive il blocco, niente aria-live -->
    <aside aria-label="Contenuto correlato">…</aside>
</body>
```

---

## Cosa NON serve

Con l'Announcer come unico punto di notifica, questi attributi sono ridondanti e vanno evitati:

```html
<!-- ❌ Da non usare -->
<main aria-live="polite">…</main>
<aside aria-live="polite">…</aside>
<section aria-live="assertive">…</section>
```

---

## Riepilogo visivo

```
App pronta / hash change
        │
        ▼
  updateMain()  ──────────────────────┐
  updateAside()                       │ DOM aggiornato
        │                             │
        ▼                             │
  aria-busy="false"                   │
        │                             │
        ▼                             │
  document.title = …                  │
        │                             │
        ▼                             │
  Announcer.polite(title)  ◄──────────┘
  "SR sente l'annuncio"
        │
        ▼
  main.focus()
  "Utente naviga → SR legge DOM aggiornato ✅"
```

---

## Note tecniche

- Il delay interno di 50ms nel `_write` è necessario per NVDA e JAWS: garantisce la rilettura di messaggi identici consecutivi resettando prima il nodo.
- `Announcer.mount()` deve precedere qualsiasi `requestAnimationFrame`: VoiceOver ignora le live region aggiunte dopo il caricamento iniziale.
- `aria-busy="true"` su `<main>` segnala agli SR che il contenuto non è ancora definitivo, evitando letture parziali durante il fetch.
