// @ts-check
import { mainStore } from '../mainStore/mainStore';
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

let previousUrl = '';

/**
 * @description
 * Get hash from url and load new route.
 */
const getHash = () => {
    const locationHash = window.location.hash.slice(1);

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) return;

    /**
     * Load.
     */
    loadRoute({ route: getRouteModule({ url: locationHash }) });
};

/**
 * @description
 * Initialize router.
 */
export const router = () => {
    getHash();

    window.addEventListener('hashchange', () => {
        getHash();
    });
};

/**
 * @description
 * Set hash in current browser url.
 */
export const loadUrl = ({ url = '' }) => {
    window.location.hash = url;

    /**
     * If we want reload same route force hash.
     */
    if (url === previousUrl || previousUrl === '') {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }

    previousUrl = url;
};
