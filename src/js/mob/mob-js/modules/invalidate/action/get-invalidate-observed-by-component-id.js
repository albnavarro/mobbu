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

    /**
     * Use flatMap to filter observed propierties instead filter.
     *
     * - Perform only one operation
     * - Invalidate use an array of observed state.
     */
    return invalidateIdByComponent.flatMap(({ invalidateId }) => {
        /**
         * ObservedState here is string[] | undefined.
         */
        const observedState =
            invalidateInstancesMap.get(invalidateId)?.observed;

        return observedState ?? [];
    });
};
