import { timeline, tween } from '../../../../mobbu';
import { navigationStore } from '../../../layout/navigation/store/navStore';

export const createCaterpillarAnimation = ({
    rect,
    xScale,
    yScale,
    xOffset,
    yOffset,
    xOrigin,
    yOrigin,
}) => {
    /**
     * Set rect height.
     */
    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        item.style.width = `${unitInverse * xScale * i}px`;
        item.style.height = `${unitInverse * yScale * i}px`;
    });

    /**
     * Create tween.
     */
    const rectTween = tween.createTween({
        data: { rotate: 0 },
        stagger: { each: 3, from: 'center' },
        ease: 'easeLinear',
    });

    /**
     * Disable 3D on safari.
     */
    // const enable3D = detectSafari() ? '' : 'translate3D(0,0,0)';

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

            /**
             * Set transform origin
             */
            item.style.transformOrigin = `${unitInverse * (i * xOrigin)}px ${
                i * yOrigin
            }px`;
        });
    });

    /**
     * Create timeline
     */
    const rectTimeline = timeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
    });

    /**
     * Anim timeline.
     */
    rectTimeline
        .goTo(rectTween, { rotate: 360 }, { duration: 50000 })
        .set(rectTween, { rotate: 0 });

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
        rectTimeline.resume()
    );

    return () => {
        rectTween.destroy();
        rectTimeline.destroy();
        unWatchPause();
        unWatchResume();
    };
};
