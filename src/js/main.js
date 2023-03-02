// reload on css change.
import { core } from './mobbu';

core.useLoad(() => {
    core.setDefault({
        deferredNextTick: true,
        useScaleFps: true,
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
