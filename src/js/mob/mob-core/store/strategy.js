export const STORE_STRATEGY_SHALLOW_COPY = 'store_shallow_copy';
export const STORE_STRATEGY_CUSTOM_COPY = 'store_custom_copy';
export const STORE_STRATEGY_DEFAULT = 'store_default';

/**
 * - SHALLOW COPY.
 *
 * Create a copy of `wrapper` witch contains data.
 *
 * Propierties refer to original data. Proxies use original state in map
 *
 * - CUSTOM COPY
 *
 * In getStateFromMainMap() is possible return a custom copy of data.
 *
 * In this case proxies refer to last update state.
 *
 * - DEFAULT
 *
 * Refer directly to original data.
 *
 * BOTH CASE:
 *
 * In both case, for consistency, data is update like use CUSTOM COPY strategy.
 *
 * @type {string}
 */
export const storeCopyStrategy = STORE_STRATEGY_CUSTOM_COPY;
