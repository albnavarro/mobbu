// @ts-check

import { mobCore } from '../../mobCore';

/**
 * @type {Map<string,string>}
 */
const queuqe = new Map();

/**
 * @param {any} props
 * @returns {() => {}}
 */
export const incrementTickQueuque = (props) => {
    const id = mobCore.getUnivoqueId();
    queuqe.set(id, props);

    return () => queuqe.delete(id);
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
        queuqe.forEach((value) => {
            console.log(value);
        });
    }

    if (queuqe.size === 0 && previousResolve) {
        previousResolve();
        return;
    }

    return new Promise((resolve) => {
        if (queuqe.size === 0) {
            resolve();
            return;
        }

        tick({ debug, previousResolve: previousResolve ?? resolve });
    });
};
