import { invalidateFunctionMap } from '../invalidateFunctionMap';
import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @description
 * Remove invalidate by id filtered by invalidateId
 * Remove only current invalidate, each component use many invalidate.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId - invalidate id
 * @returns {void}
 */

export const removeInvalidateByInvalidateId = ({ id, invalidateId }) => {
    if (!invalidateFunctionMap.has(id)) return;

    const value = invalidateFunctionMap.get(id);
    const valueParsed = value.filter(
        (item) => item.invalidateId !== invalidateId
    );

    if (invalidateIdPlaceHolderMap.has(invalidateId)) {
        invalidateIdPlaceHolderMap.delete(invalidateId);
    }

    invalidateFunctionMap.set(id, valueParsed);
};
