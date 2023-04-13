import { parseComponents } from '../baseComponent/componentParse';
import { mainStore } from '../baseComponent/mainStore/mainStore';
import { removeCancellableComponentFromStore } from '../baseComponent/updateList/addWithoutKey';
import { navAccordion } from '../component/navigation/navAccordion';
import { navigationScoller } from '../component/navigation/navScroller';
import { reouteList } from './routeList';

const root = document.querySelector('#content');
let commonData = {};
export const getCommonData = () => commonData;

/**
 * Load commen data.
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
    await parseComponents({ element: document.body });
    navAccordion();
    navigationScoller();

    loadRoute({ route: 'home', removePrevious: false });
};

/**
 * Load new route.
 */
export const loadRoute = async ({ route = 'home', removePrevious = true }) => {
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
    const content = reouteList?.[route]?.({ root });
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

/**
 * Some event test.
 */
mainStore.watch('beforeRouteChange', (current, previous) => {
    console.log('----------------');
    console.log('before route change:');
    console.log(`previous:`, previous);
    console.log(`current:`, current);
});

mainStore.watch('activeRoute', (current) => {
    console.log(`active route:`, current);
});

mainStore.watch('atfterRouteChange', (current) => {
    console.log(`after route change`, current);
    console.log('----------------');
});
