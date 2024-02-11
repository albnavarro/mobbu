// @ts-check

import { mobCore } from '../../mobCore';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../mainStore/actions/componentList';
import {
    setBeforePageTransition,
    setContentId,
    setPageTransition,
    setRoot,
} from '../mainStore/actions/root';
import {
    setIndex,
    setPageNotFound,
    setRouteList,
} from '../mainStore/actions/routeList';
import {
    initParseWatcher,
    parseComponents,
} from '../parseComponent/componentParse';
import { router } from './router';
import { debugRoute } from './test';

/**
 * @type {( arg0: import('../type').inizializeApp) => Promise<void>}
 *
 * @description
 * Inizializa default route.
 */
export const inizializeApp = async ({
    rootId,
    wrapper,
    contentId,
    components = {},
    pages = {},
    afterInit = () => {},
    index = 'home',
    pageNotFound = 'pageNotFound',
    beforePageTransition,
    pageTransition,
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

    /**
     * Init parse watcher.
     */
    initParseWatcher();

    /**
     *
     */
    setComponentList(components);

    /**
     *
     */
    setRouteList(pages);

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
     * All component here is persistent, so isCancellable is set to false.
     */
    await parseComponents({ element: rootEl, isCancellable: false });

    /**
     * First callback after parse index.html first time.
     * Wait 5 frames, so browser can clear gargbage collector created in parse step.
     */
    mobCore.useFrameIndex(() => {
        mobCore.useNextTick(() => {
            afterInit();
        });
    }, frameDelayAfterParse);

    /**
     * Debug
     */
    debugRoute();

    /**
     * Start router.
     */
    router();
};
