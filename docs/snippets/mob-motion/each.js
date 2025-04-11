import { MobTween } from '@mobMotion';

const myTween = MobTween.createTimeTween({
    data: { x: 0, y: 0 },
    stagger: { each: 4 },
});
