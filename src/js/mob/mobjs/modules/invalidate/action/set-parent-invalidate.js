// @ts-check

import { invalidateIdHostMap } from '../invalidate-id-host-map';
import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * @description
 * Store parent invalidate block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.invalidateId - invalidateId id
 * @param {HTMLElement} params.host  - webComponent root
 */

export const setParentInvalidate = ({ invalidateId, host }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;

    const parent = /** @type{HTMLElement} */ (host.parentNode);
    invalidateIdPlaceHolderMap.set(invalidateId, {
        ...item,
        element: parent,
    });
    invalidateIdHostMap.set(invalidateId, host);
};
