import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_ROUTE_IS_LOADING,
} from '../main-store/constant';
import { mainStore } from '../main-store/main-store';
import { awaitNextLoop } from '../queque/utils';
import { loadRoute } from './load-route';
import { tryRedirect } from './redirect';
import { getIndex } from './route-list';
import { getRestoreScrollVale, getRouteModule, getTemplateName } from './utils';

/** @type {string} */
let previousFullHashLoaded = '';

/** @type {boolean} */
let firstAppLoad = true;

/** @type {string} */
let currentCleanHash = '';

/** @type {string} */
let previousCleanHash = '';

/** @type {string | undefined} */
let currentParamsFromLoadUrl;

/** @type {boolean | undefined} */
let currentSkipTransition;

/** @type {import('./type').HistoryType | undefined} */
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
    const fullHashWithParmas = globalThis.location.hash;

    const historyObejct = {
        hash: fullHashWithParmas,
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
            previousFullHashLoaded
        );
        return;
    }

    /**
     * Set history, to restore scroll value.
     */
    if (!currentHistory) history.replaceState({ nextId: historyObejct }, '');

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
    const params = getParams(currentParamsFromLoadUrl ?? search);

    /**
     * Update browser history.
     */
    const currentParams =
        currentParamsFromLoadUrl || Object.keys(search).length > 0
            ? `?${currentParamsFromLoadUrl ?? search}`
            : '';

    /**
     * Reset last search value ( id come form loadUrl function ).
     *
     * - So, next navigation search is comparlable.
     */
    currentParamsFromLoadUrl = undefined;

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
     * - If params is used route is reloaded, params may change.
     * - First time this function launched twice for update current route on filrst load before wrapper is loaded.
     * - So firstAppLoad is used.
     */
    const isSamePreviousRoute =
        currentCleanHash === previousCleanHash &&
        currentParams.length === 0 &&
        !firstAppLoad;

    /**
     * Load route.
     */
    if (shouldLoadRoute && !isSamePreviousRoute) {
        /**
         * Used to ti restore last route when try to load a route while is loading previous route.
         */
        previousFullHashLoaded = `#${currentCleanHash}${currentParams}`;

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
     * - Specifically beforeRouteChange props of mainStore.
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
    globalThis.addEventListener('hashchange', async () => {
        /**
         * Maybe unnecessary. parseUrlHash() must fired after currentHistory is updated
         */
        await awaitNextLoop();
        parseUrlHash();
    });
};

/**
 * Javascript links
 *
 * - Set hash && params in current browser url.
 *
 * @param {object} params
 * @param {string} [params.url]
 * @param {Record<string, any>} [params.params]
 * @param {boolean} [params.skipTransition]
 * @returns {void}
 */
export const loadUrl = ({ url, params, skipTransition }) => {
    if (!url || mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING)) return;

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
     * Extract current params, to use later
     *
     * - CurrentStringParamsis is 'global' and is used in parseUrlHash() to get params id loadUrl is used.
     */
    const urlsParams = objectParams ?? stringParams;
    currentParamsFromLoadUrl = urlsParams.length > 0 ? urlsParams : '';

    /**
     * Update hash
     */
    globalThis.location.hash =
        currentParamsFromLoadUrl && currentParamsFromLoadUrl.length > 0
            ? `${hash}?${currentParamsFromLoadUrl}`
            : hash;

    /**
     * Trigger hashchange. This step is need to reload route with params.
     *
     * - If not previous hash is always different from current.
     */
    globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
};
