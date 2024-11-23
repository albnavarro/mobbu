// @ts-check

import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @description
 * Get invalidate parent by invalidate id.
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {HTMLElement|undefined}
 */

export const getInvalidateParent = ({ id }) => {
    if (!invalidateIdPlaceHolderMap.has(id)) {
        return;
    }

    const parent = invalidateIdPlaceHolderMap.get(id);
    return parent?.element;
};
