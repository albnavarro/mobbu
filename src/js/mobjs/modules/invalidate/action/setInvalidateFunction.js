// @ts-check

import { invalidateFunctionMap } from '../invalidateFunctionMap';

/**
 * @description
 * Add new invalidate sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId - invalidate id
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
