import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

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
     * Angolo totale da percorrere per completare la curva La curva si ripete ogni 2π * denominator radianti
     */
    const totalAngle = 2 * Math.PI * denominator;

    /**
     * Timeline duration.
     */
    const durationparsed = duration * denominator;

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

    while (true) {
        const angle = (Math.PI / 2 + iteration * Math.PI) / k;

        if (angle > totalAngle) break;

        if (angle >= 0) {
            zeroAngles.push(angle);
        }

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

        tween.subscribeCache(item, ({ angleInRadian, scale }) => {
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
        ctx.setLineDash([2, 5, 2, 5]);
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
