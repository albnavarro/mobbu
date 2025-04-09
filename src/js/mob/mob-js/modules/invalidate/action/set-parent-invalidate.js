// @ts-check

import { invalidateIdHostMap } from '../invalidate-id-host-map';
import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * Store parent invalidate block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.invalidateId - InvalidateId id
 * @param {HTMLElement} params.host - WebComponent root
 */

export const setParentInvalidate = ({ invalidateId, host }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;

    const parent = /** @type {HTMLElement} */ (host.parentNode);
    invalidateIdPlaceHolderMap.set(invalidateId, {
        ...item,
        element: parent,
    });
    invalidateIdHostMap.set(invalidateId, host);
};
