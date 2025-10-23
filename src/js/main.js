import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobMotionCore, MobTween } from '@mobMotion';
import { usePageScroll } from '@utils/page-scroll';
import { setBrowserClass } from '@utils/utils';
import { loadData, loadIcons } from './data';
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

/**
 * Query main loader && background inside index.html outside app.
 */
let jsMainLoader = document.body.querySelector('.js-main-loader');
let jsMainLoaderBackground = document.body.querySelector(
    '.js-main-loader-background'
);

/**
 * Creare tween for loader/background
 */
let loaderTween = MobTween.createTimeTween({
    data: { opacity: 1, scale: 1 },
    duration: 1000,
});

/**
 * Subscribe loader/background
 */
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

/**
 * Initialize app
 */
const initApp = async () => {
    await loadData();
    await loadIcons();

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
            loaderTween.destroy();

            // @ts-ignore
            loaderTween = null;

            jsMainLoader?.remove();
            jsMainLoaderBackground?.remove();

            // @ts-ignore
            jsMainLoader = null;
            // @ts-ignore
            jsMainLoaderBackground = null;

            getScrollbarWith();
            redirectOnResize();
        },
        redirect: ({ route }) => {
            return shouldRedirect() ? 'onlyDesktop' : route;
        },
        restoreScroll: true,
        componentDefaultProps: {
            scoped: false,
            maxParseIteration: 10_000,
            debug: false,
        },
    });
};

/**
 * Set default
 */
MobCore.useLoad(() => {
    setBrowserClass();

    MobMotionCore.setDefault({
        deferredNextTick: true,
    });

    // MobMotionCore.printDefault();

    initApp();
    usePageScroll();
    // storeTest();
});
