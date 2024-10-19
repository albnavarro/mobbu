// @ts-check

import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @returns {number}
 */

export const getNumberOfActiveRepeater = () => {
    return repeatIdPlaceHolderMap.size;
};
