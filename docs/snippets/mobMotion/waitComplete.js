import { MobTween } from '@mobMotion';

const myTween = MobTween.createTween({
    data: { x: 0, y: 0 },
    stagger: { each: 4, waitComplete: false },
});
