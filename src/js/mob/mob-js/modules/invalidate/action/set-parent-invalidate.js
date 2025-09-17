// @ts-check

import { invalidateIdHostMap } from '../invalidate-id-host-map';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Store parent invalidate block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.invalidateId - InvalidateId id
 * @param {HTMLElement} params.host - WebComponent root
 */

export const setParentInvalidate = ({ invalidateId, host }) => {
    const item = invalidateInstancesMap.get(invalidateId);
    if (!item) return;

    const parent = /** @type {HTMLElement} */ (host.parentNode);
    invalidateInstancesMap.set(invalidateId, {
        ...item,
        element: parent,
    });
    invalidateIdHostMap.set(invalidateId, host);
};
