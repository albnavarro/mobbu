import { removeOrphanTempIds } from '../../component/action/remove-and-destroy/remove-orphan-temp-ids';
import { getRouteByName } from '../route-list';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from '../../main-store/constant';
import { getContentElement } from '../dom-ref/content';
import { mainStore } from '../../main-store/main-store';
import { getBeforePageTransition, getPageTransition } from '../page-transition';
import { parseComponents } from '../../parse';
import { getRestoreScroll } from '../scroll';
import { tick } from '../../queque/tick';
import { removeCancellableComponent } from '../../component/action/remove-and-destroy/cancellableComponent/destroy-all-non-persisitent-component';

/**
 * Load new route.
 *
 * @param {object} param
 * @param {string} param.route
 * @param {string} param.templateName
 * @param {boolean} param.restoreScroll
 * @param {{ [key: string]: any }} param.params
 * @param {boolean | undefined} param.skipTransition
 * @param {number} param.scrollY
 */
export const loadRoute = async ({
    route = '',
    templateName = '',
    restoreScroll = true,
    params = {},
    scrollY,
    skipTransition,
}) => {
    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, true);

    /**
     * Await that all operation is completed before load next route
     */
    await tick();

    const contentElement = getContentElement();
    if (!contentElement || !(contentElement instanceof HTMLElement)) return;

    if (!skipTransition) contentElement.style.visibility = 'hidden';

    /**
     * Set before Route leave.
     */
    const { activeRoute } = mainStore.get();

    mainStore.set(MAIN_STORE_BEFORE_ROUTE_LEAVES, {
        route: activeRoute.route,
        templateName: activeRoute.templateName,
    });

    /**
     * Set before Change props
     */
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_CHANGE, { route, templateName });

    /**
     * If another route change during loading current route ( async route with some delay or similar ) skip fire after
     * route change event
     */
    let skip = false;
    const unWatchRouteChange = mainStore.watch(
        MAIN_STORE_BEFORE_ROUTE_CHANGE,
        () => {
            skip = true;
        }
    );

    /**
     * Clean DOM Remove props reference. Async loading and interrupt can leave rubbish.
     */
    removeOrphanTempIds();

    /**
     * Set new active route.
     */
    mainStore.set(MAIN_STORE_ACTIVE_ROUTE, { route, templateName });
    mainStore.set(MAIN_STORE_ACTIVE_PARAMS, params);

    /**
     * Get route.
     */
    const routeObejct = getRouteByName({ routeName: route });

    /**
     * Get route props,
     */
    const props = routeObejct?.props ?? {};

    /**
     * Get route DOM,
     */
    const content = (await routeObejct?.layout?.({ params, props })) ?? '';

    /**
     * Clone old route. Execute function to manipulate old Node.
     */
    const beforePageTransition = getBeforePageTransition();

    /**
     * @type {Node | null}
     */
    let clone = contentElement.cloneNode(true);

    if (beforePageTransition && clone && !skipTransition) {
        await beforePageTransition({
            // @ts-ignore
            oldNode: clone,
            oldRoute: activeRoute.route,
            newRoute: route,
            oldTemplateName: activeRoute.templateName,
            newTemplateName: templateName,
        });
        contentElement?.parentNode?.insertBefore(clone, contentElement);
    }

    // contentEl.textContent = '';
    contentElement.replaceChildren();

    removeCancellableComponent();
    contentElement.insertAdjacentHTML('afterbegin', content);

    /**
     * Wait for all render.
     */
    await parseComponents({ element: contentElement });
    if (!skipTransition) contentElement.style.visibility = '';

    /**
     * SKit after route change if another route is called.
     */
    if (!skip)
        mainStore.set(MAIN_STORE_AFTER_ROUTE_CHANGE, { route, templateName });

    /**
     * Scroll to 0 or if use history from history scrollY value
     */
    if (getRestoreScroll() && restoreScroll) scrollTo(0, scrollY);

    /**
     * Animate pgae teansition. Remove old route.
     */
    const pageTransition = getPageTransition();
    if (pageTransition && !skipTransition) {
        await pageTransition({
            oldNode: clone,
            newNode: contentElement,
            oldRoute: activeRoute.route,
            newRoute: route,
            oldTemplateName: activeRoute.templateName,
            newTemplateName: templateName,
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
    document.body.dataset['template'] = templateName;

    /**
     * Remove watcher.
     */
    unWatchRouteChange?.();

    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, false);
};
