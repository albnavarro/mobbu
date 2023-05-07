import { inizializeApp } from './baseComponent/route';
import { core } from './mobbu';

/**
 * Set default
 */
core.useLoad(() => {
    core.setDefault({
        deferredNextTick: true,
        useScaleFps: true,
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

    core.printDefault();
});

inizializeApp();
