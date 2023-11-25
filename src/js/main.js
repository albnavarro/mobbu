import * as components from './component/componentList';
import * as pages from './pages/routeList';
import { loadData } from './data';
import { core, tween } from './mobMotion';
import { inizializeApp, setDefaultComponent } from './mobjs';
import { wrapper } from './wrapper';
import { mobCore } from './mobCore';
// import { storeTest } from './test/storeTest';

/**
 * Set default
 */
mobCore.useLoad(() => {
    mobCore.store.set('fpsScalePercent', { 0: 1, 50: 2, 70: 3 });

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

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const init = async () => {
        const jsMainLoader = document.body.querySelector('.js-main-loader');

        let loaderTween = tween.createTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        if (jsMainLoader) {
            loaderTween.subscribe(({ opacity, scale }) => {
                jsMainLoader.style.opacity = opacity;
                jsMainLoader.style.transform = `scale(${scale})`;
            });
        }

        await loadData();

        setDefaultComponent({
            isolateCreation: false,
            isolateOnMount: false,
            scoped: false,
            maxParseIteration: 1000,
            debug: true,
        });

        inizializeApp({
            rootId: '#root',
            contentId: '#content',
            wrapper,
            components,
            pages,
            index: 'home',
            pageNotFound: 'pageNotFound',
            afterInit: async () => {
                await loaderTween.goTo({ opacity: 0, scale: 0.9 });
                jsMainLoader?.remove();
                loaderTween = null;
            },
        });
    };

    init();
    // storeTest();
});
