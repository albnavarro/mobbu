// @ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobMotionCore, MobTween } from '@mobMotion';
import { usePageScroll } from '@utils/page-scroll';
import { setBrowserClass } from '@utils/utils';
import { loadData } from './data';
import { beforePageTransition, pageTransition } from './pageTransition';
import { routes } from './pages';
import { getScrollbarWith } from './utils/scrollbar-with';
import { wrapper } from './wrapper';
// import { stateTest } from './test/mapTest/mapTest';
// import { initTestMapStore } from './test/mapStore';
// import { storeTest } from './test/store-test';

/**
 * Set default
 */
MobCore.useLoad(() => {
    setBrowserClass();

    MobMotionCore.setDefault({
        deferredNextTick: true,
        usePassive: false,
    });

    MobMotionCore.printDefault();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const init = async () => {
        const jsMainLoader = document.body.querySelector('.js-main-loader');
        const jsMainLoaderBackground = document.body.querySelector(
            '.js-main-loader-background'
        );

        let loaderTween = MobTween.createTimeTween({
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

        MobJs.setDefaultComponent({
            scoped: false,
            maxParseIteration: 10_000,
            debug: false,
        });

        MobJs.inizializeApp({
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
});
