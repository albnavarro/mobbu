// @ts-check

import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @returns {number}
 */

export const getNumberOfActiveInvalidate = () =>
    invalidateIdPlaceHolderMap.size;
