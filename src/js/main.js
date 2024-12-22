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
        store1Prop: 0,
    });

    const store2 = mobCore.createStore({
        prop2: 0,
        pippo: 10,
    });

    store2.bindStore(store1);

    const proxi1 = store1.getProxi();
    const proxi2_a = store2.getProxi();
    console.log(proxi2_a);
    const proxie2_b = store2.getProxi();
    console.log(proxie2_b);
    proxie2_b.store1Prop = 100000;
    proxie2_b.prop2 = 1;
    console.log(proxie2_b);

    const unsubscribe = store2.watch('store1Prop', (value) => {
        console.log('watch value:', value);
        console.log('get', store2.get());
        console.log('get prop:', store2.getProp('store1Prop'));
        console.log('proxi1 value', proxi1);
        console.log('proxi2_a value', proxi2_a);
        console.log('proxie2_b value', proxie2_b);
        console.log('proxi2_a value store1Prop', proxi2_a.store1Prop);
        console.log('proxie2_b value store1Prop', proxie2_b.store1Prop);
    });

    store2.emit('store1Prop');

    let cont = 0;

    document.body.addEventListener('click', () => {
        // store1.update('store1Prop', (value) => value + 1);
        store2.update('prop2', (value) => value + 1);
        proxi1.store1Prop++;

        console.log('get on click', store2.get());

        cont++;

        if (cont === 5) {
            // unsubscribe();
            store2.destroy();
        }
    });
});
