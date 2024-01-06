// @ts-check
import { mainStore } from '../mainStore/mainStore';
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

let previousUrl = '';

/**
 * @param {string} value
 * @returns {{[key:string]:any}}
 */
const getParams = (value) => {
    return value.split('&').reduce((previous, current) => {
        const currentParams = current.split('=');
        const key = currentParams[0]?.replace('?', '');
        const value = currentParams?.[1];

        return key && key.length > 0 ? { ...previous, [key]: value } : previous;
    }, {});
};

/**
 * @description
 * Get hash from url and load new route.
 */
const getHash = () => {
    const hash = window.location.hash.slice(1);
    const params = getParams(window.location.search);

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) return;

    /**
     * Load.
     */
    loadRoute({
        route: getRouteModule({ url: hash }),
        params,
    });
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
