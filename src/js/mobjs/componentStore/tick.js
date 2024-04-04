// @ts-check

import { mobCore } from '../../mobCore';

/**
 * @type {Map<string,string>}
 */
const queque = new Map();

/**
 * Limit queque size.
 * Prevent possible side effect
 */
const maxQueuqueSize = 1000;

/**
 * @param {any} props
 * @returns {() => void}
 */
export const incrementTickQueuque = (props) => {
    if (queque.size >= maxQueuqueSize) {
        console.warn(`maximum loop event reached: (${maxQueuqueSize})`);

        return () => {};
    }

    const id = mobCore.getUnivoqueId();
    queque.set(id, props);

    return () => queque.delete(id);
};

/**
 * @description
 *
 * @returns {Promise<void>}
 */
function awaitNextLoop() {
    return new Promise((resolve) => mobCore.useNextLoop(() => resolve()));
}

/**
 * @description
 *
 * @returns {boolean}
 */
const queueIsResolved = () => {
    return queque.size === 0 || queque.size >= maxQueuqueSize;
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
export const tick = async ({ debug = false, previousResolve } = {}) => {
    await awaitNextLoop();

    if (debug) {
        queque.forEach((value) => {
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

        tick({ debug, previousResolve: previousResolve ?? resolve });
    });
};
