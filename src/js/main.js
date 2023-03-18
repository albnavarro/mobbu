import { homeModule } from './route/home';
import { core } from './mobbu';
import { parseComponents } from './baseComponent/componentList';

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

/**
 * Common modules
 */
parseComponents({ element: document });

/**
 * Route
 */
const routeModules = {
    home: homeModule,
};

/**
 * Load module
 */
const root = document.querySelector('#content');
// const { module: currentModule } = root.dataset;
const currentModule = 'home';
routeModules?.[currentModule]?.({ root });
