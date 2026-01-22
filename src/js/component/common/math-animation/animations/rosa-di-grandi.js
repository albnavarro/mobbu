import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/**
 * Calcola la lunghezza effettiva della curva Rosa di Grandi tramite approssimazione numerica.
 *
 * Poiché la lunghezza di una curva polare r = a × cos(k × θ) richiede un integrale complesso senza soluzione analitica
 * semplice:
 *
 * L = ∫₀^(2π×d) √[r² + (dr/dθ)²] dθ
 *
 * Usiamo il metodo della "somma delle distanze euclidee":
 *
 * 1. Dividiamo la curva in `steps` segmenti (default 10000 per precisione)
 * 2. Per ogni segmento, calcoliamo le coordinate cartesiane (x, y) del punto convertendo da coordinate polari (r, θ)
 * 3. Calcoliamo la distanza euclidea tra punti consecutivi: √[(x₁-x₀)² + (y₁-y₀)²]
 * 4. Sommiamo tutte le distanze per ottenere la lunghezza totale approssimata
 *
 * Più alto è il numero di steps, più preciso è il calcolo (ma più costoso computazionalmente). Con 10000 steps l'errore
 * è trascurabile per scopi di animazione.
 *
 * @param {number} maxRadius - Raggio massimo della curva (parametro 'a' nella formula)
 * @param {number} k - Rapporto numeratore/denominatore (controlla il numero di petali)
 * @param {number} totalAngle - Angolo totale da percorrere (2π × denominatore)
 * @param {number} steps - Numero di segmenti per l'approssimazione (default: 10000)
 * @returns {number} Lunghezza totale della curva in pixel
 */
function calculateCurveLength(maxRadius, k, totalAngle, steps = 2000) {
    let length = 0;

    /**
     * Punto iniziale: quando θ=0, r=maxRadius×cos(0)=maxRadius
     */
    let prevX = maxRadius;
    let prevY = 0;

    for (let i = 1; i <= steps; i++) {
        const angle = (totalAngle / steps) * i;
        const radius = maxRadius * Math.cos(k * angle);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const dx = x - prevX;
        const dy = y - prevY;
        length += Math.hypot(dx, dy);

        prevX = x;
        prevY = y;
    }

    return length;
}

/**
 * Calcola il Massimo Comun Divisore (MCD/GCD) tra due numeri usando l'algoritmo di Euclide.
 *
 * L'algoritmo di Euclide è un metodo efficiente per trovare il più grande numero intero che divide entrambi i numeri
 * senza lasciare resto.
 *
 * Funzionamento:
 *
 * 1. Se il divisore è 0, il MCD è il dividendo
 * 2. Altrimenti, calcola ricorsivamente MCD(divisore, resto della divisione)
 *
 * Esempio: gcd(48, 18)
 *
 * - 48 % 18 = 12 -> gcd(18, 12)
 * - 18 % 12 = 6 -> gcd(12, 6)
 * - 12 % 6 = 0 -> gcd(6, 0)
 * - Risultato: 6
 *
 * @param {number} dividendo - Il primo numero (più grande o uguale)
 * @param {number} divisore - Il secondo numero
 * @returns {number} Il Massimo Comun Divisore
 */
const gcd = (dividendo, divisore) =>
    divisore === 0 ? dividendo : gcd(divisore, dividendo % divisore);

/**
 * Calcola il periodo minimo necessario per completare la curva.
 *
 * Per una rosa di Grandi r = a × cos(k × θ) con k = n/d (frazione ridotta):
 *
 * - La curva ha n petali se n è dispari, 2n petali se n è pari
 * - Il periodo completo è sempre 2π × d (denominatore della frazione ridotta)
 *
 * Questo assicura di disegnare la curva completa una sola volta.
 *
 * @param {number} numerator - Numeratore della frazione k
 * @param {number} denominator - Denominatore della frazione k
 * @returns {number} Angolo minimo per completare la curva
 */
function getMinimalPeriod(numerator, denominator) {
    /**
     * Calcola il MCD per ridurre la frazione
     */
    const divisor = gcd(numerator, denominator);
    const d = denominator / divisor;

    /**
     * Il periodo è sempre 2π × denominatore (ridotto)
     */
    return 2 * Math.PI * d;
}

/** @type {import('./type').MathCommonAnimation} */
export const mathRosaDiGrandi = (
    { targets, container, canvas } = {},
    ...args
) => {
    /** @type {number[]} */
    const [numerator, denominator, duration, staggerEach] = args;

    if (!targets || !container || !canvas)
        return {
            play: () => {},
            resume: () => {},
            stop: () => {},
            destroy: () => {},
        };

    let ctx = canvas.getContext('2d', {
        alpha: true,
        willReadFrequently: false,
    });

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Raggio massimo della curva
     */
    const maxRadius = (outerHeight(container) - 100) / 2;

    /**
     * Parametri della rosa: k = numerator/denominator r = cos(kθ)
     */
    const k = numerator / denominator;

    /**
     * Calcola il periodo minimo per evitare di disegnare la curva più volte. Con [2,2], [6,6] ecc. evita
     * sovrapposizioni che rendono il tratteggio continuo.
     */
    const totalAngle = getMinimalPeriod(numerator, denominator);

    /**
     * Timeline duration.
     */
    const curveLength = calculateCurveLength(maxRadius, k, totalAngle);
    const durationparsed = duration * (curveLength / maxRadius);

    /**
     * Ogni target ha una grandezza diversa, é necessario che ogni target faccia riferimento alla propia dimensione per
     * allinearsi esattamante al canvas background.
     */
    const halfTagetsHeight = targets.map((target) => outerHeight(target) / 2);

    let tween = MobTween.createSequencer({
        ease: 'easeLinear',
        stagger: { each: staggerEach },
        data: { angleInRadian: 0, scale: 1 },
    }).goTo(
        { angleInRadian: totalAngle },
        { start: 0, end: 10, ease: 'easeLinear' }
    );

    /**
     * Get points when target passes through the center.
     */
    const zeroAngles = [];
    let iteration = 0;
    let angle = 0;

    while (angle < totalAngle && totalAngle > 0 && k > 0) {
        angle = (Math.PI / 2 + iteration * Math.PI) / k;
        if (angle >= 0) zeroAngles.push(angle);
        iteration++;
    }

    /**
     * Use to get timeGap.
     */
    let lastTimePosition = 0;

    /**
     * Converti angoli radianti in posizioni temporali (0-10)
     */
    zeroAngles.forEach((angleRad) => {
        /**
         * Mappa l'angolo da [0, totalAngle] a [0, 10]
         */
        const timePosition = (angleRad / totalAngle) * 10;

        const timeGap = Math.abs((timePosition - lastTimePosition) / 2);
        lastTimePosition = timePosition;

        const start = Math.max(0, timePosition - timeGap);
        const center = timePosition;
        const end = Math.min(10, timePosition + timeGap);

        if (end > start) {
            tween.goTo(
                { scale: 0 },
                { start, end: center, ease: 'easeInQuad' }
            );
            tween.goTo(
                { scale: 1 },
                { start: center, end, ease: 'easeOutQuad' }
            );
        }
    });

    targets.forEach((item, index) => {
        const innerElement = /** @type {HTMLSpanElement} */ (item.firstChild);

        tween.subscribeCache(({ angleInRadian, scale }) => {
            /**
             * ROSA DI GRANDI Formula: r = a * cos(k * θ)
             *
             * - MaxRadius: ampiezza massima della curva
             * - K: numerator/denominator
             * - Θ: angolo corrente in radianti
             */
            const radius = maxRadius * Math.cos(k * angleInRadian);

            /**
             * Conversione da coordinate polari (r, θ) a cartesiane (x, y)
             */
            const x = radius * Math.cos(angleInRadian);
            const y = radius * Math.sin(angleInRadian);

            item.style.transform = `translate3D(0px,0px,0px) translate(${x - halfTagetsHeight[index]}px, ${y - halfTagetsHeight[index]}px)`;
            if (innerElement) innerElement.style.scale = `${scale}`;
        });
    });

    let timeline = MobTimeline.createSyncTimeline({
        repeat: -1,
        yoyo: false,
        duration: durationparsed,
    }).add(tween);

    /**
     * Draw canvas background line.
     */
    function draw() {
        if (!ctx || !canvas) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const steps = 2000 * denominator; // Più passi per curve complesse

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setLineDash([3, 7]);
        ctx.lineDashOffset = 3;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let index = 0; index <= steps; index++) {
            const angle = (totalAngle / steps) * index;

            /**
             * ROSA DI GRANDI Formula: r = a * cos(k * θ)
             */
            const radius = maxRadius * Math.cos(k * angle);

            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            if (index === 0) {
                // Se siamo troppo lontani dall'ultimo punto, muoviamo il pennello
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    draw();

    return {
        play: () => {
            timeline.play();
        },
        resume: () => {
            timeline.resume();
        },
        stop: () => {
            timeline.pause();
        },
        destroy: () => {
            timeline.stop();
            tween.destroy();
            timeline.destroy();
            unsubscribeResize();

            // @ts-ignore
            ctx = null;

            // @ts-ignore
            tween = null;

            // @ts-ignore
            timeline = null;

            // @ts-ignore
            targets = null;
        },
    };
};
