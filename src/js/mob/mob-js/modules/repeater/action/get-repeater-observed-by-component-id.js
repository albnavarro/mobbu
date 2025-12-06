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

    return repeaterIdByComponent
        .map((item) => item.repeatId)
        .map((id) => repeatInstancesMap.get(id))
        .map((item) => item?.observed)
        .filter((item) => item !== undefined);
};
