// @ts-check

import { invalidateIdsMap } from '../invalidate-ids-map';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Remove invalidate by id filtered by invalidateId Remove only current invalidate, each component use many invalidate.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.invalidateId - Invalidate id
 * @returns {void}
 */

export const removeInvalidateByInvalidateId = ({ id, invalidateId }) => {
    if (!invalidateIdsMap.has(id)) return;

    const value = invalidateIdsMap.get(id);
    if (!value) return;

    const valueParsed = value.filter(
        (item) => item.invalidateId !== invalidateId
    );

    if (invalidateInstancesMap.has(invalidateId)) {
        invalidateInstancesMap.delete(invalidateId);
    }

    invalidateIdsMap.set(id, valueParsed);
};
