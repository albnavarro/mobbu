// @ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobMotionCore, MobTween } from '@mobMotion';
import { usePageScroll } from '@utils/page-scroll';
import { setBrowserClass } from '@utils/utils';
import { loadData } from './data';
import { beforePageTransition, pageTransition } from './page-transition';
import { routes } from './pages';
import { getScrollbarWith } from './utils/scrollbar-with';
import { wrapper } from './wrapper';
// import { storeTest } from './test/store-test';

const shouldRedirect = () => {
    return /** @type {boolean} */ (MobMotionCore.mq('max', 'desktop'));
};

/**
 * Temp: Redirect every page to `onlyDesktop` route in tablet/mobile TODO: should be removed.
 */
const redirectOnResize = () => {
    MobCore.useResize(() => {
        if (!shouldRedirect()) return;

        MobJs.loadUrl({ url: 'onlyDesktop' });
    });
};

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

const initApp = async () => {
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
            redirectOnResize();
        },
        redirect: ({ route }) => {
            return shouldRedirect() ? 'onlyDesktop' : route;
        },
        restoreScroll: true,
    });
};

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

    initApp();
    usePageScroll();
    // storeTest();
});
