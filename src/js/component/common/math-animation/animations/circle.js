import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathCircle = ({ targets, container } = {}) => {
    if (!targets || !container)
        return {
            play: () => {},
            resume: () => {},
            stop: () => {},
            destroy: () => {},
        };

    let tween = MobTween.createSpring({
        stagger: { each: 6 },
        data: { x: 0 },
    });

    const step = 0.06;
    const radius = 100;
    const itemHeight = outerHeight(targets[0]);
    const itemHalfHeight = itemHeight / 2;

    targets.forEach((item) => {
        tween.subscribe(({ x }) => {
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
