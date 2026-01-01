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
    const amplitude = outerHeight(container) / 3;
    const cycles = 3;
    const wavelength = distance / (Math.PI * cycles);
    const duration = 1000 * cycles;
    const itemHalfHeight = itemHeight / 2;
    const halfDistance = distance / 2;

    targets.forEach((item) => {
        let previousX = 0;

        tween.subscribe(({ x }) => {
            const yDirection = x >= previousX ? 1 : -1;
            const y = Math.sin(x / wavelength) * amplitude * yDirection;

            item.style.transform = `translate3D(0px,0px,0px) translate(${x - halfDistance}px, ${y - itemHalfHeight}px)`;
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
