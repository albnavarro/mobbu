import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathRosaDiGrandi = (
    { targets, container, canvas } = {},
    ...args
) => {
    /** @type {number[]} */
    const [numerator, denominator] = args;

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
     * Calcolo del numero di petali:
     *
     * - Se numerator e denominator sono entrambi dispari → numerator petali
     * - Altrimenti → 2 * numerator petali
     */
    const isNumeratorOdd = numerator % 2 !== 0;
    const isDenominatorOdd = denominator % 2 !== 0;
    const numberOfPetals =
        isNumeratorOdd && isDenominatorOdd ? numerator : 2 * numerator;

    /**
     * Angolo totale da percorrere per completare la curva La curva si ripete ogni 2π * denominator radianti
     */
    const totalAngle = 2 * Math.PI * denominator;

    /**
     * Timeline duration.
     */
    const duration = 3000 * denominator;

    /**
     * Ogni target ha una grandezza diversa, é necessario che ogni target faccia riferimento alla propia dimensione per
     * allinearsi esattamante al canvas background.
     */
    const halfTagetsHeight = targets.map((target) => outerHeight(target) / 2);

    let tween = MobTween.createSequencer({
        ease: 'easeLinear',
        stagger: { each: 6 },
        data: { angleInRadian: 0, scale: 0 },
    })
        .goTo(
            { angleInRadian: totalAngle },
            { start: 0, end: 10, ease: 'easeLinear' }
        )
        .goTo({ scale: 1 }, { start: 0, end: 4, ease: 'easeOutQuad' })
        .goTo({ scale: 0 }, { start: 9, end: 10, ease: 'easeOutQuad' });

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
        duration,
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

        // Aggiungiamo informazioni testuali sulla curva
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(
            `Rose curve: r = cos(${numerator}/${denominator} * θ)`,
            20,
            30
        );
        ctx.fillText(`Petals: ${numberOfPetals}`, 20, 50);
        ctx.fillText(`Total angle: ${totalAngle.toFixed(2)} rad`, 20, 70);
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
