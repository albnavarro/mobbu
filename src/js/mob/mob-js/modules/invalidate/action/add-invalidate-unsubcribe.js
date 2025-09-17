// @ts-check

import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Add new invalidate unsubscribe function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.invalidateId - Invalidate id
 * @param {(() => void)[]} params.unsubscribe
 * @returns {void}
 */

export const addInvalidateUnsubcribe = ({ invalidateId, unsubscribe }) => {
    const item = invalidateInstancesMap.get(invalidateId);
    if (!item) return;

    invalidateInstancesMap.set(invalidateId, { ...item, unsubscribe });
};
