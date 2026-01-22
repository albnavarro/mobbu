import { MobCore } from '@mobCore';
import { outerHeight, outerWidth } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathSin = ({ targets, container, canvas } = {}) => {
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

    const distance = outerWidth(container) - 200;

    /**
     * Ampiezza dell' onda.
     */
    const amplitude = outerHeight(container) / 3;

    /**
     * Numero di cicli desiderati.
     */
    const cycles = 2;

    /**
     * Questa calcola quanto spazio in pixel occupa un radiante.
     *
     * - PixelsPerRadian = pixel per 1 radiante.
     * - PixelsPerRadian × 2π = pixel per 1 ciclo completo dell'onda ( 0 -> 1 -> 0 -> -1 -> 0 ).
     *
     * Un radiante è l'angolo che si forma al centro di un cerchio quando l'arco è lungo quanto il raggio, dunque
     * parliamo di cerchi.
     *
     * - Math.sin() e Math.cos() ragionano in radianti non in gradi.
     * - Un cerchio completo = 360° = 2π radianti (≈ 6.28 radianti).
     * - Mezzo cerchio = 180° = π radianti (≈ 3.14 radianti).
     * - Quarto di cerchio = 90° = π/2 radianti (≈ 1.57 radianti).
     */
    const pixelsPerRadian = distance / (2 * Math.PI * cycles);
    const duration = 1500 * cycles;

    /**
     * Ogni target ha una grandezza diversa, é necessario che ogni target faccia riferimento alla propia dimensione per
     * allinearsi esattamante al canvas background.
     */
    const halfTagetsHeight = targets.map((target) => outerHeight(target) / 2);

    let tween = MobTween.createSequencer({
        ease: 'easeLinear',
        stagger: { each: 6 },
        data: { x: 0, scale: 0 },
    })
        .goTo({ x: distance }, { start: 0, end: 10, ease: 'easeLinear' })
        .goTo(
            { scale: 1 },
            { start: 0, end: 10 / cycles / 2, ease: 'easeOutQuad' }
        )
        .goTo(
            { scale: 0 },
            { start: 10 - 10 / cycles / 2, end: 10, ease: 'easeOutQuad' }
        );

    targets.forEach((item, index) => {
        let previousX = 0;

        const innerElement = /** @type {HTMLSpanElement} */ (item.firstChild);

        /**
         * Il target parte del centro, aggistiamo il valore per partire da sinistra.
         */
        const xAxisAdjustValue = -halfTagetsHeight[index] - distance / 2;

        tween.subscribeCache(({ x, scale }) => {
            /**
             * Inverte l'onda quando il movimento va all'indietro Math.sign() ritorna -1 | 0 | 1.
             */
            const direction = Math.sign(x - previousX) || 1;

            /**
             * Quanti radianti ho percorso rispetto a pixelsPerRadian?
             *
             * `x / pixelsPerRadian` -> Converte la distanza da px a radianti ( proporzione ).
             *
             * - `x` = spazio percorso.
             * - `x : pixelsPerRadian = ? : 1`
             * - Math.sin() -> converte in un valore tra -1 e 1 ( oscilla tra -1 e 1 ogni 2π radianti ).
             * - Amplitude -> gestisce la dimensione dell' onda.
             */
            const y = Math.sin(x / pixelsPerRadian) * amplitude * direction;

            item.style.transform = `translate3D(0px,0px,0px) translate(${x + xAxisAdjustValue}px, ${y - halfTagetsHeight[index]}px)`;
            if (innerElement) innerElement.style.scale = `${scale}`;
            previousX = x;
        });
    });

    let timeline = MobTimeline.createSyncTimeline({
        repeat: -1,
        yoyo: true,
        duration: duration,
    }).add(tween);

    /**
     * Draw canvas background line.
     */
    function draw() {
        if (!ctx || !canvas) return;

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        /**
         * Numero di punti per disegnare la linea (più punti = linea più liscia)
         */
        const numPoints = 200;
        const totalPoints = numPoints * 2;

        /**
         * Setup line.
         */
        ctx.setLineDash([2, 5, 2, 5]);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        /**
         * Forward line
         */
        for (let index = 0; index <= totalPoints; index++) {
            const { x, y } = (() => {
                /**
                 * Sinusoide positive andata.
                 */
                if (index <= numPoints) {
                    const x = (index / numPoints) * distance;
                    const y = Math.sin(x / pixelsPerRadian) * amplitude;

                    return {
                        x,
                        y,
                    };
                }

                /**
                 * Sinusoide negative andata.
                 */
                if (index > numPoints) {
                    const reverseIndex = totalPoints - index;
                    const x = (reverseIndex / numPoints) * distance;
                    const y = Math.sin(x / pixelsPerRadian) * amplitude * -1;

                    return {
                        x,
                        y,
                    };
                }

                return {
                    x: 0,
                    y: 0,
                };
            })();

            if (index === 0) {
                ctx.moveTo(centerX + x - distance / 2, centerY + y);
            } else {
                ctx.lineTo(centerX + x - distance / 2, centerY + y);
            }
        }

        ctx.stroke();
        // ctx.setLineDash([]);
    }

    const unsubscribeResize = MobCore.useResize(() => {
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
