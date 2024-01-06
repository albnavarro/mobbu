// @ts-check
import { mainStore } from '../mainStore/mainStore';
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

let previousHash = '';
let currentSearch;

/**
 * @param {string} value
 * @returns {string}
 */
const sanitizeParams = (value) => {
    return value.replace('?', '').replace('/', '');
};

/**
 * @param {string} value
 * @returns {{[key:string]:any}}
 */
const getParams = (value) => {
    return value.split('&').reduce((previous, current) => {
        const currentParams = current.split('=');
        const key = sanitizeParams(currentParams?.[0] ?? '');
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
    const params = getParams(currentSearch ?? window.location.search);

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) return;

    /**
     * Reset last search value ( id come form loadUrl function ).
     */
    currentSearch = undefined;

    /**
     * Store previous hash.
     */
    previousHash = hash;

    /**
     * Remove params from url.
     */
    window.history.pushState(
        {},
        document.title,
        window.location.pathname + window.location.hash
    );

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
    const hashPosition = url.indexOf('#');

    /**
     * Isolate hash, without # character.
     */
    const hash =
        hashPosition > -1
            ? url.slice(Math.max(0, hashPosition)).replace('#', '')
            : url.replace('#', '');

    /**
     * Extract current params, to use later ( in getHash function ).
     */
    const search = url.slice(0, Math.max(0, hashPosition));
    if (search.length > 0) currentSearch = search;

    /**
     * Update hash without params.
     */
    window.location.hash = hash;

    /**
     * If we want reload same route from same hash, maybe params is different.
     */
    if (hash === previousHash || previousHash === '') {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
};
