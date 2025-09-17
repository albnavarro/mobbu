// @ts-check

import { invalidateIdsMap } from '../invalidate-ids-map';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Clean the two utils map on component destroy. Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @returns {void}
 */

export const removeInvalidateId = ({ id }) => {
    if (invalidateIdsMap.has(id)) {
        const value = invalidateIdsMap.get(id);

        if (!value) return;

        /**
         * Remove reference to parent Id taken from invalidate web component.
         */
        value.forEach(({ invalidateId }) => {
            if (invalidateInstancesMap.has(invalidateId)) {
                invalidateInstancesMap.delete(invalidateId);
            }
        });

        /**
         * Delete all
         */
        invalidateIdsMap.delete(id);
    }
};
