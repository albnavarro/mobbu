import { invalidateFunctionMap } from '../invalidateFunctionMap';
import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @description
 * Clean the two utils map on component destroy.
 * Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @returns {void}
 */

export const removeInvalidateId = ({ id }) => {
    if (invalidateFunctionMap.has(id)) {
        const value = invalidateFunctionMap.get(id);

        /**
         *Remove reference to parent Id taken from invalidate web component.
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
