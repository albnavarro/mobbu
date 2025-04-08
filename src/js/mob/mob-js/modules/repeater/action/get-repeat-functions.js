// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';

/**
 * @description
 * Get repeat starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{repeatId: string, fn: () => void }>}
 */

export const getRepeatFunctions = ({ id }) => {
    return repeatFunctionMap.get(id) ?? [];
};
