import { MobTween } from '@mobMotion';

const mySpring = MobTween.createSpring({
    data: { x: 0, y: 0, rotate: 0 },
    config: 'wobbly',
    configProps: {
        mass: 5,
    },
    relative: false,
    stagger: { each: 7 },
});
