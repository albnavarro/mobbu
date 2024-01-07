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
 * @returns {string}
 */
const sanitizeHash = (value) => {
    return value.replace('#', '').replace('/', '').replace('.', '');
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
const hashHandler = () => {
    const hashOriginal = window.location.hash.slice(1);
    const parts = hashOriginal.split('?');
    const search = sanitizeParams(parts?.[1] ?? '');

    /**
     * Get final hash/params value.
     */
    const hash = sanitizeHash(parts?.[0] ?? '');
    const params = getParams(currentSearch ?? search);

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) return;

    /**
     * Update browser history.
     */
    const paramsToPush =
        currentSearch || Object.keys(search).length > 0
            ? `?${currentSearch ?? search}`
            : '';
    history.replaceState({}, '', `#${hash}${paramsToPush}`);

    /**
     * Reset last search value ( id come form loadUrl function ).
     */
    currentSearch = undefined;

    /**
     * Store previous hash.
     */
    previousHash = hash;

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
    hashHandler();

    window.addEventListener('hashchange', () => {
        hashHandler();
    });
};

/**
 * @description
 * Set hash in current browser url.
 */
export const loadUrl = ({ url = '' }) => {
    const parts = url.split('?');

    /**
     * Isolate hash, without # character.
     */
    const hash = sanitizeHash(parts?.[0] ?? '');

    /**
     * Extract current params, to use later ( in getHash function ).
     */
    const search = sanitizeParams(parts?.[1] ?? '');
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
