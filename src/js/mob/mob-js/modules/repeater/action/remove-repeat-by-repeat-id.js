// @ts-check

import { repeatIdsMap } from '../repeat-ids-map';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Remove repeat by id filtered by repeatId Remove only current repeater, each component use many repater.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {string} params.repeatId - Repeat id
 * @returns {void}
 */

export const removeRepeatByRepeatId = ({ id, repeatId }) => {
    if (!repeatIdsMap.has(id)) return;

    const value = repeatIdsMap.get(id);
    if (!value) return;

    const valueParsed = value.filter((item) => item.repeatId !== repeatId);

    if (repeatInstancesMap.has(repeatId)) {
        repeatInstancesMap.delete(repeatId);
    }

    repeatIdsMap.set(id, valueParsed);
};
