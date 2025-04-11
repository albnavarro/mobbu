/**
 * Create and set the goTo value.
 */
const mySequencer = tween
    .createSequencer({
        data: { x: 10, y: 0, rotate: 0 },
        duration: 10,
        ease: 'easeInQuad',
    })
    .goFrom({ x: 0 }, { start: 2, end: 5, ease: 'easeInExpo' });
