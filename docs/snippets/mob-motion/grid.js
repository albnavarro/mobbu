import { MobTween } from '@mobMotion';

const myTween = MobTween.createTimeTween({
    data: { x: 0, y: 0 },
    stagger: {
        each: 4,
        waitComplete: false,
        from: { x: 5, y: 5 },
        grid: { col: 10, row: 10, direction: 'radial' },
    },
});
