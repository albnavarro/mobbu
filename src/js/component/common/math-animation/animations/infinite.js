import { MobCore } from '@mobCore';
import { outerHeight, outerWidth } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathInfinite = ({ targets, container, canvas } = {}) => {
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
     * Simulazione della Lemniscata di Bernoulli (∞).
     */

    const halfTagetHeight = outerHeight(targets[0]) / 2;

    /**
     * Ampiezza orizzontale del simbolo dell'infinito (metà larghezza del container - margine)
     */
    const xAmplitude = outerWidth(container) / 2 - 100;

    /**
     * Ampiezza verticale del simbolo dell'infinito
     */
    const yAmplitude = outerHeight(container);

    /**
     * Durata interna del tween (unità di tempo virtuali). Questo valore viene poi proporzionalmente scalato alla durata
     * reale della timeline (3000ms).
     */
    const duration = 10;

    /**
     * Fattore di attrito/scala per convertire il tempo in radianti.
     *
     * Divide per 2π per completare un ciclo dell'infinito durante la durata.
     *
     * Friction = durata / (2π) ≈ durata / 6.28
     *
     * Questo converte il progresso temporale (x) in angoli (val) per le equazioni parametriche.
     */
    const timeUnitsPerRadian = duration / 2 / Math.PI;

    let tween = MobTween.createSequencer({
        stagger: { each: 5 },
        data: { x: duration / 4, opacity: 1 },
        duration,
    })

        /**
         * Anima x da duration/4 (2.5) a duration + duration/4 (12.5) in modo lineare.
         *
         * Questo fa percorrere più di un ciclo completo per garantire continuità.
         */
        .goTo(
            { x: duration + duration / 4 },
            { start: 0, end: duration, ease: 'easeLinear' }
        )
        .goTo({ opacity: 0 }, { start: 0, end: 2.5, ease: 'easeOutQuad' })
        .goTo({ opacity: 1 }, { start: 2.5, end: 5, ease: 'easeInQuad' })
        .goTo({ opacity: 0 }, { start: 5, end: 7.5, ease: 'easeOutQuad' })
        .goTo({ opacity: 1 }, { start: 7.5, end: 10, ease: 'easeInQuad' });

    targets.forEach((item) => {
        tween.subscribeCache(item, ({ x, opacity }) => {
            /**
             * EQUAZIONI PARAMETRICHE DELLA LEMNISCATA DI BERNOULLI (simbolo ∞)
             *
             * Converte il tempo (x) in un angolo (angle) dividendo per timeUnitPerRadian.
             *
             * `angleInRadian` rappresenta l'angolo in radianti che cresce linearmente nel tempo.
             */
            const angleInRadian = x / timeUnitsPerRadian;

            /**
             * DistanceFromCenter è il denominatore comune delle equazioni parametriche.
             *
             * Formula: r = a / √(2 - cos(2θ)) Semplificata: distanceFromCenter = 2 / (3 - cos(2 * angleInRadian))
             *
             * Questo fattore modula la distanza dal centro creando i due lobi del simbolo ∞.
             */
            const distanceFromCenter = 2 / (3 - Math.cos(2 * angleInRadian));

            /**
             * Coordinata X della lemniscata: x(t) = distanceFromCenter × cos(angleInRadian) × xAmplitude
             *
             * - DistanceFromCenter: modula la distanza radiale
             * - Cos(angleInRadian): movimento orizzontale oscillante
             * - XAmplitude: scala l'ampiezza orizzontale
             */
            const xr =
                distanceFromCenter * Math.cos(angleInRadian) * xAmplitude;

            /**
             * Coordinata Y della lemniscata: y(t) = (distanceFromCenter × sin(2×angleInRadian) / 2) × yAmplitude
             *
             * - Sin(2×angleInRadian): crea l'oscillazione verticale con doppia frequenza
             * - / 2: riduce l'ampiezza verticale per bilanciare la forma
             * - DistanceFromCenter: modula la distanza radiale
             * - YAmplitude: scala l'ampiezza verticale
             *
             * Il sin(2×angleInRadian) è fondamentale: crea i due lobi simmetrici del simbolo ∞
             */
            const yr =
                ((distanceFromCenter * Math.sin(2 * angleInRadian)) / 2) *
                yAmplitude;

            /**
             * Applica la trasformazione centrando l'elemento:
             *
             * - Sottrae halfTagetHeight per centrare sia orizzontalmente che verticalmente
             * - I target partono già centrati (position: absolute al centro)
             */
            item.style.transform = `translate3D(0px,0px,0px) translate(${xr - halfTagetHeight}px, ${yr - halfTagetHeight}px)`;
            item.style.opacity = `${opacity}`;
        });
    });

    let timeline = MobTimeline.createSyncTimeline({
        repeat: -1,
        yoyo: false,
        duration: 3000,
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

        /**
         * Setup line.
         */
        ctx.setLineDash([2, 5, 2, 5]);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        /**
         * Disegna la lemniscata come linea continua
         */
        for (let index = 0; index <= numPoints; index++) {
            const angleInRadian = (index / numPoints) * 2 * Math.PI;
            const distanceFromCenter = 2 / (3 - Math.cos(2 * angleInRadian));
            const x = distanceFromCenter * Math.cos(angleInRadian) * xAmplitude;
            const y =
                ((distanceFromCenter * Math.sin(2 * angleInRadian)) / 2) *
                yAmplitude;

            if (index === 0) {
                ctx.moveTo(centerX + x, centerY + y);
            } else {
                ctx.lineTo(centerX + x, centerY + y);
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
