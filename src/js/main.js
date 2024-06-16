// @ts-check

import { loadData } from './data';
import { motionCore, tween } from './mobMotion';
import { inizializeApp, setDefaultComponent } from './mobjs';
import { wrapper } from './wrapper';
import { mobCore } from './mobCore';
import { setBrowserClass } from './utils/utils';
import { getScrollbarWith } from './utils/scrollbarWith';
import { beforePageTransition, pageTransition } from './pageTransition';
import { routes } from './pages';
// import { stateTest } from './test/mapTest/mapTest';
// import { initTestMapStore } from './test/mapStore';
// import { storeTest } from './test/storeTest';

/**
 * Set default
 */
mobCore.useLoad(() => {
    setBrowserClass();

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

    motionCore.printDefault();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const init = async () => {
        const jsMainLoader = document.body.querySelector('.js-main-loader');
        const jsMainLoaderBackground = document.body.querySelector(
            '.js-main-loader-background'
        );

        let loaderTween = tween.createTween({
            data: { opacity: 1, scale: 1 },
            duration: 1000,
        });

        if (jsMainLoader && jsMainLoaderBackground) {
            [jsMainLoader, jsMainLoaderBackground].forEach((item) => {
                loaderTween?.subscribe(({ opacity, scale }) => {
                    // @ts-ignore
                    item.style.opacity = opacity;
                    // @ts-ignore
                    item.style.transform = `scale(${scale})`;
                });
            });
        }

        await loadData();

        setDefaultComponent({
            scoped: false,
            maxParseIteration: 1000,
            debug: true,
        });

        inizializeApp({
            rootId: '#root',
            contentId: '#content',
            wrapper,
            routes,
            index: 'home',
            pageNotFound: 'pageNotFound',
            beforePageTransition,
            pageTransition,
            afterInit: async () => {
                await loaderTween.goTo({ opacity: 0, scale: 0.9 });
                jsMainLoader?.remove();
                jsMainLoaderBackground?.remove();
                // @ts-ignore
                loaderTween = null;
                getScrollbarWith();
            },
        });
    };

    init();

    // storeTest();
    // initTestMapStore();
    // stateTest();
});
