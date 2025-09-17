// @ts-check

import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Add new invalidate sterter function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.invalidateId - Invalidate id
 * @param {() => void} params.fn
 * @returns {void}
 */

export const setInvalidateInitializeFunction = ({ invalidateId, fn }) => {
    const item = invalidateInstancesMap.get(invalidateId);
    if (!item) return;

    invalidateInstancesMap.set(invalidateId, {
        ...item,
        fn,
        unsubscribe: [() => {}],
    });
};
