// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';

/**
 * @description
 * Add new repeat initialized in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @param {() => void} params.fn
 * @returns {void}
 */

export const setRepeatFunction = ({ id, repeatId, fn }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    repeatFunctionMap.set(id, [
        ...currentFunctions,
        { repeatId, fn, unsubscribe: () => {} },
    ]);
};
