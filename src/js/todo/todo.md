## handleVelocity upgrade:

#### Distanza percorsa (start -> end)
   - Somma cumulativa di Math.hypot(diffX, diffY) (o Manhattan).
   - Resetta a ogni nuovo start (dopo debounce).
   - Esporta valore nel callback finale o in tempo reale.

#### Previsione posizione breve termine (~100ms)
   - Estrapola da velocità corrente: `predictedX = currentX + velocityX * time`
   - Usa valori già smussati dal MobSpring.
   - Costo O(1), beneficio: precaricamento, anticipazione UI.


## NEW: handleGeometry (analisi geometrica).
   - Si appoggia a `handleVelocity` come `handleVelocity` si appoggia a `usePointerMove`.

#### Input necessari:
   - Velocità (speed, speedX, speedY) da handleVelocity.
   - Posizioni assolute (clientX, clientY): espandere output handleVelocity.

#### Curvatura / raggio:
   - Rilevare quando l'utente sta "curvando" vs andando dritto
   - Anticipare la destinazione in navigazioni a traiettoria
   - Effetti visivi che seguono l'arco del movimento, non solo la direzione istantanea

#### Pattern semplificati:
   - `Zig-zag rapido`: gesture di cancellatura o "indietro"
   - `Cerchio`: selezione radiale, attivazione menu contestuale
   - `Linea retta prolungata`: intenzionalità, "sto andando da quella parte"

#### Riconoscimento gesture
   - Distinguere "flick" (veloce, breve, rettilineo) da "trascinamento" (più lento, lungo)
   - `Shake`: sequenza rapida di inversioni direzione
   - `Hold and release`: combinazione stabilità + distanza percorsa post-movimento

#### Contesto temporale
   - Analisi su finestre scorrevoli (ultimi 300-500ms)
   - Non istantanea, ma neanche troppo storica

#### Esempio concreto:
   - Slider con inertia: velocità alta + linea retta = scroll fluido. Velocità alta + curvatura = frena, l'utente sta correggendo.

# App
#### Passare il css a `@scope`.

# MobCore

#### Store - watcher structure:
- `unsubscribeBindInstance` portare la logica a O(1).

# MobJs

#### Repat proxi
- il `proxi` repeater potrebbe tornare un oggetto `frezzed` per evutare accidentali mutazioni.

#### New Observe props.
- `observe` nei nelle funzioni interne dovrebbe diventare `observedState` per una migliore leggibilitá.

#### Routing:
- Rendere opzionale il blocco sul caricamento della stessa rotta.

#### src/js/mob/mob-js/parse/steps/get-params-from-web-component.js
- Parent id ternario innestato, semplificare.
- Idealmante con `weakElementMap` si puó usare solo una strategia.

#### Sanitize
- Aggiungere una `callBack` per fare un parsing dell' `html` prima di appenderlo al `DOM` con librerie esterne.

#### attributeChangedCallback
- In riferimento agli `stati esportabili`, `attributeChangedCallback` puo intereccettare se l'atributo é uno stato e automaticamante eseguire un `this.#params.setState(state, <val>)`.
- Detect della props:
    - i `word-word` dovranno essere convertiti in `wordWord` per combaciare con lo stato. es, `isLoading` sará scritto come `is-loading` attributo nel `dom`.
    - Fare un controllo `ignore-case`. la prop `isLoading` sará usata come attributo `isloading`.

- Bisognerá fare un lavoro sui tipi, arriveranno tutte `string` ma prima del set venno convertite nel giusto tipo, per fare questo lavoro bisogna accedere all' oggetto `type` delle store.

#### Quickset
- Aggiungere `Quickset`.

#### Debug
- Add `debug` ( params in componentFunction ) in DOCS.

# Mobmotion

#### Docs: AsyncTimeline
- Breve riassunto con lista puntata delle feature.

#### MobScroller
- Il valore `gap` ( detectViewPortInterception() ), deve essere regolabile dall' esterno.

#### SetTween.
- Se chiamato durante un add / addAsync puó generare un errore, ( da verificare che questa condizione sia giusta ) ???

