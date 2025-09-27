import { removeOrphanTempIds } from '../../component/action/remove-and-destroy/remove-orphan-temp-ids';
import { getRouteByName } from '../route-list';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_ROUTE_IS_LOADING,
} from '../../main-store/constant';
import { getContentElement } from '../dom-ref/content';
import { mainStore } from '../../main-store/main-store';
import { getBeforePageTransition, getPageTransition } from '../page-transition';
import { parseComponents } from '../../parse';
import { getRestoreScroll } from '../scroll';
import { tick } from '../../queque/tick';
import { removeCancellableComponent } from '../../component/action/remove-and-destroy/cancellable-component/destroy-all-non-persisitent-component';

const scrolMap = new Map();

/**
 * @param {object} params
 * @param {string} params.route
 * @param {{ [key: string]: any }} params.params
 * @returns {string}
 */
const createRouteString = ({ route, params }) => {
    return Object.entries(params).reduce((previous, [key, value]) => {
        return `${previous}-${key}-${value}`;
    }, route);
};

/**
 * Load new route.
 *
 * @param {object} param
 * @param {string} param.route
 * @param {string} param.templateName
 * @param {boolean} param.restoreScroll
 * @param {{ [key: string]: any }} param.params
 * @param {boolean | undefined} param.skipTransition
 */
export const loadRoute = async ({
    route = '',
    templateName = '',
    restoreScroll = true,
    params = {},
    skipTransition,
}) => {
    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, true);

    /**
     * Await that all operation is completed before load next route
     */
    await tick();

    const contentElement = getContentElement();
    if (!contentElement || !(contentElement instanceof HTMLElement)) return;

    /**
     * Previous route params.
     */
    const { activeRoute: fromRoute, activeParams: activeParamsFromRoute } =
        mainStore.get();

    /**
     * Create unique UID to get previous scrollY.
     */
    const toRouteUID = createRouteString({
        route: route,
        params: params,
    });

    /**
     * Create unique UID to store scrollY value before loeave route.
     */
    const fromRouteUID = createRouteString({
        route: fromRoute.route,
        params: activeParamsFromRoute,
    });

    /**
     * Get and set pevious scrollY value.
     */
    const scrollY = scrolMap.get(toRouteUID);
    scrolMap.set(fromRouteUID, window.scrollY);

    /**
     * Set before Change props
     */
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_CHANGE, {
        currentRoute: fromRoute.route,
        currentTemplate: fromRoute.templateName,
        nextRoute: route,
        nextTemplate: templateName,
    });

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
            oldRoute: fromRoute.route,
            newRoute: route,
            oldTemplateName: fromRoute.templateName,
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
        mainStore.set(MAIN_STORE_AFTER_ROUTE_CHANGE, {
            currentRoute: route,
            currentTemplate: templateName,
            previousRoute: fromRoute.route,
            previousTemplate: fromRoute.templateName,
        });

    /**
     * Scroll to 0 or if use history from history scrollY value
     */
    if (getRestoreScroll() && restoreScroll) scrollTo(0, scrollY);

    /**
     * Set active route to body data-route
     */
    document.body.dataset['route'] = route;
    document.body.dataset['template'] = templateName;

    /**
     * Animate pgae teansition. Remove old route.
     */
    const pageTransition = getPageTransition();
    if (pageTransition && !skipTransition) {
        await pageTransition({
            oldNode: clone,
            newNode: contentElement,
            oldRoute: fromRoute.route,
            newRoute: route,
            oldTemplateName: fromRoute.templateName,
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
     * Remove watcher.
     */
    unWatchRouteChange?.();

    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, false);
};
