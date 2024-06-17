// @ts-check

import { mobCore } from '../../mobCore';
import { mainStore } from '../mainStore/mainStore';
import { getLastHistoryScrollY, setHistoryScrollY } from './historyScrollY';
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

let previousHash = '';
let previousParamsToPush = '';
let currentSearch;

/**
 * @type {string|undefined}
 */
let comeFrombackId;

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
const hashHandler = async () => {
    const historyId = mobCore.getUnivoqueId();

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) {
        /**
         * Restore previous hash/params.
         */
        history.replaceState(
            { nextId: historyId },
            '',
            `#${previousHash}${previousParamsToPush}`
        );
        return;
    }

    const hashOriginal = window.location.hash.slice(1);
    const parts = hashOriginal.split('?');
    const search = sanitizeParams(parts?.[1] ?? '');

    /**
     * Get final hash/params value.
     */
    const hash = sanitizeHash(parts?.[0] ?? '');
    const params = getParams(currentSearch ?? search);

    /**
     * Update browser history.
     */
    const paramsToPush =
        currentSearch || Object.keys(search).length > 0
            ? `?${currentSearch ?? search}`
            : '';

    /**
     * set unique id to route.
     * Useful in poState to check if come from backButton
     */
    history.replaceState({ nextId: historyId }, '', `#${hash}${paramsToPush}`);
    const valueY = window.scrollY;

    /**
     * Reset last search value ( id come form loadUrl function ).
     */
    currentSearch = undefined;

    /**
     * Store previous hash.
     */
    previousHash = hash;

    /**
     * Store previous paramsToPush.
     */
    previousParamsToPush = paramsToPush;

    /**
     * Load.
     */
    await loadRoute({
        route: getRouteModule({ url: hash }),
        params,
        scrollY: comeFrombackId ? getLastHistoryScrollY() : 0,
        comeFromHistory: comeFrombackId ? true : false,
    });

    if (!comeFrombackId) setHistoryScrollY(valueY);
};

/**
 * @description
 * Initialize router.
 */
export const router = () => {
    hashHandler();

    window.addEventListener('popstate', (event) => {
        comeFrombackId = event?.state?.nextId;
    });

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
