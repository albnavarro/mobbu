# CSS/SCSS — Upgrade suggestions (analisi 2026)

Analisi di `src/scss/`. Lo stack attuale è già avanti alla media (`@layer`, `@scope`, logical properties, range media query). Questi sono i punti dove si può spingere ancora, con esempi presi/adattati dai file reali del progetto.

---

## 1. `@container` query sui componenti riusabili

Oggi i componenti (es. `dynamic-list-card`, `move-3d-item`) reagiscono solo ai breakpoint globali definiti in `abstract/mq-map.scss`. Se lo stesso componente finisce in contesti diversi (sidebar stretta, griglia larga, off-canvas), il breakpoint globale non basta.

**File di riferimento:** `component/dynamic-list-card.scss` (o simile), `abstract/mixins.scss`

```scss
// Prima — dipende solo dal viewport globale
@scope (.c-dynamic-card) {
    :scope {
        display: grid;
        grid-template-columns: 1fr;

        @include mq(tablet) {
            grid-template-columns: 1fr 1fr;
        }
    }
}
```

```scss
// Dopo — il componente reagisce al proprio contenitore
.l-matrioska,
.l-h-scroller {
    container-type: inline-size;
    container-name: card-context;
}

@scope (.c-dynamic-card) {
    :scope {
        display: grid;
        grid-template-columns: 1fr;

        @container card-context (inline-size > 480px) {
            grid-template-columns: 1fr 1fr;
        }
    }
}
```

Si può anche aggiungere un mixin dedicato in `abstract/mixins.scss`, sul modello di `@mixin mq()`:

```scss
@mixin cq($name, $condition) {
    @container #{$name} (#{$condition}) {
        @content;
    }
}
```

---

## 2. `:has()` al posto di alcune classi di stato via JS

Diversi selettori dipendono da classi aggiunte manualmente via JS (`.is-selected`, `.is-whelling`), es. in `pages/dynamic-list/dynamic-list-card-inner.scss`:

```scss
// Attuale
:where(.is-selected) .c-dynamic-list-card-inner {
    transform: scale(1.02);
}
```

Se `.is-selected` viene messa su un antenato solo per riflettere uno stato di un figlio (es. un `input:checked` o `[aria-expanded="true"]` interno), si può eliminare il giro JS:

```scss
// Dopo, se lo stato è realmente derivabile dal DOM
.c-dynamic-list-card-inner:has(input:checked) {
    transform: scale(1.02);
}

// oppure per stati aria già gestiti da MobJs
.l-navigation:has(.link[aria-current='page']) {
    --nav-indicator-opacity: 1;
}
```

Non è una sostituzione 1:1 ovunque (va bene tenere `.is-whelling`/`.is-selected` quando lo stato non è puramente strutturale), ma vale la pena controllare caso per caso in `dynamic-list-card-inner.scss`, `dynamic-slotted-label.scss`, `navigation.scss`.

---

## 3. `clamp()` al posto del sistema custom di font-size fluido

`abstract/font-map.scss` + `mixins.scss` (`font-size-map`, `rem-or-em`) ricalcolano manualmente il `vw` per ogni breakpoint con un algoritmo abbastanza elaborato:

```scss
// Attuale — abstract/font-map.scss
$font-map: (
    'small': (size: 16px),
    'tablet': (size: 16px, unit: px, default: true),
    'xxlarge': (size: 16px, unit: vw, ratio: 1980),
);
```

più tutta la logica in `@mixin font-size-map()` per convertire in `vw` sopra `xxlarge`.

`clamp()` nativo fa la stessa cosa in una riga, senza bisogno di generare regole `html { @include mq($key) {...} }` per ogni breakpoint:

```scss
// Dopo
html {
    // min 16px, scala fluida tra 1200px e 1980px, max 18px
    font-size: clamp(1rem, 0.85rem + 0.5vw, 1.125rem);
}
```

Stesso discorso per `.title-biggest` in `general/typography.scss`, che oggi fa:

```scss
.title-biggest {
    font-size: min(calc((120 * 100) / 1920 * 1vw), rem(120));
}
```

e potrebbe diventare:

```scss
.title-biggest {
    font-size: clamp(2.5rem, 6.25vw, 7.5rem);
}
```

**Nota:** questo è un cambio di sistema, non un fix locale — da valutare come refactor a parte perché tocca `filter-nested-map`, `get-prev-available-key` e tutta la logica di `rem()`/`em()` che dipende dal breakpoint corrente. Non va fatto "di corsa".

---

## 4. Sostituire `normalize.css` v3.0.3

`vendor/normalize.scss` è normalize.css **v3.0.3** (2015), con fix espliciti per IE8/9/10/11:

```scss
/**
 * Correct `block` display not defined for any HTML5 element in IE 8/9.
 * Correct `block` display not defined for `details` or `summary` in IE 10/11
 * and Firefox.
 */
```

Nel 2026 questi fix sono morti insieme a IE. Conviene sostituirlo con un reset moderno tipo quello di Josh Comeau/Andy Bell, che tra l'altro si sposa meglio con le logical properties già usate ovunque nel progetto:

```scss
// vendor/_modern-reset.scss (esempio)
@layer reset {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
    }

    html {
        -webkit-text-size-adjust: 100%;
        hanging-punctuation: first last;
    }

    body {
        min-block-size: 100dvb;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    svg,
    video {
        display: block;
        max-inline-size: 100%;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }
}
```

Va comunque tenuto conto che parte del reset attuale (`* { margin: 0; padding: 0; }`, box-sizing esplicito per i web component) è già stato scritto ad hoc nel file — quella parte si può portare avanti pari pari, va solo tolto il resto (fix HTML5 display, `optgroup`, `[type="search"]`-webkit ecc. specifici per browser ormai morti).

---


## 6. `light-dark()` come alternativa al doppio blocco `[data-theme]`

Il tema oggi è gestito bene con attributo esplicito su `:root`:

```scss
// general/base.scss
:root {
    &[data-theme='light'] {
        --white: #fff;
        --dark: #2e3440;
        // ...
    }

    &[data-theme='dark'] {
        --white: #2e3440;
        --dark: #eceff4;
        // ...
    }
}
```

Va bene così se il tema è **sempre** impostato esplicitamente via JS/attributo (toggle utente). Se invece si vuole un default automatico da `prefers-color-scheme` prima che JS imposti l'attributo (evita il flash del tema sbagliato al primo paint), si può aggiungere `light-dark()` come fallback:

```scss
:root {
    color-scheme: light dark;

    // fallback prima che [data-theme] venga settato da JS
    --white: light-dark(#fff, #2e3440);
    --dark: light-dark(#2e3440, #eceff4);
}

:root[data-theme='light'] {
    --white: #fff;
    --dark: #2e3440;
    // il resto invariato
}

:root[data-theme='dark'] {
    --white: #2e3440;
    --dark: #eceff4;
}
```

Da valutare solo se il flash-of-wrong-theme è un problema reale oggi — altrimenti il sistema attuale ad attributo esplicito resta la scelta più semplice e prevedibile.

---

## 7. `@property` per le custom property animate

Nei componenti con animazioni via custom property (es. `component/move-3d/`, `component/mouse-trail/`, `pages/canvas/`), se una `--*` viene interpolata in una `transition`/`animation`, il browser oggi la tratta come stringa discreta (jump, non interpolazione fluida) a meno di tipizzarla:

```scss
// component/move-3d/move-3d-item.scss — se --rotate-x è animata
@scope (.c-move3d-item) {
    :scope {
        transform: rotateX(var(--rotate-x, 0deg));
        transition: --rotate-x 0.3s ease;
    }
}
```

Senza `@property` questa transition non interpola in modo fluido. Con la tipizzazione:

```scss
@property --rotate-x {
    syntax: '<angle>';
    inherits: true;
    initial-value: 0deg;
}
```

Va aggiunto solo dove esiste un caso reale di custom property animata (da verificare nei componenti `move-3d`/`canvas`/`mouse-trail` prima di applicarlo ovunque — non ha senso tipizzare variabili puramente strutturali come `--gap-size`).

> ⚠️ **Tentato e revertito su `.c-move3d-item` (2026-07-02) — bug Firefox.**
> Applicato `@property --item-width/--item-height/--offset-x/--offset-y { syntax: '<length>'; initial-value: 0px; }` come fallback di sicurezza (non per animazione: il movimento 3D è pilotato via JS/`MobTween`, non transition CSS).
> Causava il collasso a dimensione 0 di tutti gli elementi `.c-move3d-item` **su Firefox**, anche con JS funzionante. Causa: `get3dItemUnit()` in `component/common/move-3d/utils.js` non passa mai un `<length>` semplice, ma un'espressione `min(240px, calc((((100vw) * 240) / 1600)))`. Firefox rifiuta questa espressione annidata come `<length>` valido in fase di validazione di una registered property, e un valore che fallisce la validazione **non viene ignorato** — collassa a `initial-value`, qui 0px. Chrome è più permissivo e non mostrava il problema.
> **Lezione:** `@property` con `syntax: '<length>'` è sicuro solo se il valore reale scritto da JS è un length "semplice" (`Npx`, `Nrem`...). Se il valore è generato dinamicamente con `calc()`/`min()`/`clamp()` annidati, verificare il comportamento su Firefox prima di tipizzare — o usare `syntax: '*'` (nessuna validazione, solo per abilitare l'animazione, senza il beneficio del fallback tipizzato).

---

## Priorità suggerita

1. **Normalize → reset moderno** (punto 4): basso rischio, beneficio immediato, nessuna dipendenza da altri refactor.
2. **`@container` sui componenti più riusati** (punto 1): da introdurre quando si tocca un componente che già mostra il problema (stesso componente in contesti di larghezza diversa).
3. **`:has()`** (punto 2): opportunistico, da valutare file per file quando si tocca quel componente.
4. **`clamp()` per la tipografia fluida** (punto 3): refactor più ampio, va pianificato a parte perché tocca `abstract/function.scss` e `abstract/mixins.scss`.
5. **`light-dark()`** (punto 6) e **`@property`** (punto 7): solo se emergono problemi concreti (flash del tema, animazioni a scatti).

---

## ✅ Changelog — fatto

- **`color-mix()` al posto delle variabili `-rgb` parallele.** Convertite tutte le 24 occorrenze `rgba(var(--*-rgb), N)` in `color-mix(in oklch, var(--*) N%, transparent)` e rimosse le 8 definizioni `--*-rgb` da `general/base.scss` (inclusa `--grey-200-rgb`, mai usata).
- **Palette convertita in `oklch()`.** Tutti i 22 token colore in `general/base.scss` (tema `light`, tema `dark`, `--immutable-*`) sono ora definiti in oklch, con l'hex originale lasciato come commento di riferimento. Conversione verificata con round-trip lossless (oklch → hex torna identico all'originale) tramite la matrice OKLab standard.
- **`color-mix()` allineato a `in oklch`.** Le 24 occorrenze (inclusa `--line`) usano ora `color-mix(in oklch, ...)` invece di `in srgb`, coerente con lo spazio colore della palette.
