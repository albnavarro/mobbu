import { MobCore } from '../../mob-core';
import { awaitNextLoop } from './utils';

/**
 * @type {Map<string, import('./type').TickQuequeData>}
 */
const queque = new Map();

/**
 * Limit queque size. Prevent possible side effect
 */
const maxQueuqueSize = 100_000;

/**
 * @param {import('./type').TickQuequeData} props
 * @returns {() => void}
 */
export const incrementTickQueuque = (props) => {
    /**
     * Quando la coda dei tick cresce troppo possiamo essere nelal condizione di un loop infinito.
     *
     * - Lanciamo un avvertimento.
     * - Risolviamo l'esecuzione cancellando la code.
     */
    if (queque.size >= maxQueuqueSize) {
        console.warn(
            `Tick: maximum queue size reached (${maxQueuqueSize}). Likely an infinite watch loop. Queue force-cleared. `
        );

        queque.clear();
        return () => {};
    }

    const id = MobCore.getUnivoqueId();
    queque.set(id, props);

    return () => queque.delete(id);
};

/**
 * @returns {boolean}
 */
const queueIsResolved = () => {
    return queque.size === 0;
};

/**
 * Await that all bind props is completed
 *
 * @param {object} params
 * @param {boolean} [params.debug]
 * @param {(value: void | PromiseLike<void>) => void} [params.previousResolve]
 * @returns {Promise<void>}
 */
export const tick = async ({ debug = false, previousResolve } = {}) => {
    await awaitNextLoop();

    if (debug) {
        queque.forEach((value) => {
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

        tick({ debug, previousResolve: previousResolve ?? resolve });
    });
};
