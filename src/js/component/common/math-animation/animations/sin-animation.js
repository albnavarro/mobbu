import { outerHeight, outerWidth } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathSin = ({ targets, container } = {}) => {
    if (!targets || !container)
        return {
            play: () => {},
            resume: () => {},
            stop: () => {},
            destroy: () => {},
        };

    let tween = MobTween.createTimeTween({
        ease: 'easeLinear',
        stagger: { each: 6 },
        data: { x: 0 },
    });

    const itemHeight = outerHeight(targets[0]);
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
    const itemHalfHeight = itemHeight / 2;

    /**
     * Il target parte del centro, aggistiamo il valore per partire da sinistra.
     */
    const xAxisAdjustValue = -itemHalfHeight - distance / 2;

    targets.forEach((item) => {
        let previousX = 0;

        tween.subscribeCache(item, ({ x }) => {
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

            item.style.transform = `translate3D(0px,0px,0px) translate(${x + xAxisAdjustValue}px, ${y - itemHalfHeight}px)`;
            previousX = x;
        });
    });

    let timeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        forceFromTo: false,
        autoSet: false,
    });

    timeline.goTo(
        tween,
        { x: distance },
        {
            duration,
        }
    );

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

            // @ts-ignore
            tween = null;

            // @ts-ignore
            timeline = null;

            // @ts-ignore
            targets = null;
        },
    };
};
