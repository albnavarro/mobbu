// @ts-check

import { handleScrollImmediate } from './handleScrollImmediate.js';
import { debounceFuncion } from '../debounce.js';
import { handleFrame } from '../rafutils/handleFrame.js';
import { handleNextTick } from '../rafutils/handleNextTick.js';

/**
 * @typedef {Object} handleScrollUtilsType
 * @prop {number} scrollY - Scroll position
 */

/**
 * @type {function}
 */
let unsubscribeScrollStart = () => {};

/**
 * @type {function}
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
     * @type {Boolean}
     */
    let inizialized = false;

    /**
     * @type {Array.<{id:number, cb:Function }>}
     */
    let callback = [];

    /**
     * @type {Number}
     */
    let id = 0;

    /**
     * @type {Boolean}
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
        if (callback.length === 0) {
            unsubscribeScrollEnd();

            // Unsubscribe from scroll callback
            if (type === 'START') {
                unsubscribeScrollStart();
            }

            inizialized = false;
            return;
        }

        handleFrame.add(() => {
            handleNextTick.add(() => {
                // Prepare data to callback
                const scrollData = {
                    scrollY: window.pageYOffset,
                };

                // Fire end fo scroll
                if (type === 'END') {
                    callback.forEach(({ cb }) => {
                        cb(scrollData);
                    });
                }
            }, 0);
        });
    }

    /**
     * init - if istener is not inizializad remove it
     *
     * @return {void}
     */
    function init() {
        if (inizialized) return;
        inizialized = true;

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

                    callback.forEach(({ cb }) => {
                        cb(scrollData);
                    });
                }
            });
        }
    }

    /**
     * @param {function(handleScrollUtilsType):void } cb - callback function
     * @return {Function} unsubscribe callback
     */
    const addCb = (cb) => {
        callback.push({ cb, id: id });
        const cbId = id;
        id++;

        if (typeof window !== 'undefined') {
            init();
        }

        return () => {
            callback = callback.filter((item) => item.id !== cbId);
        };
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
