// @ts-check

import { invalidateFunctionMap } from '../invalidate-function-map';
import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * Remove invalidate by id filtered by invalidateId Remove only current invalidate, each component use many invalidate.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.invalidateId - Invalidate id
 * @returns {void}
 */

export const removeInvalidateByInvalidateId = ({ id, invalidateId }) => {
    if (!invalidateFunctionMap.has(id)) return;

    const value = invalidateFunctionMap.get(id);
    if (!value) return;

    const valueParsed = value.filter(
        (item) => item.invalidateId !== invalidateId
    );

    if (invalidateIdPlaceHolderMap.has(invalidateId)) {
        invalidateIdPlaceHolderMap.delete(invalidateId);
    }

    invalidateFunctionMap.set(id, valueParsed);
};
