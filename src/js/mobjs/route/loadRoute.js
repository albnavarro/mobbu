import {
    removeCancellableComponent,
    removeOrphanComponent,
} from '../componentStore/action/removeAndDestroy';
import { getContentId } from '../mainStore/actions/root';
import { getRouteList } from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';
import { parseComponents } from '../parseComponent/componentParse';

/**
 * @param {Object} obj
 * @param {String} obj.route
 *
 * @description
 * Load new route.
 */
export const loadRoute = async ({ route = '' }) => {
    /**
     *
     */
    const contentId = getContentId();
    const contentEl = document?.querySelector(contentId);

    /**
     * @type {{ activeRoute:String }}
     * Set before Route leave.
     */
    const { activeRoute } = mainStore.get();
    mainStore.set('beforeRouteLeave', activeRoute);

    /**
     * Set before Change props
     */
    mainStore.set('beforeRouteChange', route);

    /**
     * If another route change during loading current route
     * ( async route with some delay or similar )
     * skip fire after route change event
     */
    let skip = false;
    const unWatchRouteChange = mainStore.watch('beforeRouteChange', () => {
        skip = true;
    });

    /**
     * Clean DOM
     * Remove props reference.
     * Async loading and interrupt can leave rubbish.
     */
    removeOrphanComponent();

    /**
     * Set new active route.
     */
    mainStore.set('activeRoute', route);
    const content = await getRouteList()?.[route]?.();
    contentEl.innerHTML = '';
    removeCancellableComponent();
    contentEl.insertAdjacentHTML('afterbegin', content);

    /**jj
     * Wait for all render.
     */
    await parseComponents({ element: contentEl });

    /**
     * SKit after route change if another route is called.
     */
    if (!skip) mainStore.set('atfterRouteChange', route);

    /**
     * Set active route to body data-route
     */
    document.body.dataset.route = route;

    /**
     * Remove watcher.
     */
    unWatchRouteChange?.();
};
