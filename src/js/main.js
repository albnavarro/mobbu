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
import { usePageScroll } from './utils/pageScroll';
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
        usePassive: false,
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
            maxParseIteration: 10_000,
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
            restoreScroll: true,
        });
    };

    init();
    usePageScroll();

    // storeTest();
    // initTestMapStore();
    // stateTest();

    const store1 = mobCore.createStore({
        prop1: 0,
    });

    const store2 = mobCore.createStore({
        prop2: 0,
    });

    store2.bindStore(store1);
    // const proxiObject = store2.getProxi();

    const unsubscribe = store2.watch('prop1', (value) => {
        console.log('watch value:', value);
        // console.log('proxi value', console.log(proxiObject));
    });

    let cont = 0;
    document.body.addEventListener('click', () => {
        store1.update('prop1', (value) => value + 1);
        console.log(store2.get());

        cont++;

        if (cont === 5) {
            // unsubscribe();
            store2.destroy();
        }
    });
});
