import { MobTween } from '@mobMotion';

const mySequencer = MobTween.createSequencer({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 10,
    ease: 'easeInQuad',
    stagger: { each: 10 },
});
