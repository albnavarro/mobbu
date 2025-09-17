// @ts-check

import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * @returns {number}
 */

export const getNumberOfActiveRepeater = () => {
    return repeatInstancesMap.size;
};
