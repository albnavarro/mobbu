import { tween } from '../../../src/js/mobMotion';

const mySequencer = tween.createSequencer({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 10,
    ease: 'easeInQuad',
    stagger: { each: 10 },
});
