import { outerHeight, outerWidth } from '@mobCoreUtils';
import { MobTimeline, MobTween } from '@mobMotion';

/** @type {import('./type').MathCommonAnimation} */
export const mathInfinite = ({ targets, container } = {}) => {
    if (!targets || !container)
        return {
            play: () => {},
            resume: () => {},
            stop: () => {},
            destroy: () => {},
        };

    const xAmplitude = outerWidth(container) / 2 - 100;
    const yAmplitude = outerHeight(container);
    const duration = 10;
    const friction = duration / 2 / Math.PI;

    let tween = MobTween.createSequencer({
        stagger: { each: 5 },
        data: { x: duration / 4, opacity: 1 },
        duration,
    })
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
            const val = x / friction;
            const factor = 2 / (3 - Math.cos(2 * val));
            const xr = factor * Math.cos(val) * xAmplitude;
            const yr = ((factor * Math.sin(2 * val)) / 2) * yAmplitude;
            item.style.transform = `translate3D(0px,0px,0px) translate(${xr}px, ${yr}px)`;
            item.style.opacity = `${opacity}`;
        });
    });

    let timeline = MobTimeline.createSyncTimeline({
        repeat: -1,
        yoyo: false,
        duration: 3000,
    }).add(tween);

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
