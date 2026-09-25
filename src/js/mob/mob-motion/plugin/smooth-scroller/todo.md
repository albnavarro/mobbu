### TEST semplificazione di setVelocity

Eliminiamo `threshold`
`diffTime <= threshold` nella condizione sembra ridondante, dovrebbe essere giá gestito dal debounce.

```javascript

// dovrebbe essere giá gestito dal debounce, quando `scade` resetta la velocitá.
if (diffTime > threshold) {
    this.#velocity = 1;
}
```


```javascript

#setVelocity() {
    const time = MobCore.getTime();
    const diffTime = time - this.#previousTime;

    /**
     * DiffEndValue al cambio di direzione genera un valore molto piccolo ( cambio segno ) per cui la velocitá sará
     * 1.
     */
    const diffEndValue = this.#endValue - this.#previousEndValue;

    /**
     * - Calcola la direzione dello scroll.
     * - Il risultato è sempre 1 (avanti) o -1 (indietro)
     * - #setVelocity() viene invocata esclusivamente da #updateScrollState(), che a sua volta è triggerata solo da
     *   input utente reale (wheel, drag, touch).
     * - In tutti questi casi #endValue è già stato modificato, quindi diffEndValue non può mai essere 0 in condizioni
     *   normali.
     */
    this.#scrollDirection = Math.sign(diffEndValue);

    /**
     * Arriviamo da uno scorrimento continuo.
     *
     * - Il check su diffEndValue ( valore attuale e precedente uguale ) é necessario perché:
     * - 1. Drag con movimento < 0.5px (arrotontato a 0 da Math.round())
     * - 2. Scroll oltre i limiti (clamp blocca il valore)
     */
    if (diffEndValue !== 0) {
        /**
         * Normalizza diffTime a un baseline di 60fps
         *
         * - Su display ad alto refresh rate (120Hz, 144Hz) gli eventi arrivano con diffTime più basso.
         * - Gonfiando artificialmente la velocity.
         * - Math.max porta diffTime ad almeno 16.67ms, equiparando la velocity a quella che si avrebbe a 60fps.
         * - Per eventi meno frequenti (mouse wheel, ~80-100ms) diffTime è già maggiore del baseline, quindi non viene
         *   alterato.
         */
        const baselineInterval = 1000 / 60;
        const normalizedDiffTime = Math.max(diffTime, baselineInterval);
        const vv = diffEndValue / normalizedDiffTime;

        /**
         * Velocitá instantanea
         */
        const newVelocity =
            Math.round((Math.abs(vv) + 1) * 10_000) / 10_000;

        /**
         * Media pesata della velocitá precedente e istantanea.
         *
         * - Questo evitá che lo snap scatti direttamente sui picchi.
         * - Smorziamo il picco in modo che:
         * - Lo snap non scatti su un singolo picco
         * - Lo snap scatterá quando abbiamo una sequenza temporale di eventi veloci.
         *
         * Esempio pratico:
         *
         * - NewVelocity: 4.6, 4.6
         * - This.#velocity: 2.44, 3.304
         *
         * EMA ( Exponential Moving Average ):
         *
         * - Media mobile che dá piu peso ai valori recenti tramite un fattore di smoothing.
         */
        this.#velocity = Math.max(
            1,
            this.#velocityEasing * newVelocity +
                (1 - this.#velocityEasing) * this.#velocity
        );
    }

    this.#previousTime = time;
    this.#previousEndValue = this.#endValue;
}
```
