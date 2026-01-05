import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathArchimede = ({ targets, container, canvas } = {}) => {
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
     * Raggio massimo della spirale (1 quarto della distanza per centrare)
     */
    const maxRadius = (outerHeight(container) - 100) / 2;

    /**
     * Numero di cicli completi della spirale
     */
    const cycles = 3;

    /**
     * Angolo totale da percorrere (cycles cicli completi) in radianti.
     */
    const totalAngle = 2 * Math.PI * cycles;

    /**
     * Raggio iniziale (a nella formula r = a + b * θ) impostato a 0 per partire dal centro.
     */
    const initialRadius = 0;

    /**
     * Costante di crescita del raggio (b nella formula della spirale di Archimede: r = a + b*θ)
     *
     * - `r` = raggio corrente
     * - `a` = raggio iniziale (distanza dal centro all'inizio)
     * - `b` = velocità di crescita del raggio (questa variabile)
     * - `Θ` = angolo corrente in radianti
     *
     * Quanto cresce il raggio per ogni radiante, calcoliamo il fattore di crescita prendendo come riferimento:
     *
     * - `r` -> raggio finale -> maxRadius.
     * - `θ` -> valore dei radianti sul massimo raggio -> totalAngle.
     *
     * Di conseguenza:
     *
     * - `r = a + b * θ`
     * - `b = (r - a) / θ`
     * - `b = (maxRadius - initialRadius) / totalAngle`
     */
    const radiusGrowthRate = (maxRadius - initialRadius) / totalAngle;

    /**
     * Timeline duration.
     */
    const duration = 1000 * cycles;

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
             * SPIRALE DI ARCHIMEDE Formula: r = a + b * θ
             *
             * - InitialRadius (a): raggio di partenza
             * - RadiusGrowthRate (b): velocità di crescita del raggio
             * - AngleInRadian (θ): angolo corrente in radianti
             */
            const radius = initialRadius + radiusGrowthRate * angleInRadian;

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
        const steps = 200;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setLineDash([2, 5, 2, 5]);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let index = 0; index <= steps; index++) {
            const angle = (totalAngle / steps) * index;
            const radius = initialRadius + radiusGrowthRate * angle;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            if (index === 0) {
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
