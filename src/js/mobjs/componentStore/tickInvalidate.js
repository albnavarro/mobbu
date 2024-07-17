// @ts-check

import { mobCore } from '../../mobCore';
import { awaitNextLoop } from './utils';

/**
 * @type {Map<string,string>}
 */
const InvalidateQueque = new Map();

/**
 * @returns {boolean}
 */
export const invalidateQuequeIsEmpty = () => InvalidateQueque.size === 0;

/**
 * Limit queque size.
 * Prevent possible side effect
 */
const maxQueuqueSize = 1000;

/**
 * @param {any} props
 * @returns {() => void}
 */
export const incrementInvalidateTickQueuque = (props) => {
    if (InvalidateQueque.size >= maxQueuqueSize) {
        console.warn(`maximum loop event reached: (${maxQueuqueSize})`);

        return () => {};
    }

    const id = mobCore.getUnivoqueId();
    InvalidateQueque.set(id, props);

    return () => InvalidateQueque.delete(id);
};

/**
 * @description
 *
 * @returns {boolean}
 */
const queueIsResolved = () => {
    return (
        InvalidateQueque.size === 0 || InvalidateQueque.size >= maxQueuqueSize
    );
};

/**
 * @description
 * Await that all bind props is completed
 *
 * @param {object} params
 * @param {boolean} [ params.debug ]
 * @param {(value: void | PromiseLike<void>) => void} [ params.previousResolve ]
 * @returns {Promise<void>}
 */
export const invalidateTick = async ({
    debug = false,
    previousResolve,
} = {}) => {
    await awaitNextLoop();

    if (debug) {
        InvalidateQueque.forEach((value) => {
            console.log(value);
        });
    }

    if (queueIsResolved() && previousResolve) {
        previousResolve();
        return;
    }

    return new Promise((resolve) => {
        if (queueIsResolved()) {
            resolve();
            return;
        }

        invalidateTick({
            debug,
            previousResolve: previousResolve ?? resolve,
        });
    });
};
