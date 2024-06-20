// @ts-check

import { mobCore } from '../../mobCore';
import { mainStore } from '../mainStore/mainStore';
import {
    getLastHistory,
    getLastHistoryNext2,
    pippodebug,
    setHistoryBack,
    setHistoryNext,
} from './historyScrollY';
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

let previousHash = '';
let previousParamsToPush = '';
let currentSearch;
let historyDirection = 'back';

/**
 * @type {number|undefined}
 */
let prevId;

/**
 * @type {number|undefined}
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
 * @param {number} prevId
 * @description
 * Get hash from url and load new route.
 */
const hashHandler = async (prevId) => {
    const historyId = mobCore.getTime();

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
    if (!prevId)
        history.replaceState(
            { nextId: historyId },
            '',
            `#${hash}${paramsToPush}`
        );

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

    // modalita standard
    // salvo il vaslore dello scroll corrente
    if (!comeFrombackId) {
        console.log('NEW NAVIGATION');
        setHistoryBack(valueY);
    }

    // salvo il vaslore dello scroll corrente
    if (comeFrombackId && historyDirection === 'back') {
        console.log('FROM BACK');
        setHistoryNext(valueY);
    }

    // salvo il vaslore corrente di next in back
    if (comeFrombackId && historyDirection === 'next') {
        console.log('FROM NEXT');
        setHistoryBack(getLastHistoryNext2());
    }

    /**
     * Load.
     */
    await loadRoute({
        route: getRouteModule({ url: hash }),
        params,
        scrollY: comeFrombackId ? getLastHistory(historyDirection) : 0,
        comeFromHistory: comeFrombackId ? true : false,
    });

    pippodebug();
};

/**
 * @description
 * Initialize router.
 */
export const router = () => {
    hashHandler(comeFrombackId);

    window.addEventListener('popstate', (event) => {
        console.log(event.state);
        console.log('pop state');
        comeFrombackId = event?.state?.nextId;

        /**
         * First back
         */
        if (comeFrombackId && !prevId) {
            prevId = comeFrombackId;
            console.log('----BACK----');
            historyDirection = 'back';
            return;
        }

        /**
         * Next
         */
        if (comeFrombackId && prevId > comeFrombackId) {
            prevId = comeFrombackId;
            console.log('----BACK----');
            historyDirection = 'back';
            return;
        }

        /**
         * prev
         */
        if (comeFrombackId && prevId < comeFrombackId) {
            prevId = comeFrombackId;
            console.log('----NEXT----');
            historyDirection = 'next';
            return;
        }

        prevId = undefined;
        historyDirection = '';
    });

    window.addEventListener('hashchange', () => {
        console.log('has change');
        hashHandler(comeFrombackId);
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
