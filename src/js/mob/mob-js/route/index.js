import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
} from '../main-store/constant';
import { mainStore } from '../main-store/main-store';
import { loadRoute } from './load-route';
import { tryRedirect } from './redirect';
import { getIndex } from './route-list';
import { getRestoreScrollVale, getRouteModule, getTemplateName } from './utils';

/** @type {boolean} */
let firstAppLoad = true;

/** @type {string} */
let currentCleanHash = '';

/** @type {string} */
let previousCleanHash = '';

/** @type {string} */
let currentParamsToPush = '';

/** @type {string} */
let previousParamsToPush = '';

/** @type {string | undefined} */
let currentStringParams;

/** @type {boolean | undefined} */
let currentSkipTransition;

/** @type {import('./type').HistoryType | undefined} */
let currentHistory;

let shouldWaitNextHash = false;

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
    const fullHashWithParmas = globalThis.location.hash.slice(1);

    const id = MobCore.getUnivoqueId();
    const time = MobCore.getTime();

    const historyObejct = {
        hash: fullHashWithParmas,
        time,
        id,
    };

    /**
     * Get route after redirect.
     */
    const { route: currentRoute, isRedirect } = tryRedirect({
        route: fullHashWithParmas,
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
    previousCleanHash = currentCleanHash;
    currentCleanHash = sanitizeHash(parts?.[0] ?? '');

    /**
     * - CurrentStringParams is settled by loadUtl javascript function.
     * - Search is settles by href
     */
    const params = getParams(currentStringParams ?? search);

    /**
     * Update browser history.
     */
    previousParamsToPush = currentParamsToPush;
    currentParamsToPush =
        currentStringParams || Object.keys(search).length > 0
            ? `?${currentStringParams ?? search}`
            : '';

    /**
     * If links come from loadUrl function need to add manually params.
     */
    if (!currentHistory && shouldLoadRoute) {
        /**
         * When update history with params avoid to load route twice.
         *
         * - ReplaceStatefile another route load.
         * - Wait one loop then reset shouldWaitNextHash value.
         */
        shouldWaitNextHash = true;

        history.replaceState(
            { nextId: { ...historyObejct } },
            '',
            `#${currentCleanHash}${currentParamsToPush}`
        );
    }

    /**
     * Reset last search value ( id come form loadUrl function ).
     */
    currentStringParams = undefined;

    const targetRoute = getRouteModule({ url: currentCleanHash });
    const targetTemplate = getTemplateName({
        url:
            currentCleanHash && currentCleanHash.length > 0
                ? currentCleanHash
                : getIndex(),
    });

    /**
     * Avoid to load same route twice. TODO make optional with a global props.
     *
     * - First time this function launched twice for update current route on filrst load before wrapper is loaded.
     * - So firstAppLoad is used.
     */
    const isSamePreviousRoute =
        currentCleanHash === previousCleanHash &&
        currentParamsToPush === previousParamsToPush &&
        !firstAppLoad;

    /**
     * Load route.
     */
    if (shouldLoadRoute && !isSamePreviousRoute) {
        /**
         * If does not come from currentHistory restore scroll is always false
         *
         * - It means direct navigate
         */
        await loadRoute({
            route: targetRoute,
            templateName: targetTemplate,
            isBrowserNavigation:
                getRestoreScrollVale({ url: currentCleanHash }) &&
                !!currentHistory,
            params,
            skipTransition:
                (currentHistory ?? currentSkipTransition) ? true : false,
        });
    }

    /**
     * Update only current route/template/params
     *
     * - Used first time to update store before wrapper is loaded.
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

    MobCore.useNextLoop(() => {
        /**
         * Now is possible load next route without load twice same route.
         */
        shouldWaitNextHash = false;
        firstAppLoad = false;
    });
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
        /**
         * Same route loaded in same event loop, skip.
         */
        if (shouldWaitNextHash) return;

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
    if (hash === previousCleanHash || previousCleanHash === '') {
        globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
    }
};
