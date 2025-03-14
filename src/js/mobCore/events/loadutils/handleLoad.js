// @ts-check

import { getUnivoqueId } from '../../utils';

/**
 * @type{boolean}
 */
let initialized = false;

/**
 * @type {Map<string,() => void>}
 */
const callbacks = new Map();

/**
 * @return void
 */
function handler() {
    /**
     * if - if there is no subscritor remove handler
     */
    if (callbacks.size === 0) {
        globalThis.removeEventListener('DOMContentLoaded', handler);

        initialized = false;
        return;
    }

    // Fire end of resize
    for (const value of callbacks.values()) {
        value();
    }
    callbacks.clear();
}

/**
 * @description
 * init - if listener is not inizializad add it
 *
 * @return {void}
 */
function init() {
    if (initialized) return;
    initialized = true;

    // Add debunce function to detect scroll end
    globalThis.addEventListener('DOMContentLoaded', handler, {
        passive: false,
    });
}

/**
 * @description
 * Add callback on page load
 *
 * @param {() => void} cb - Callback function executed on page load
 * @returns {() => void}
 *
 * @example
 * ```javascript
 *
 * handleLoad(() => {
 *     ...
 * });
 *
 * ```
 */
const addCallback = (cb) => {
    const id = getUnivoqueId();
    callbacks.set(id, cb);

    if (typeof globalThis !== 'undefined') {
        init();
    }

    return () => callbacks.delete(id);
};

/**
 * @description Function to execute a callback on page load
 */
export const handleLoad = (() => addCallback)();
