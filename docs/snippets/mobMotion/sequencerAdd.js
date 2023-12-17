import { tween } from '../mobMotion';

/**
 * Create and set the goTo value.
 */
const mySequencer = tween
    .createSequencer({
        data: { x: 10, y: 0, rotate: 0 },
        duration: 10,
        ease: 'easeInQuad',
    })
    .goTo({ x: 10 }, { start: 2, end: 5, ease: 'easeInExpo' })
    .add(({ value, isForced, direction }) => {
        /**
         * Callback fired at 4, ( in a range between 0 and 10 ).
         */
    }, 4);
