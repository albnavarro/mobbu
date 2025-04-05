// @ts-check

import { invalidateFunctionMap } from '../invalidateFunctionMap';

/**
 * @description
 * Get invalidate starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{invalidateId: string, fn: () => void }>}
 */

export const getInvalidateFunctions = ({ id }) => {
    return invalidateFunctionMap.get(id) ?? [];
};
