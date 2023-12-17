import { tween } from '../../../src/js/mobMotion';

const myTween = tween.createTween({
    data: { x: 0, y: 0 },
    stagger: {
        each: 4,
        waitComplete: false,
        from: { x: 5, y: 5 },
        grid: { col: 10, row: 10, direction: 'radial' },
    },
});
