// @ts-check

import { invalidateIdHostMap } from '../invalidate-id-host-map';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Get invalidate parent by invalidate id.
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {HTMLElement | undefined}
 */

export const getInvalidateParent = ({ id }) => {
    if (!invalidateInstancesMap.has(id)) {
        return;
    }

    /**
     * Remove webComponent after first call to invalidateParent
     */
    if (invalidateIdHostMap.has(id)) {
        const host = invalidateIdHostMap.get(id);
        // @ts-ignore
        host?.removeCustomComponent();
        host?.remove();
        invalidateIdHostMap.delete(id);
    }

    const parent = invalidateInstancesMap.get(id);
    return parent?.element;
};
