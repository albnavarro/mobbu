import { MobTween } from '@mobMotion';

const myLerp = MobTween.createLerp({
    data: { x: 0, y: 0, rotate: 0 },
    velocity: 0.06,
    precision: 0.01,
    relative: false,
    stagger: { each: 7 },
});
