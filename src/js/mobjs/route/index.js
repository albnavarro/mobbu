// @ts-check

import { core } from '../../mobbu';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../mainStore/actions/componentList';
import { setContent } from '../mainStore/actions/root';
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
 * @param {Object} obj
 * @param {String} obj.rootId
 * @param {Function} obj.wrapper
 * @param {String} obj.contentId
 * @param {{ string:{componentFunction:function,props:Object,state:Object} }|{}} obj.components
 * @param {{string:function():string}|{}} obj.pages
 * @param {Function} obj.afterInit
 * @param {String} obj.index
 * @param {String} obj.pageNotFound
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
}) => {
    /**
     * @type {HTMLElement|null}
     */
    const rootEl = /** @type{HTMLElement} */ document.querySelector(rootId);
    const wrapperDOM = wrapper();

    /**
     * Validate intial data.
     * Else skip.
     */
    if (!contentId || !rootEl) return;

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
     *
     */
    setContent({ contentId });

    /**
     * Add wrapper to root node.
     */
    rootEl.insertAdjacentHTML('afterbegin', wrapperDOM);

    /**
     * Render common layout component.
     * Inizialize js on common layout component.
     */
    await parseComponents({ element: rootEl });

    /**
     * First callback after parse index.html first time.
     * Wait 5 frames, so browser can clear gargbage collector created in parse step.
     */
    core.useFrameIndex(() => {
        core.useNextTick(() => {
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
