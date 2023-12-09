import { tween } from '../../../src/js/mobMotion';

/**
 * Create and set the goTo value.
 */
const mySequencer = tween
    .createSequencer({
        data: { x: 10, y: 0, rotate: 0 },
        duration: 10,
        ease: 'easeInQuad',
    })
    .add(({ value, isForced, direction }) => {
        //
    }, 4);
