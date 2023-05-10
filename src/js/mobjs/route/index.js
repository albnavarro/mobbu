import { parseComponents } from '../componentParse';
import { setComponentList } from '../mainStore/actions/componentList';
import { removeOrphansPropsFromParent } from '../mainStore/actions/props';
import { getRoot, setRoot } from '../mainStore/actions/root';
import { getRouteList, setRouteList } from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';
import { removeCancellableComponentFromStore } from '../updateList/addWithoutKey';
import { router } from './router';
import { debugRoute } from './test';

/**
 * Inizializa default route.
 * TODO get route from url ( /index.html#route )
 */
export const inizializeApp = async ({
    root = null,
    componentList = {},
    routeList = {},
    afterInit = () => {},
}) => {
    if (!root) return;

    /**
     *
     */
    setComponentList(componentList);

    /**
     *
     */
    setRouteList(routeList);

    /**
     *
     */
    setRoot({ root });

    /**
     * Render common layout component.
     * Inizialize js on common layout component.
     */
    await parseComponents({ element: document.body });

    /**
     * First callback after parse index.html first time.
     */
    afterInit();

    /**
     * Debug
     */
    debugRoute();

    /**
     * Start router.
     */
    router();
};

/**
 * Load new route.
 */
export const loadRoute = async ({ route = '', removePrevious = true }) => {
    /**
     *
     */
    const root = getRoot();

    /**
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
     * Remove from component store all camcellbale elment and it's child.
     */
    if (removePrevious) removeCancellableComponentFromStore();

    /**
     * Set new active route.
     */
    mainStore.set('activeRoute', route);
    const content = getRouteList()?.[route]?.({ root });
    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', content);

    /**
     * Remove props reference.
     * Async loading and iterrupt can leave rubbish.
     */
    removeOrphansPropsFromParent();

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
