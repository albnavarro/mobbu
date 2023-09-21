// @ts-check

import { getUnivoqueId } from '../../utils';

/**
 * @typedef {Object} visibilityChangeTYpe
 * @prop {('hidden'|'visible')} visibilityState - Boolean value indicating the visibility status of the current tab-
 */

/**
 * @type {Boolean}
 */
let inizialized = false;

/**
 * @type {Map<String,Function>}
 */
const callbacks = new Map();

/**
 *
 */
function handler() {
    /**
     * if - if there is no subscritor remove handler
     */
    if (callbacks.size === 0) {
        window.removeEventListener('visibilitychange', handler);

        inizialized = false;
        return;
    }

    // Prepare data to callback
    const visibilityData = {
        visibilityState: document.visibilityState,
    };

    for (const value of callbacks.values()) {
        value(visibilityData);
    }
}

/**
 * init - if istener is not inizializad remove it
 *
 * @return {void}
 */
function init() {
    if (inizialized) return;
    inizialized = true;

    window.addEventListener('visibilitychange', handler, {
        passive: false,
    });
}

/**
 * @description
 * Add callback on tab change
 *
 * @param {function(visibilityChangeTYpe):void } cb - callback function fired on tab change.
 * @returns function
 *
 * @example
 * ```javascript
 *  const unsubscribe = handleVisibilityChange(({ visibilityState }) => {
 *      // code
 *  });
 *
 *  unsubscribe()
 *
 * ```
 */
const addCb = (cb) => {
    const id = getUnivoqueId();
    callbacks.set(id, cb);

    if (typeof window !== 'undefined') {
        init();
    }

    return () => callbacks.delete(id);
};

export const handleVisibilityChange = (() => addCb)();
