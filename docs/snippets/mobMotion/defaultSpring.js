import { MobMotionCore } from '../../../src/js/mobMotion';

MobMotionCore.setDefault({
    spring: {
        relative: false, // Default is false.
        config: {
            gentle: {
                mass: 10, // override mass property
            },
            bounce: {
                friction: 2, // override friction property
            },

            /**
             * Add new config.
             */
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
