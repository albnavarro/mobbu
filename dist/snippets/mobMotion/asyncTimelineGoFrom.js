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
const myTimeline = timeline.createAsyncTimeline({});

/*
 * Apply set.
 */
myTimeline
    .goFrom(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .goFrom(mySpring, { x: 10, y: 10 }, { config: 'gentle' });

/*
 * Play.
 */
myTimeline.play();
