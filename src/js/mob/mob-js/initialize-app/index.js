import { MobCore } from '../../mob-core';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../component/component-list';
import { setIndex, setPageNotFound, setRouteList } from '../route/route-list';
import { initParseWatcher, parseComponents } from '../parse';
import { router } from '../route';
// import { debugRoute } from '../route/test';
import { setContentElement, setContentId } from '../route/dom-ref/content';
import { setRoot } from '../route/dom-ref/root';
import {
    setBeforePageTransition,
    setPageTransition,
} from '../route/page-transition';
import { setRestoreScroll } from '../route/scroll';
import { setRedirectFunction } from '../route/redirect';
import { setDefaultComponent } from '../component/create-component';

/**
 * Inizializa default route.
 *
 * @type {(arg0: import('../type').InizializeApp) => Promise<void>}
 */
export const inizializeApp = async ({
    rootId,
    wrapper,
    contentId,
    routes = [],
    afterInit = () => {},
    redirect = ({ route }) => route,
    index = 'home',
    pageNotFound = 'pageNotFound',
    beforePageTransition,
    pageTransition,
    restoreScroll = true,
    componentDefaultProps = {
        scoped: false,
        maxParseIteration: 10_000,
        debug: false,
    },
}) => {
    setDefaultComponent(componentDefaultProps);

    /**
     * @type {HTMLElement | null}
     */
    const rootEl = /** @type {HTMLElement} */ document.querySelector(rootId);
    const wrapperDOM = await wrapper();

    /**
     * Set redirect function
     */
    setRedirectFunction(redirect);

    /**
     * Validate initial data. Else skip.
     */
    if (!contentId || !rootEl) return;

    setContentId({ contentId });
    setRoot({ element: rootEl });
    setPageTransition({ fn: pageTransition });
    setBeforePageTransition({ fn: beforePageTransition });
    setRestoreScroll(restoreScroll);

    /**
     * Init parse watcher.
     */
    initParseWatcher();

    setComponentList();

    setRouteList(routes);

    /**
     * Set idnex route
     */
    setIndex({ routeName: index });

    /**
     * Set idnex route
     */
    setPageNotFound({ routeName: pageNotFound });

    /**
     * Add wrapper to root node.
     */
    rootEl.insertAdjacentHTML('afterbegin', wrapperDOM);

    setContentElement();

    /**
     * Load wrapper with currentRoute && currentTemplate updated.
     *
     * Render common layout component. Initialize js on common layout component. All component here is persistent, so
     * persistent is set to true.
     */
    await parseComponents({ element: rootEl, persistent: true });

    /**
     * First callback after parse index.html first time. Wait 5 frames, so browser can clear gargbage collector created
     * in parse step.
     */
    MobCore.useFrameIndex(() => {
        MobCore.useNextTick(() => {
            afterInit();
        });
    }, frameDelayAfterParse);

    /**
     * Start router. Load current route
     */
    router();
};

// debugRoute();
