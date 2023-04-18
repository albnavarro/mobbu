import { core, timeline, tween } from '../../../../mobbu';

export const createCaterpillarAnimation = ({ rect }) => {
    /**
     * Set rect height.
     */
    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        item.style.width = `${unitInverse * 2 * (i / 10)}px`;
        item.style.height = `${unitInverse * 2 * (i / 5)}px`;
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
     * Subscribe rect to tween.
     */
    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        rectTween.subscribeCache(
            item,
            ({ rotate, transformXfactor, transformYfactor }) => {
                const rotateParsed = core.shouldMakeSomething()
                    ? Math.round(rotate)
                    : rotate;

                /**
                 * Set position
                 */
                item.style.transform = `translate3D(0,0,0) translate(${
                    50 - unitInverse * transformXfactor
                }px, ${
                    50 - unitInverse * transformYfactor
                }px) rotate(${rotateParsed}deg)`;

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
        yoyo: true,
    });

    /**
     * Anim timeline.
     */
    rectTimeline
        .goTo(
            rectTween,
            { rotate: 360, transformYfactor: 2 },
            { duration: 10000 }
        )
        .goTo(
            rectTween,
            { transformXfactor: 3, transformYfactor: 1, rotate: -360 },
            { duration: 10000 }
        )
        .goTo(
            rectTween,
            { transformXfacotr: 1, transformYfactor: 3, rotate: 360 },
            { duration: 10000 }
        );

    /**
     * Play
     */
    rectTimeline.play();

    return () => {
        rectTween.destroy();
        rectTimeline.destroy();
    };
};
