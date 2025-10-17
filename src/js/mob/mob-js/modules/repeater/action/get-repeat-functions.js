// @ts-check

import { repeatIdsMap } from '../repeat-ids-map';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Get repeat starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {{ repeatId: string; initializeModule: () => void }[]}
 */

export const getRepeatFunctions = ({ id }) => {
    const repeatIds = repeatIdsMap.get(id) ?? [];

    return repeatIds
        .map(({ repeatId }) => {
            const item = repeatInstancesMap.get(repeatId);
            if (!item) return;

            return { repeatId, initializeModule: item.initializeModule };
        })
        .filter((item) => item !== undefined);
};
