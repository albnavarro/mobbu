import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathCircle = ({ targets, container, canvas } = {}) => {
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

    let tween = MobTween.createSpring({
        stagger: { each: 6 },
        data: { x: 0 },
    });

    const step = 0.06;
    const radius = outerHeight(container) / 2 - 100;

    /**
     * Ogni target ha una grandezza diversa, é necessario che ogni target faccia riferimento alla propia dimensione per
     * allinearsi esattamante al canvas background.
     */
    const halfTagetsHeight = targets.map((target) => outerHeight(target) / 2);

    targets.forEach((item, index) => {
        tween.subscribeCache(item, ({ x }) => {
            const xr = Math.sin(x * step) * radius;
            const yr = Math.cos(x * step) * radius;
            item.style.transform = `translate3D(0px,0px,0px) translate(${xr - halfTagetsHeight[index]}px, ${yr - halfTagetsHeight[index]}px)`;
        });
    });

    tween.set({ x: 0 });

    let counter = 0;
    let isRunning = false;

    const loop = () => {
        /**
         * Equal incremente by frameRate.
         */
        const increment = 60 / MobCore.getFps();
        counter += increment;

        if (!tween) return;

        tween.goTo({ x: counter }).catch(() => {});

        if (isRunning) MobCore.useNextFrame(() => loop());
    };

    /**
     * Draw canvas background line.
     */
    function draw() {
        if (!ctx || !canvas) return;

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.setLineDash([2, 5, 2, 5]);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

        ctx.stroke();
        // ctx.setLineDash([]);
    }

    const unsubscribeResize = MobCore.useResize(() => {
        draw();
    });

    draw();

    return {
        play: () => {
            if (isRunning) return;

            isRunning = true;
            loop();
        },
        resume: () => {
            if (isRunning) return;

            isRunning = true;
            loop();
        },
        stop: () => {
            isRunning = false;
        },
        destroy: () => {
            tween.destroy();
            unsubscribeResize();

            // @ts-ignore
            ctx = null;

            // @ts-ignore
            tween = null;

            // @ts-ignore
            targets = null;

            // @ts-ignore
            counter = null;

            // @ts-ignore
            isRunning = null;
        },
    };
};
