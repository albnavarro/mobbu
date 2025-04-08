// @ts-check

import { invalidateIdPlaceHolderMap } from '../invalidate-id-placeholder-map';

/**
 * @returns {number}
 */

export const getNumberOfActiveInvalidate = () =>
    invalidateIdPlaceHolderMap.size;
