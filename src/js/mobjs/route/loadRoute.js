import { removeOrphanComponent } from '../componentStore/action/removeAndDestroy';
import { removeOrphansPropsFromParent } from '../mainStore/actions/props';
import { getRoot } from '../mainStore/actions/root';
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
    const root = getRoot();

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
     * ( async route woth some delay or similar )
     * skip fire after route change event
     */
    let skip = false;
    const unWatchRouteChange = mainStore.watch('beforeRouteChange', () => {
        skip = true;
    });

    /**
     * Remove props reference.
     * Async loading and iterrupt can leave rubbish.
     */
    removeOrphansPropsFromParent();

    /**
     * Set new active route.
     */
    mainStore.set('activeRoute', route);
    const content = getRouteList()?.[route]?.({ root });
    root.innerHTML = '';
    removeOrphanComponent();
    root.insertAdjacentHTML('afterbegin', content);

    /**
     * Wait for all render.
     */
    await parseComponents({ element: root });

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
