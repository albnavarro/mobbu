// @ts-check

import { mobCore } from '../../mobCore';

/**
 * @type {number}
 */
let queuqe = 0;

/**
 * @returns {void}
 */
export const incrementTickQueuque = () => {
    queuqe += 1;
};

/**
 * @returns {void}
 */
export const decrementTickQueuque = () => {
    queuqe -= 1;
};

/**
 * @returns {number}
 */
export const getTickQueque = () => queuqe;

/**
 * @description
 *
 * @returns {Promise<void>}
 */
function awaiytNextLoop() {
    return new Promise((resolve) => mobCore.useNextLoop(() => resolve()));
}

/**
 * @description
 * Await that all bind props is completed
 *
 * @param {(value: void | PromiseLike<void>) => void} res
 * @returns {Promise<void>}
 */
export const tick = async (res) => {
    await awaiytNextLoop();

    return new Promise((resolve) => {
        if (queuqe === 0) {
            if (res) {
                res();
                return;
            }

            resolve();
            return;
        }

        tick(res ?? resolve);
    });
};
