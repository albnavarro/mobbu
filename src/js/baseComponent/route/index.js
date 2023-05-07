import { navAccordion } from '../../component/layout/navigation/animation/navAccordion';
import { navigationScoller } from '../../component/layout/navigation/animation/navScroller';
import { parseComponents } from '../componentParse';
import { removeOrphansPropsFromParent } from '../mainStore/actions/props';
import { mainStore } from '../mainStore/mainStore';
import { removeCancellableComponentFromStore } from '../updateList/addWithoutKey';
import { routeList } from './routeList';
import { router } from './router';
import { debugRoute } from './test';

const root = document.querySelector('#content');
let commonData = {};
let legendData = {};
export const getCommonData = () => commonData;
export const getLegendData = () => legendData;

/**
 * Load common data.
 */
const loadData = async () => {
    const commonData = await fetch(`../data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    const legendData = await fetch(`../data/legend.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    return { commonData, legendData };
};

/**
 * Inizializa default route.
 * TODO get route from url ( /index.html#route )
 */
export const inizializeApp = async () => {
    const data = await loadData();
    commonData = data?.commonData;
    legendData = data?.legendData;

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
