// @ts-check

import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * @returns {number}
 */

export const getNumberOfActiveRepeater = () => {
    return repeatIdPlaceHolderMap.size;
};
