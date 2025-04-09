// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * Remove repeat by id filtered by repeatId Remove only current repeater, each component use many repater.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.repeatId - Repeat id
 * @returns {void}
 */

export const removeRepeatByRepeatId = ({ id, repeatId }) => {
    if (!repeatFunctionMap.has(id)) return;

    const value = repeatFunctionMap.get(id);
    if (!value) return;

    const valueParsed = value.filter((item) => item.repeatId !== repeatId);

    if (repeatIdPlaceHolderMap.has(repeatId)) {
        repeatIdPlaceHolderMap.delete(repeatId);
    }

    repeatFunctionMap.set(id, valueParsed);
};
