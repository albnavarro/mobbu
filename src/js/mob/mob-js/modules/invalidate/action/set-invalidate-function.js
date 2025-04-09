// @ts-check

import { invalidateFunctionMap } from '../invalidate-function-map';

/**
 * Add new invalidate sterter function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.invalidateId - Invalidate id
 * @param {() => void} params.fn
 * @returns {void}
 */

export const setInvalidateFunction = ({ id, invalidateId, fn }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    invalidateFunctionMap.set(id, [
        ...currentFunctions,
        { invalidateId, fn, unsubscribe: [() => {}] },
    ]);
};
