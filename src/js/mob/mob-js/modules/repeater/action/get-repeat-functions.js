// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';

/**
 * Get repeat starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {{ repeatId: string; fn: () => void }[]}
 */

export const getRepeatFunctions = ({ id }) => {
    return repeatFunctionMap.get(id) ?? [];
};
