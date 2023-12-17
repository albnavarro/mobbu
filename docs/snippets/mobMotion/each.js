import { tween } from '../../../src/js/mobMotion';

const myTween = tween.createTween({
    data: { x: 0, y: 0 },
    stagger: { each: 4 },
});
