import { timeline, tween } from '../../../../mobbu';
import { detectSafari } from '../../../../utils/utils';
import { navigationStore } from '../../../layout/navigation/store/navStore';

export const createCaterpillarAnimation = ({ rect, xScale, yScale }) => {
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
        data: { rotate: 0, transformXfactor: 1, transformYfactor: 1 },
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
        rectTween.subscribeCache(
            item,
            ({ rotate, transformXfactor, transformYfactor }) => {
                /**
                 * Set position
                 */
                item.style.transform = `translateZ(0) translate(${
                    50 - unitInverse * transformXfactor
                }px, ${
                    50 - unitInverse * transformYfactor
                }px) rotate(${rotate}deg)`;

                /**
                 * Set transform origin
                 */
                item.style.transformOrigin = `${
                    unitInverse * transformXfactor
                }px ${i * transformYfactor}px`;
            }
        );
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
        .goTo(
            rectTween,
            { rotate: 360, transformXfactor: 2 },
            { duration: 50000 }
        )
        .set(rectTween, { rotate: 0 })
        .goTo(
            rectTween,
            { transformXfactor: 3, transformYfactor: 1, rotate: 360 },
            { duration: 50000 }
        )
        .set(rectTween, { rotate: 0 })
        .goTo(
            rectTween,
            { transformXfacotr: 1, transformYfactor: 3, rotate: 360 },
            { duration: 50000 }
        )
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
