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
 * @param {Object} obj
 * @param {String} obj.rootId
 * @param {Function} obj.wrapper
 * @param {String} obj.contentId
 * @param {{ string:{componentFunction:function,props:Object,state:Object} }|{}} obj.components
 * @param {{string:function():string}|{}} obj.pages
 * @param {Function} obj.afterInit
 * @param {String} obj.index
 * @param {String} obj.pageNotFound
 * @param {((arg0:{oldNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)} [ obj.beforePageTransition ]
 * @param {((arg0:{oldNode:HTMLElement,newNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)} [ obj.pageTransition ]
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
    const wrapperDOM = wrapper();

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
