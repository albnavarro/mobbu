// @ts-check

import { MobCore } from '../../mobCore';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../component/componentList';
import { setIndex, setPageNotFound, setRouteList } from '../route/routeList';
import { initParseWatcher, parseComponents } from '../parse';
import { router } from '../route';
// import { debugRoute } from '../route/test';
import { setContentElement, setContentId } from '../route/domRef/content';
import { setRoot } from '../route/domRef/root';
import {
    setBeforePageTransition,
    setPageTransition,
} from '../route/pageTransition';
import { setRestoreScroll } from '../route/scroll/restoreScroll';

/**
 * @type {( arg0: import('../type').InizializeApp) => Promise<void>}
 *
 * @description
 * Inizializa default route.
 */
export const inizializeApp = async ({
    rootId,
    wrapper,
    contentId,
    routes = [],
    afterInit = () => {},
    index = 'home',
    pageNotFound = 'pageNotFound',
    beforePageTransition,
    pageTransition,
    restoreScroll = true,
}) => {
    /**
     * @type {HTMLElement|null}
     */
    const rootEl = /** @type{HTMLElement} */ document.querySelector(rootId);
    const wrapperDOM = await wrapper();

    /**
     * Validate initial data.
     * Else skip.
     */
    if (!contentId || !rootEl) return;

    /**
     *
     */
    setContentId({ contentId });
    setRoot({ element: rootEl });
    setPageTransition({ fn: pageTransition });
    setBeforePageTransition({ fn: beforePageTransition });
    setRestoreScroll(restoreScroll);

    /**
     * Init parse watcher.
     */
    initParseWatcher();

    /**
     *
     */
    setComponentList();

    /**
     *
     */
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

    /**
     * Render common layout component.
     * Initialize js on common layout component.
     * All component here is persistent, so persistent  is set to true.
     */
    await parseComponents({ element: rootEl, persistent: true });

    /**
     * First callback after parse index.html first time.
     * Wait 5 frames, so browser can clear gargbage collector created in parse step.
     */
    MobCore.useFrameIndex(() => {
        MobCore.useNextTick(() => {
            afterInit();
        });
    }, frameDelayAfterParse);

    /**
     * set DOM content element
     */
    setContentElement();

    /**
     * Start router.
     */
    router();
};
