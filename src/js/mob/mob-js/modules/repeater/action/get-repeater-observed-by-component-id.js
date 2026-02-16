import { repeatInstancesMap } from '../repeat-id-intances-map';
import { repeatIdsMap } from '../repeat-ids-map';

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {string[]}
 */
export const getRepeaterObservedByComponentid = ({ id }) => {
    const repeaterIdByComponent = repeatIdsMap.get(id);
    if (!repeaterIdByComponent) return [];

    /**
     * Use flatMap to filter observed propierties instead filter.
     *
     * - Perform only one operation
     */
    return repeaterIdByComponent.flatMap(({ repeatId }) => {
        /**
         * ObservedState here is string | undefined.
         */
        const observedState = repeatInstancesMap.get(repeatId)?.observed;
        return observedState ? [observedState] : [];
    });
};
