import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
} from '../main-store/constant';
import { mainStore } from '../main-store/main-store';
import { HISTORY_BACK, HISTORY_NEXT, HISTORY_NONE } from './constant';
import { loadRoute } from './load-route';
import { tryRedirect } from './redirect';
import { getIndex } from './route-list';
import { getRestoreScrollVale, getRouteModule, getTemplateName } from './utils';

/** @type {string} */
let previousHash = '';

/** @type {string} */
let previousParamsToPush = '';

/** @type {string | undefined} */
let currentStringParams;

/** @type {boolean | undefined} */
let currentSkipTransition;

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
 * @param {Record<string, any> | undefined} params
 * @returns {string | undefined}
 */
const convertObjectParamsToString = (params) => {
    return (
        params &&
        Object.entries(params).reduce((previous, [key, value], index) => {
            const currentJoin = index === 0 ? '' : '&';
            return `${previous}${currentJoin}${key}=${value}`;
        }, '')
    );
};

const scrollYValues = new Map();

let currentTime = 0;
let lastTime = 0;

/**
 * Get hash from url and load new route.
 *
 * If shouldLoadRoute is false, update only mainStore currentRoute etc...
 *
 * @param {object} [params]
 * @param {boolean} [params.shouldLoadRoute]
 * @returns {Promise<void>}
 */
export const parseUrlHash = async ({ shouldLoadRoute = true } = {}) => {
    const originalHash = globalThis.location.hash.slice(1);
    const id = MobCore.getUnivoqueId();
    const time = MobCore.getTime();

    const historyObejct = {
        hash: originalHash,
        time,
        id,
    };

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

    /**
     * Get route after redirect.
     */
    const { route: currentRoute, isRedirect } = tryRedirect({
        route: originalHash,
    });

    /**
     * If redirect update hash url.
     */
    if (isRedirect) {
        history.replaceState({ nextId: historyObejct }, '', `#${currentRoute}`);
    }

    const parts = currentRoute.split('?');
    const search = sanitizeParams(parts?.[1] ?? '');

    /**
     * Get final hash/params value.
     */
    const hash = sanitizeHash(parts?.[0] ?? '');
    const params = getParams(currentStringParams ?? search);

    /**
     * Update browser history.
     */
    const paramsToPush =
        currentStringParams || Object.keys(search).length > 0
            ? `?${currentStringParams ?? search}`
            : '';

    if (!currentHistory && shouldLoadRoute) {
        history.replaceState(
            { nextId: { ...historyObejct } },
            '',
            `#${hash}${paramsToPush}`
        );

        scrollYValues.set(id, {
            hash: originalHash,
            scrollY: window.scrollY,
            time,
        });
    }

    /**
     * Reset last search value ( id come form loadUrl function ).
     */
    currentStringParams = undefined;

    /**
     * Store previous hash.
     */
    previousHash = hash;

    /**
     * Store previous paramsToPush.
     */
    previousParamsToPush = paramsToPush;

    const targetRoute = getRouteModule({ url: hash });
    const targetTemplate = getTemplateName({
        url: hash && hash.length > 0 ? hash : getIndex(),
    });

    /**
     * Load route.
     */
    if (shouldLoadRoute) {
        const setItem = scrollYValues.get(currentHistory?.id);

        lastTime = currentTime;
        currentTime = setItem?.time ?? 0;

        /**
         * The following code get scrollDirection. Is not used at moment so add eslint disable comment
         */

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const direction = (() => {
            if (!currentHistory || currentTime === lastTime)
                return HISTORY_NONE;
            if (currentTime > 0 && lastTime === 0) return HISTORY_BACK;
            if (currentTime > lastTime) return HISTORY_NEXT;
            if (currentTime < lastTime) return HISTORY_BACK;
            return '';
        })();

        /**
         * If does not come from currentHistory restore scroll is always false
         *
         * - It means direct navigate
         */
        await loadRoute({
            route: targetRoute,
            templateName: targetTemplate,
            isBrowserNavigation:
                getRestoreScrollVale({ url: hash }) && !!currentHistory,
            params,
            skipTransition:
                (currentHistory ?? currentSkipTransition) ? true : false,
        });
    }

    /**
     * Update only current route/template/params
     */
    if (!shouldLoadRoute) {
        mainStore.set(MAIN_STORE_ACTIVE_ROUTE, {
            route: targetRoute,
            templateName: targetTemplate,
        });
        mainStore.set(MAIN_STORE_ACTIVE_PARAMS, params);
    }

    /**
     * Reset current skip transition value.
     */
    currentSkipTransition = undefined;
};

/**
 * Initialize router.
 */
export const router = () => {
    parseUrlHash();

    /**
     * Prevent browser to force scroll position.
     */
    globalThis.history.scrollRestoration = 'manual';

    /**
     * Intecept pop state ( browser history )
     */
    globalThis.addEventListener('popstate', (event) => {
        currentHistory = event?.state?.nextId;
    });

    /**
     * Every time hash ( route ) change.
     */
    globalThis.addEventListener('hashchange', () => {
        parseUrlHash();
    });
};

/**
 * Set hash in current browser url.
 *
 * @param {object} params
 * @param {string} [params.url]
 * @param {Record<string, any>} [params.params]
 * @param {boolean} [params.skipTransition]
 * @returns Void
 */
export const loadUrl = ({ url, params, skipTransition }) => {
    if (!url) return;

    currentSkipTransition = skipTransition;

    const parts = url.split('?');

    /**
     * Isolate hash, without # character.
     */
    const hash = sanitizeHash(parts?.[0] ?? '');

    /**
     * Convert object params in string. Params will be stored as strign for history navigation
     */
    const objectParams = convertObjectParamsToString(params);
    const stringParams = sanitizeParams(parts?.[1] ?? '');

    /**
     * Extract current params, to use later ( in getHash function ).
     */
    const urlsParams = objectParams ?? stringParams;
    if (urlsParams.length > 0) currentStringParams = urlsParams;

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
