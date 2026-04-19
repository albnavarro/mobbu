import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Check if repeater exist or is deleted.
 *
 * @param {object} params
 * @param {string} params.invalidateId
 * @returns {boolean}
 */
export const checkInvalidateExistence = ({ invalidateId }) => {
    return invalidateInstancesMap.has(invalidateId);
};
