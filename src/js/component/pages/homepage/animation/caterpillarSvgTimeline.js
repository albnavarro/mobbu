import { timeline, tween } from '../../../../mobbu';
import { navigationStore } from '../../../layout/navigation/store/navStore';

export const createCaterpillarAnimation = ({
    rect,
    xOffset,
    yOffset,
    xOrigin,
    yOrigin,
    duration,
    svg,
}) => {
    let rectTween = {};
    let rectTimeline = {};

    rectTween.forEach((element, i) => {
        const unitInverse = rect.length - i;

        /**
         * Set transform origin
         */
        element.style.transformOrigin = `${unitInverse * (i * xOrigin)}px ${
            i * yOrigin
        }px`;
    });

    /**
     * Create tween.
     */
    rectTween = tween.createTween({
        data: { rotate: 0 },
        stagger: { each: 3, from: 'center' },
        ease: 'easeLinear',
    });

    /**
     * Subscribe rect to tween.
     */
    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        rectTween.subscribeCache(item, ({ rotate }) => {
            /**
             * Set position
             */
            item.style.transform = `translateZ(0) translate(${
                xOffset - unitInverse
            }px, ${yOffset - unitInverse}px) rotate(${rotate}deg)`;
        });
    });

    /**
     * Create timeline
     */
    rectTimeline = timeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
    });

    /**
     * Anim timeline.
     */
    rectTimeline
        .set(rectTween, { rotate: 0 })
        .add(() => svg.classList.add('active'))
        .goTo(rectTween, { rotate: 359 }, { duration });

    /**
     * Play
     */
    rectTimeline.play();

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () =>
        rectTimeline.pause()
    );

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(() => {
            rectTimeline.resume();
        }, 800)
    );

    return () => {
        rectTween.destroy();
        rectTimeline.destroy();
        rectTween = null;
        rectTimeline = null;
        unWatchPause();
        unWatchResume();
    };
};
