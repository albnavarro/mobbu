import { parseComponents } from '../baseComponent/componentParse';
import { mainStore } from '../baseComponent/mainStore/mainStore';
import { removeCancellableComponentFromStore } from '../baseComponent/updateList/addWithoutKey';
import { navAccordion } from '../component/navigation/animation/navAccordion';
import { navigationScoller } from '../component/navigation/animation/navScroller';
import { routeList } from './routeList';
import { router } from './router';
import { debugRoute } from './test';

const root = document.querySelector('#content');
let commonData = {};
export const getCommonData = () => commonData;

/**
 * Load common data.
 */
const loadData = async () => {
    const data = await fetch(`../data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    return data;
};

/**
 * Inizializa default route.
 * TODO get route from url ( /index.html#route )
 */
export const inizializeApp = async () => {
    commonData = await loadData();

    /**
     * Render common layout component.
     * Inizialize js on common layout component.
     */
    await parseComponents({ element: document.body });
    navAccordion();
    navigationScoller();

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
    const content = routeList?.[route]?.({ root });
    root.innerHTML = '';
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
     * Remove watcher.
     */
    unWatchRouteChange?.();
};
