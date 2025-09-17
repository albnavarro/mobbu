// @ts-check

import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * @returns {number}
 */

export const getNumberOfActiveInvalidate = () => invalidateInstancesMap.size;
