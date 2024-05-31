// @ts-check

import {
    removeCancellableComponent,
    removeOrphanComponent,
} from '../componentStore/action/removeAndDestroy';
import { getRouteList } from '../mainStore/routeList';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from '../mainStore/constant';
import { getContentId } from '../mainStore/contendId';
import { mainStore } from '../mainStore/mainStore';
import {
    getBeforePageTransition,
    getPageTransition,
} from '../mainStore/pageTransition';
import { parseComponents } from '../parseComponent/componentParse';
import { tick } from '../componentStore/tick';

/**
 * @param {object} obj
 * @param {string} obj.route
 * @param {{[key:string]: any}} obj.params
 *
 * @description
 * Load new route.
 */
export const loadRoute = async ({ route = '', params = {} }) => {
    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, true);

    /**
     * Await that all operation is completed before load next route
     */
    await tick();

    /**
     *
     */
    const contentId = getContentId();

    /**
     * @type {HTMLElement|null}
     */
    const contentEl = document?.querySelector(contentId);
    if (!contentEl) return;

    /**
     * @type {{ [x: string]: string; }}
     * Set before Route leave.
     */
    const { activeRoute } = mainStore.get();
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_LEAVES, activeRoute);

    /**
     * Set before Change props
     */
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_CHANGE, route);

    /**
     * If another route change during loading current route
     * ( async route with some delay or similar )
     * skip fire after route change event
     */
    let skip = false;
    const unWatchRouteChange = mainStore.watch(
        MAIN_STORE_BEFORE_ROUTE_CHANGE,
        () => {
            skip = true;
        }
    );

    /**
     * Clean DOM
     * Remove props reference.
     * Async loading and interrupt can leave rubbish.
     */
    removeOrphanComponent();

    /**
     * Set new active route.
     */
    mainStore.set(MAIN_STORE_ACTIVE_ROUTE, route);
    mainStore.set(MAIN_STORE_ACTIVE_PARAMS, params);
    const content = await getRouteList()?.[route]?.({ params });

    /**
     * Clone old route.
     * Execute function to manipulate old Node.
     */
    const beforePageTransition = getBeforePageTransition();

    /**
     * @type {Node|null}
     */
    let clone = contentEl?.cloneNode(true);

    if (beforePageTransition && clone) {
        await beforePageTransition({
            // @ts-ignore
            oldNode: clone,
            oldRoute: activeRoute,
            newRoute: route,
        });
        contentEl?.parentNode?.insertBefore(clone, contentEl);
    }

    /**
     *
     */
    contentEl.innerHTML = '';
    scrollTo(0, 0);
    removeCancellableComponent();
    contentEl.insertAdjacentHTML('afterbegin', content);

    /**
     * Wait for all render.
     */
    await parseComponents({ element: contentEl });

    /**
     * SKit after route change if another route is called.
     */
    if (!skip) mainStore.set(MAIN_STORE_AFTER_ROUTE_CHANGE, route);

    /**
     * Animate pgae teansition.
     * Remove old route.
     */
    const pageTransition = getPageTransition();
    if (pageTransition) {
        await pageTransition({
            oldNode: clone,
            newNode: contentEl,
            oldRoute: activeRoute,
            newRoute: route,
        });
        // @ts-ignore
        clone.remove();
    }

    /**
     * Destroy Clone.
     */
    clone = null;

    /**
     * Set active route to body data-route
     */
    document.body.dataset['route'] = route;

    /**
     * Remove watcher.
     */
    unWatchRouteChange?.();

    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, false);
};
