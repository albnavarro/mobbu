import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_ROUTE_IS_LOADING,
} from '../main-store/constant';
import { mainStore } from '../main-store/main-store';
import { awaitNextLoop } from '../queque/utils';
import { loadPage } from './load-page';
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

/**
 * Flag "in attesa di essere consumato dal prossimo hashchange".
 *
 * - Viene alzato (true) dal listener `popstate` quando arriva una navigazione storica del browser (back/forward).
 * - Viene consumato (letto + riportato a false) in modo SINCRONO dal listener `hashchange`, prima di qualsiasi `await`.
 *   Il valore letto viene passato a `parseUrlHash` come parametro `fromHistory`.
 *
 * Perché un flag consumato atomicamente invece di una variabile modulo letta tardi: fra il `popstate` e il momento in
 * cui `parseUrlHash` è in grado di leggere il suo valore c'è un `await awaitNextLoop()`. Durante questa finestra un
 * secondo `popstate` o una `loadUrl` programmatica possono sovrascrivere il segnale, facendo sì che il primo handler
 * legga un valore non suo. Il consumo atomico ("snapshot" + reset prima dell'await) isola ogni ciclo hashchange dai
 * successivi.
 *
 * @type {boolean}
 */
let pendingHistoryNavigation = false;

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
 * Legge l'hash corrente dalla URL e carica la nuova rotta.
 *
 * Se `shouldLoadRoute` è false, aggiorna solo `mainStore` (currentRoute, currentTemplate, activeParams) senza eseguire
 * il caricamento vero e proprio.
 *
 * `fromHistory` è passato dal listener `hashchange` dopo il consumo di `pendingHistoryNavigation`. Segnala che questa
 * esecuzione deriva da una navigazione storica del browser (back/forward) e non da una navigazione diretta o
 * programmatica. Influenza:
 *
 * - Se scrivere o no una nuova entry in `history.replaceState`
 * - Il valore di `isBrowserNavigation` inviato a `loadPage` (scroll restore)
 * - Il valore di `skipTransition` inviato a `loadPage`
 *
 * @param {object} [params]
 * @param {boolean} [params.shouldLoadRoute]
 * @param {boolean} [params.fromHistory]
 * @returns {Promise<void>}
 */
export const parseUrlHash = async ({
    shouldLoadRoute = true,
    fromHistory = false,
} = {}) => {
    const fullHashWithParmas = globalThis.location.hash;

    const historyObejct = {
        hash: fullHashWithParmas,
    };

    /**
     * Prevent multiple routes start at same time.
     *
     * - Fallback to click preventDefault logic.
     */
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) {
        /**
         * Forza visivamante l'hash nell' url a tornare allo stato precedente.
         *
         * - Pro: semplice.
         * - Cons: i tentativi di load saranno cmq nella history.
         */
        globalThis.location.hash = previousFullHashLoaded.replace('#', '');
        return;
    }

    /**
     * Set history, to restore scroll value.
     */
    if (!fromHistory)
        history.replaceState({ nextId: historyObejct }, '', fullHashWithParmas);

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

    const targetRoute = getRouteModule({ hash: currentCleanHash });
    const targetTemplate = getTemplateName({
        hash:
            currentCleanHash && currentCleanHash.length > 0
                ? currentCleanHash
                : getIndex(),
    });

    /**
     * Avoid to load same route twice. TODO make optional with a global props.
     *
     * - If params is used route is always reloaded, params may change.
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
         * If does not come from history navigation restore scroll is always false
         *
         * - It means direct navigate
         */
        await loadPage({
            route: targetRoute,
            templateName: targetTemplate,
            isBrowserNavigation:
                getRestoreScrollVale({ hash: currentCleanHash }) && fromHistory,
            params,
            skipTransition: fromHistory || currentSkipTransition ? true : false,
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
     * Intercetta il popstate (navigazione history del browser).
     *
     * Alza il flag `pendingHistoryNavigation` per segnalare al prossimo hashchange che la navigazione deriva da
     * back/forward. Controlliamo `event?.state?.nextId` (non solo `event?.state`) per riconoscere solo le entry scritte
     * da questo modulo: state esterni con shape diversa vengono trattati come direct-nav.
     */
    globalThis.addEventListener('popstate', (event) => {
        pendingHistoryNavigation = !!event?.state?.nextId;
    });

    /**
     * Ad ogni cambio di hash (route).
     *
     * Consumiamo `pendingHistoryNavigation` in modo SINCRONO prima di qualsiasi `await`: in questo modo un eventuale
     * secondo popstate o una `loadUrl` programmatica scatenati durante `awaitNextLoop` non possono sovrascrivere il
     * segnale appartenente a questo ciclo hashchange. Il valore catturato viene passato a `parseUrlHash` come parametro
     * locale.
     */
    globalThis.addEventListener('hashchange', async () => {
        const fromHistory = pendingHistoryNavigation;
        pendingHistoryNavigation = false;
        await awaitNextLoop();
        parseUrlHash({ fromHistory });
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
     * Una navigazione programmatica (loadUrl) per definizione NON è una navigazione storica del browser.
     *
     * Abbassiamo il flag in modo SINCRONO prima di modificare `location.hash`: la hashchange che sta per essere
     * scatenata dal cambio di hash leggerà così `pendingHistoryNavigation = false` e passerà `fromHistory = false` a
     * `parseUrlHash`.
     *
     * Caso utile: l'utente ha appena cliccato Back (popstate ha alzato il flag) e subito dopo una `loadUrl` viene
     * chiamata. Senza questo reset la hashchange risultante dalla `loadUrl` potrebbe essere erroneamente interpretata
     * come history-nav, ripristinando lo scroll invece di partire da zero.
     */
    pendingHistoryNavigation = false;

    /**
     * Update hash and dispatch hashcange.
     */
    globalThis.location.hash =
        currentParamsFromLoadUrl && currentParamsFromLoadUrl.length > 0
            ? `${hash}?${currentParamsFromLoadUrl}`
            : hash;

    /**
     * OLD - TO REMOVE.
     *
     * - GlobalThis.location.hash -> browser dispatch hashcange here.
     * - Trigger hashchange. This step is need to reload route with params.
     * - If not previous hash is always different from current.
     */
    // globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
};
