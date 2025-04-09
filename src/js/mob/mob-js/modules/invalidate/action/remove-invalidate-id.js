// @ts-check

import { invalidateFunctionMap } from '../invalidate-function-map';
import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * Clean the two utils map on component destroy. Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @returns {void}
 */

export const removeInvalidateId = ({ id }) => {
    if (invalidateFunctionMap.has(id)) {
        const value = invalidateFunctionMap.get(id);

        if (!value) return;

        /**
         * Remove reference to parent Id taken from invalidate web component.
         */
        value.forEach(({ invalidateId }) => {
            if (invalidateIdPlaceHolderMap.has(invalidateId)) {
                invalidateIdPlaceHolderMap.delete(invalidateId);
            }
        });

        /**
         * Delete all
         */
        invalidateFunctionMap.delete(id);
    }
};
