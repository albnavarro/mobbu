import { tween } from '../mobMotion';

const mySpring = tween.createSpring({
    data: { x: 0, y: 0, rotate: 0 },
    config: 'wobbly',
    configProp: {
        mass: 5,
    },
    relative: false,
    stagger: { each: 7 },
});
