import { core, timeline, tween } from '../../../../mobbu';

export const createCaterpillarAnimation = ({ rect, multiplier }) => {
    /**
     * Set rect height.
     */
    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        item.style.width = `${unitInverse * multiplier * (i / 10)}px`;
        item.style.height = `${unitInverse * multiplier * (i / 5)}px`;
    });

    /**
     * Create tween.
     */
    const rectTween = tween.createTween({
        data: { rotate: 0, xOffset: 1, yOffset: 1 },
        stagger: { each: 3, from: 'center' },
        ease: 'easeLinear',
    });

    [...rect].forEach((item, i) => {
        const unitInverse = rect.length - i;
        rectTween.subscribeCache(item, ({ rotate, xOffset, yOffset }) => {
            const rotateParsed = core.shouldMakeSomething()
                ? Math.round(rotate)
                : rotate;

            /**
             * Set position
             */
            item.style.transform = `translate3D(0,0,0) translate(${
                50 - unitInverse * multiplier
            }px, ${
                50 - unitInverse * multiplier
            }px) rotate(${rotateParsed}deg)`;

            /**
             * Set transform origin
             */
            item.style.transformOrigin = `${
                unitInverse * multiplier * xOffset
            }px ${i * multiplier * yOffset}px`;
        });
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
        .goTo(rectTween, { rotate: 360 }, { duration: 10000 })
        .goTo(
            rectTween,
            { xOffset: 4, yOffset: 1, rotate: -360 },
            { duration: 10000 }
        )
        .goTo(
            rectTween,
            { yOffset: 4, xOffset: 1, rotate: 360 },
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
