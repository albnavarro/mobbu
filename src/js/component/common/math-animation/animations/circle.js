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
    const itemHeight = outerHeight(targets[0]);
    const itemHalfHeight = itemHeight / 2;
    const radius = outerHeight(container) / 2 - 100;

    targets.forEach((item) => {
        tween.subscribeCache(item, ({ x }) => {
            const xr = Math.sin(x * step) * radius;
            const yr = Math.cos(x * step) * radius;
            item.style.transform = `translate3D(0px,0px,0px) translate(${xr - itemHalfHeight}px, ${yr - itemHalfHeight}px)`;
        });
    });

    tween.set({ x: 0 });

    let counter = 0;
    let isRunning = false;

    const loop = () => {
        counter++;
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
