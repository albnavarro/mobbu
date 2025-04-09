// @ts-check

import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * Set initialized to true. Set scopedId.
 *
 * @param {object} params
 * @param {string} params.invalidateId - InvalidateId
 * @returns {void}
 */

export const setInvalidatePlaceholderMapInitialized = ({ invalidateId }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;

    invalidateIdPlaceHolderMap.set(invalidateId, {
        ...item,
        initialized: true,
    });
};
