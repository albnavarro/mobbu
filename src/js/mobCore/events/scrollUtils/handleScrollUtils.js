// @ts-check

import { handleScrollImmediate } from './handleScrollImmediate.js';
import { debounceFuncion } from '../debounce.js';
import { handleFrame } from '../rafutils/handleFrame.js';
import { handleNextTick } from '../rafutils/handleNextTick.js';
import { getUnivoqueId } from '../../utils/index.js';

/**
 * @type {() => void}
 */
let unsubscribeScrollStart = () => {};

/**
 * @type {() => void}
 */
let unsubscribeScrollEnd = () => {};

/**
 * @type {any}
 */
let debouceFunctionReference = () => {};

/**
 * @param {('START'|'END')} type
 */
function handleScrollUtils(type) {
    /**
     * @type {boolean}
     */
    let initialized = false;

    /**
     * @type {Map<string,import('./type.js').handleScrollUtilsCallback>}
     */
    const callbacks = new Map();

    /**
     * @type {boolean}
     */
    let isScrolling = false;

    /**
     * @returns void
     */
    function handler() {
        isScrolling = false;

        /**
         * if - if there is no subscritor remove handler
         */
        if (callbacks.size === 0) {
            unsubscribeScrollEnd();

            // Unsubscribe from scroll callback
            if (type === 'START') {
                unsubscribeScrollStart();
            }

            initialized = false;
            return;
        }

        handleFrame.add(() => {
            handleNextTick.add(() => {
                // Prepare data to callback
                const scrollData = {
                    scrollY: window.scrollY,
                };

                // Fire end of scroll
                if (type === 'END') {
                    for (const value of callbacks.values()) {
                        value(scrollData);
                    }
                }
            }, 0);
        });
    }

    /**
     * init - if listener is not inizializad remove it
     *
     * @return {void}
     */
    function init() {
        if (initialized) return;
        initialized = true;

        // Add debunce function to detect scroll end
        debouceFunctionReference = debounceFuncion(() => handler());
        unsubscribeScrollEnd = handleScrollImmediate(debouceFunctionReference);

        // Use normal scroll event ( no debuonce ) to detect if page is scrolling
        if (type === 'START') {
            unsubscribeScrollStart = handleScrollImmediate(({ scrollY }) => {
                const scrollData = {
                    scrollY,
                };

                // At first scroll isScrolling is false
                // Fire event ad set isScrolling to true
                // At debounce end isScrolling return to false to trigger next scroll
                if (!isScrolling) {
                    isScrolling = true;

                    for (const value of callbacks.values()) {
                        value(scrollData);
                    }
                }
            });
        }
    }

    /**
     * @param {import('./type.js').handleScrollUtilsCallback} cb - callback function
     * @return {() => void} unsubscribe callback
     */
    const addCb = (cb) => {
        const id = getUnivoqueId();
        callbacks.set(id, cb);

        if (typeof globalThis !== 'undefined') {
            init();
        }

        return () => callbacks.delete(id);
    };

    return addCb;
}

/**
 * @description
 * Execute a callback at the beginning of the scroll
 *
 * @example
 * ```javascript
 * const unsubscribe = handleScrollStart(({ scrollY }) => {
 *     // code
 * });
 *
 * unsubscribe()
 *
 * ```
 */
export const handleScrollStart = handleScrollUtils('START');

/**
 * @description
 * Execute a callback at the end of the scroll
 *
 * @example
 * ```javascript
 * const unsubscribe = handleScrollEnd(({ scrollY }) => {
 *     // code
 * });
 *
 * unsubscribe()
 *
 * ```
 */
export const handleScrollEnd = handleScrollUtils('END');
