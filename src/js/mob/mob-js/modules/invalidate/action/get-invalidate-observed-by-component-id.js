import { invalidateInstancesMap } from '../invalidate-id-instances-map';
import { invalidateIdsMap } from '../invalidate-ids-map';

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {string[]}
 */
export const getInvalidateObservedByComponentid = ({ id }) => {
    const invalidateIdByComponent = invalidateIdsMap.get(id);
    if (!invalidateIdByComponent) return [];

    return invalidateIdByComponent
        .map((item) => item.invalidateId)
        .map((id) => invalidateInstancesMap.get(id))
        .flatMap((item) => item?.observed)
        .filter((item) => item !== undefined);
};
