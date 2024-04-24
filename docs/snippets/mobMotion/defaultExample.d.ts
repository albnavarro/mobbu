import { motionCore } from '../../../src/js/mobMotion';

motionCore.setDefault({
    deferredNextTick: true,
    usePassive: true,
    mq: {
        desktop: 1024,
    },
    spring: {
        config: {
            customSpring: {
                friction: 1,
                mass: 1,
                precision: 0.01,
                tension: 180,
                velocity: 0,
            },
        },
    },
});
