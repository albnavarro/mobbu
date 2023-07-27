// @ts-check

import { componentList } from './component/componentList';
import { navAccordion } from './component/layout/navigation/animation/navAccordion';
import { navigationScoller } from './component/layout/navigation/animation/navScroller';
import { loadData } from './data';
import { core } from './mobbu';
import { inizializeApp } from './mobjs';
import { routeList } from './pages/routeList';
// import { storeTest } from './test/storeTest';

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

    const init = async () => {
        await loadData();

        inizializeApp({
            root: document.querySelector('#content'),
            componentList,
            routeList,
            index: 'home',
            pageNotFound: 'pageNotFound',
            afterInit: () => {
                navAccordion();
                navigationScoller();
            },
        });
    };

    init();
    // storeTest();
});
