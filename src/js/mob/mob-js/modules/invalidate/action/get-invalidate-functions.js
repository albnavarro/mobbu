// @ts-check

import { invalidateFunctionMap } from '../invalidate-function-map';

/**
 * Get invalidate starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {{ invalidateId: string; fn: () => void }[]}
 */

export const getInvalidateFunctions = ({ id }) => {
    return invalidateFunctionMap.get(id) ?? [];
};
