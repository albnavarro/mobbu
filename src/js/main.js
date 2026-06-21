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
import { initMainLoader } from './main-loader';
import { skipRouteLoader } from '@commonComponent/route-loader/utils';
import { setFocusToH1 } from '@componentLibs/utils/set-focus-to-h1';
import { updateHighlightTheme } from '@componentLibs/utils/theme-color';
// import { testModule } from './test';

const fpsLoopNumber = 30;

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
    data: { opacity: 1 },
    duration: 1000,
});

/**
 * Subscribe loader/background
 */
if (jsMainLoader && jsMainLoaderBackground) {
    [jsMainLoader, jsMainLoaderBackground].forEach((item) => {
        loaderTween?.subscribe(({ opacity }) => {
            // @ts-ignore
            item.style.opacity = opacity;
        });
    });
}

/**
 * Initialize app
 */
const initApp = async () => {
    await loadData();
    await loadIcons();
    initMainLoader(fpsLoopNumber);
    await MobCore.useFps({ duration: fpsLoopNumber, force: true });

    MobJs.inizializeApp({
        rootId: '#root',
        contentId: '#content',
        wrapper,
        routes,
        index: 'home',
        pageNotFound: 'pageNotFound',
        beforePageTransition,
        pageTransition,
        basePageName: 'Mob project',
        afterInit: async () => {
            await loaderTween.goTo({ opacity: 0 });
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
            skipRouteLoader(false);
        },
        // redirect: ({ route }) => { },
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
        throttle: 100,
        defaultMq: { type: 'min', value: 'tablet' },
    });

    // MobMotionCore.printDefault();

    updateHighlightTheme();
    initApp();
    usePageScroll();
    setFocusToH1();

    // testModule();
});
