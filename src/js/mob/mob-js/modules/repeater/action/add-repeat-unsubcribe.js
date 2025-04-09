// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';

/**
 * Add new repeat unsubScribe function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.repeatId - Repeat id
 * @param {() => void} params.unsubscribe
 * @returns {void}
 */

export const addRepeatUnsubcribe = ({ id, repeatId, unsubscribe }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.repeatId === repeatId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    repeatFunctionMap.set(id, item);
};
