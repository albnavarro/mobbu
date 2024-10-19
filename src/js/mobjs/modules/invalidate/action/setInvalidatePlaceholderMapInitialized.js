// @ts-check

import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @description
 * Set initialized to true.
 * Set scopedId.
 *
 * @param {object} params
 * @param {string} params.invalidateId - invalidateId
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
