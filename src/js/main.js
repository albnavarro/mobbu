import { homeModule } from './layout/index';
import { core } from './mobbu';

/**
 * Set default
 */
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

/**
 * Route
 */
const routeModules = {
    home: homeModule,
};

/**
 * Load module
 */
const main = document.querySelector('main.main');
const { module: currentModule } = main.dataset;
routeModules?.[currentModule]?.();
