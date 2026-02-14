import { MobCore } from '../../mob-core';
import { awaitNextLoop } from './utils';

/**
 * @type {Map<string, import('./type').InvalidateTickQuequeData>}
 */
const invalidateQueque = new Map();

/**
 * @returns {boolean}
 */
export const invalidateQuequeIsEmpty = () => invalidateQueque.size === 0;

/**
 * Limit queque size. Prevent possible side effect
 */
const maxQueuqueSize = 1000;

/**
 * @param {import('./type').InvalidateTickQuequeData} props
 * @returns {() => void}
 */
export const incrementInvalidateTickQueuque = (props) => {
    /**
     * Quando la coda dei invalidateTick cresce troppo possiamo essere nelal condizione di un loop infinito.
     *
     * - Lanciamo un avvertimento.
     * - Risolviamo l'esecuzione cancellando la coda.
     */
    if (invalidateQueque.size >= maxQueuqueSize) {
        console.warn(
            `InvalidateTick: maximum queue size reached (${maxQueuqueSize}). Likely an infinite watch loop. Queue force-cleared. `
        );

        invalidateQueque.clear();
        return () => {};
    }

    const id = MobCore.getUnivoqueId();
    invalidateQueque.set(id, props);

    return () => invalidateQueque.delete(id);
};

/**
 * @returns {boolean}
 */
const queueIsResolved = () => {
    return invalidateQueque.size === 0;
};

/**
 * Await that all bind props is completed
 *
 * @param {object} params
 * @param {boolean} [params.debug]
 * @param {(value: void | PromiseLike<void>) => void} [params.previousResolve]
 * @returns {Promise<void>}
 */
export const invalidateTick = async ({
    debug = false,
    previousResolve,
} = {}) => {
    await awaitNextLoop();

    if (debug) {
        invalidateQueque.forEach((value) => {
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

        invalidateTick({
            debug,
            previousResolve: previousResolve ?? resolve,
        });
    });
};
