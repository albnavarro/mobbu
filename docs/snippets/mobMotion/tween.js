import { tween } from '../mobMotion';

const myTween = tween.createTween({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 1000,
    ease: 'easeInQuad',
    relative: false,
    stagger: { each: 7 },
});
