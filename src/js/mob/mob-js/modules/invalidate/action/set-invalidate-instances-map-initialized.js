// @ts-check

import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Set initialized to true. Set scopedId.
 *
 * @param {object} params
 * @param {string} params.invalidateId - InvalidateId
 * @returns {void}
 */

export const setInvalidateInstancesMapInitialized = ({ invalidateId }) => {
    const item = invalidateInstancesMap.get(invalidateId);
    if (!item) return;

    invalidateInstancesMap.set(invalidateId, {
        ...item,
        initialized: true,
    });
};
