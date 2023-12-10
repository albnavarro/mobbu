import { tween, timeline } from '../../../src/js/mobMotion';

/*
 * Create tween
 */
const myTween = tween.createTween({
    data: { x: 0, y: 0, rotate: 0 },
});

/*
 * Create spring
 */
const mySpring = tween.createSpring({
    data: { x: 0, y: 0, rotate: 0 },
});

/*
 * Subscribe etc...
 */

/*
 * Create timeline
 */
const myTimeline = timeline.createAsyncTimeline({
    repeat: 10,
    yoyo: true,
    freeMode: false,
    autoSet: true,
});

/*
 * Apply tweens.
 */
myTimeline
    /**
     * parallael playing.
     * wait all tween is completed.
     */
    .createGroup({ waitComplete: true })
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' })
    .closeGroup()

    /**
     * Custom function
     */
    .add(() => {})
    .goTo(mySpring, { x: 100, y: 200 }, { config: 'bounce' })

    /**
     * Custom async function
     * wait resolve().
     */
    .addAsync(({ resolve }) => {
        setTimeout(() => {
            resolve();
        }, 300);
    })

    /**
     * parallael playing.
     * wait first tween completed.
     */
    .createGroup({ waitComplete: false })
    .goTo(myTween, { x: 300, y: 0 }, { duration: 1000 })
    .goTo(mySpring, { x: 200, y: 50 }, { config: 'gentle', delay: 100 })
    .closeGroup();

/*
 * Play.
 * Resolve after 10 cycle.
 */
myTimeline.play().then(() => {});
