// @ts-check

import { MobCore } from '../../mob-core';
import { mainStore } from '../main-store/main-store';
import { HISTORY_BACK, HISTORY_NEXT } from './constant';
import {
    historyBackSize,
    getLastHistory,
    getLastHistoryNext,
    resetNext,
    setHistoryBack,
    setHistoryNext,
} from './scroll';
import { loadRoute } from './load-route';
import { getRestoreScrollVale, getRouteModule, getTemplateName } from './utils';

/** @type {string} */
let previousHash = '';

/** @type {string} */
let previousParamsToPush = '';

/** @type {string | undefined} */
let currentSearch;

/** @type {string} */
let historyDirection = 'back';

/**
 * @type {import('./type').HistoryType | undefined}
 */
let previousHistory;

/**
 * @type {import('./type').HistoryType | undefined}
 */
let currentHistory;

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
 * @returns {{ [key: string]: any }}
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
 * Get hash from url and load new route.
 */
const hashHandler = async () => {
    const historyObejct = { time: MobCore.getTime(), scrollY: window.scrollY };

    /**
     * Prevent multiple routes start at same time.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) {
        /**
         * Restore previous hash/params.
         */
        history.replaceState(
            { nextId: historyObejct },
            '',
            `#${previousHash}${previousParamsToPush}`
        );
        return;
    }

    const hashOriginal = globalThis.location.hash.slice(1);
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
     * Set unique id to route. Useful in poState to check if come from backButton
     */
    if (!currentHistory)
        history.replaceState(
            { nextId: historyObejct },
            '',
            `#${hash}${paramsToPush}`
        );

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
    if (!currentHistory) {
        setHistoryBack(historyObejct);
    }

    // salvo il vaslore dello scroll corrente
    if (currentHistory && historyDirection === HISTORY_BACK) {
        setHistoryNext(historyObejct);
    }

    // salvo il vaslore corrente di next in back
    if (currentHistory && historyDirection === HISTORY_NEXT) {
        setHistoryBack(getLastHistoryNext());
    }

    /**
     * Load.
     */
    await loadRoute({
        route: getRouteModule({ url: hash }),
        templateName: getTemplateName({ url: hash }),
        restoreScroll: getRestoreScrollVale({ url: hash }),
        params,
        scrollY: currentHistory
            ? (getLastHistory(historyDirection)?.scrollY ?? 0)
            : 0,
        comeFromHistory: currentHistory ? true : false,
    });
};

/**
 * Initialize router.
 */
export const router = () => {
    hashHandler();

    globalThis.addEventListener('popstate', (event) => {
        currentHistory = event?.state?.nextId;

        /**
         * First back
         */
        if (currentHistory && !previousHistory && historyBackSize() > 0) {
            previousHistory = currentHistory;
            historyDirection = HISTORY_BACK;
            return;
        }

        /**
         * Next
         */
        if (
            currentHistory &&
            previousHistory &&
            previousHistory?.time > currentHistory?.time &&
            historyBackSize() > 0
        ) {
            previousHistory = currentHistory;
            historyDirection = HISTORY_BACK;
            return;
        }

        /**
         * Prev
         */
        if (
            currentHistory &&
            previousHistory &&
            previousHistory?.time < currentHistory?.time
        ) {
            previousHistory = currentHistory;
            historyDirection = HISTORY_NEXT;
            return;
        }

        previousHistory = undefined;
        historyDirection = '';

        /**
         * Normal mode reset next
         */
        resetNext();
    });

    globalThis.addEventListener('hashchange', () => {
        hashHandler();
    });
};

/**
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
    globalThis.location.hash = hash;

    /**
     * If we want reload same route from same hash, maybe params is different.
     */
    if (hash === previousHash || previousHash === '') {
        globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
    }
};
