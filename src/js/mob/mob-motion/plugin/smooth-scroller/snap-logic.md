## Logica complessiva del Soft Snap

Il sistema implementa uno snap predittivo non invasivo progettato per accompagnare l'utente verso punti di ancoraggio predefiniti senza forzare il controllo. A differenza di uno snap rigido (che aggancia immediatamente), questo meccanismo interpreta l'intenzione attraverso l'analisi della velocity di scroll.

## Il flusso operativo si articola in tre fasi:
### Accumulo e Valutazione:
Durante l'interazione (wheel, drag o touch), il sistema calcola in tempo reale la velocity del movimento, normalizzata per frame rate, densità di pixel e risoluzione schermo. Questo valore rappresenta la "decisione" dell'utente: una velocity superiore alla soglia (3) indica intenzione direzionale chiara.

### Triggering Condizionato:
Quando l'input cessa (rilascio del dito, fine inerzia della rotella o debounce del wheel), il sistema valuta se attivare lo snap. Lo snap si attiva solo se: (a) la velocity finale è sufficientemente alta da indicare slancio, e (b) esiste un punto di snap nella direzione del movimento. Se l'utente si muove lentamente (velocity < 3), il sistema interpreta questo come "esplorazione fine" e non interviene, permettendo posizionamenti liberi tra i punti.

### Gestione dell'Inerzia:
Una volta attivato, il motore fisico (lerp o spring) guida l'elemento verso il target. Durante questa fase, l'input utente rimane in ascolto: un nuovo scroll immediato interrompe l'animazione corrente (se la velocity è sufficiente) per dare priorità all'intenzione umana, creando un'esperienza "interrompibile" che non combatte contro l'utente.

<hr/>

## Layer di Sicurezza (Defense in Depth)
Per gestire la frammentazione degli input hardware (Magic Mouse ad alta inerzia, trackpad con momentum, mouse tradizionali a scatti), il sistema implementa una difesa stratificata che opera su scale temporali diverse:

#### Layer 1 - Stato di Congelamento (freezeSnap)
Un flag booleano che indica "snap in animazione". Quando attivo, blocca in calculateValue() l'elaborazione di nuovi valori target, isolando la fase di animazione dall'input grezzo. Questo stato viene interrotto immediatamente su nuovo input utente in scheduleCurrentSnap() — indipendentemente dalla velocity — per garantire che l'utente possa sempre "prendere il controllo". Tuttavia, l'attivazione di un nuovo snap dopo l'interruzione è subordinata al Layer 2 (velocity > 3). In sostanza: l'interruzione è un diritto immediato, il nuovo snap è un privilegio condizionato.

#### Layer 2 - Soglia di Intenzione (Velocity Threshold)
Gatekeeper numerico che determina l'attivazione dello snap in #goToNextSnap(). Calcolato come variazione di posizione normalizzata per il tempo trascorso (con correzione per frame rate), distingue l'"esplorazione fine" (velocity ≤ 3) dallo "slancio direzionale" (velocity > 3). Solo il secondo caso autorizza il sistema a calcolare e raggiungere il prossimo punto di ancoraggio. Questo permette movimenti lenti e precisi (es. aggiustamenti al pixel) senza interferenze forzate del sistema.

#### Layer 3 - Cooldown Post-Snap (100ms)
Una finestra temporale rigida che protegge l'integrità del target durante l'esecuzione di uno snap. Quando lo snap si attiva (lastSnapTime = now), il sistema blocca per 100ms l'elaborazione di nuovi valori in calculateValue(), indipendentemente dal fatto che arrivino eventi wheel (fantasma o reali).<br/><br/>
Questo layer non previene "snap concatenati" — impossibile fisiologicamente in 100ms — ma garantisce che lo snap corrente raggiunga esattamente il punto di ancoraggio calcolato inizialmente. Senza questa protezione, un evento residuo di inerzia hardware (tipico di trackpad Mac o Magic Mouse) modificherebbe #endValue durante l'animazione, deviando il target da "punto A → punto B" a "punto A → punto B + delta involontario". Il cooldown assicura che, una volta decisa la destinazione, il viaggio si compia senza deviazioni di rotta causate dall'elettronica di input.

#### Layer 4 - Debounce Dinamico (1500ms / FPS)
Timer di persistenza dello stato dinamico, calibrato sul frame rate corrente. La velocity viene calcolata istantaneamente ad ogni evento in #setVelocity(), ma senza questo meccanismo verrebbe resettata a 1 (stato "fermo") tra eventi ravvicinati. Il debounce, cancellandosi e rischedulandosi ad ogni nuovo input, impedisce questo reset durante sequenze continue (tipiche del trackpad con momentum), mantenendo "viva" la memoria dell'azione in corso. Solo quando l'input cessa per un intervallo significativo — normalizzato per il refresh rate del display — il sistema considera l'utente effettivamente fermo e azzera lo stato.

#### Interazione tra i Layer
Questi meccanismi operano in cascata: il Layer 4 gestisce il "tra gli eventi" (micro-tempo), il Layer 2 valuta l'intenzione, il Layer 3 blocca l'inerzia residua post-trigger, e il Layer 1 gestisce lo stato interno durante l'animazione. L'utente veloce che interrompe uno snap agisce su Layer 1 (interruzione), mentre l'utente lento che esplora agisce su Layer 2 (filtraggio). L'inerzia hardware indesiderata viene fermata ai Layer 3 e 4.
