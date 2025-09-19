import { MobCore } from '../../mob-core';
import { awaitNextLoop } from './utils';

/**
 * @type {Map<string, string>}
 */
const repeaterQueque = new Map();

/**
 * @returns {boolean}
 */
export const repeaterQuequeIsEmpty = () => repeaterQueque.size === 0;

/**
 * Limit queque size. Prevent possible side effect
 */
const maxQueuqueSize = 1000;

/**
 * @param {any} props
 * @returns {() => void}
 */
export const incrementRepeaterTickQueuque = (props) => {
    if (repeaterQueque.size >= maxQueuqueSize) {
        console.warn(`maximum loop event reached: (${maxQueuqueSize})`);

        return () => {};
    }

    const id = MobCore.getUnivoqueId();
    repeaterQueque.set(id, props);

    return () => repeaterQueque.delete(id);
};

/**
 * @returns {boolean}
 */
const queueIsResolved = () => {
    return repeaterQueque.size === 0 || repeaterQueque.size >= maxQueuqueSize;
};

/**
 * Await that all bind props is completed
 *
 * @param {object} params
 * @param {boolean} [params.debug]
 * @param {(value: void | PromiseLike<void>) => void} [params.previousResolve]
 * @returns {Promise<void>}
 */
export const repeaterTick = async ({ debug = false, previousResolve } = {}) => {
    await awaitNextLoop();

    if (debug) {
        repeaterQueque.forEach((value) => {
            console.log(value);
        });
    }

    /**
     * After first cycle use previousResolve.
     */
    if (queueIsResolved() && previousResolve) {
        previousResolve();
        return;
    }

    return new Promise((resolve) => {
        /**
         * First loop resolve here if there is no queque.
         *
         * - This check should be true only in first loop.
         * - The other loop is resolved inside previous conditional
         */
        if (queueIsResolved()) {
            resolve();
            return;
        }

        repeaterTick({ debug, previousResolve: previousResolve ?? resolve });
    });
};
