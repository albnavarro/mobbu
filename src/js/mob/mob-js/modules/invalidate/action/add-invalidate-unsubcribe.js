// @ts-check

import { invalidateFunctionMap } from '../invalidate-function-map';

/**
 * Add new invalidate unsubscribe function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.invalidateId - Invalidate id
 * @param {(() => void)[]} params.unsubscribe
 * @returns {void}
 */

export const addInvalidateUnsubcribe = ({ id, invalidateId, unsubscribe }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.invalidateId === invalidateId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    invalidateFunctionMap.set(id, item);
};
