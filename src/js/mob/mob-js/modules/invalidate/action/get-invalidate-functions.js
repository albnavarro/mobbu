// @ts-check

import { invalidateIdsMap } from '../invalidate-ids-map';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Get invalidate starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {{ invalidateId: string; fn: () => void }[]}
 */

export const getInvalidateFunctions = ({ id }) => {
    const invalidateIds = invalidateIdsMap.get(id) ?? [];

    return invalidateIds
        .map(({ invalidateId }) => {
            const item = invalidateInstancesMap.get(invalidateId);
            if (!item) return;

            return { invalidateId, fn: item.fn };
        })
        .filter((item) => item !== undefined);
};
