// @ts-check

import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Add new repeat unsubScribe function in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.repeatId - Repeat id
 * @param {() => void} params.unsubscribe
 * @returns {void}
 */

export const addRepeatUnsubcribe = ({ repeatId, unsubscribe }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    repeatInstancesMap.set(repeatId, { ...item, unsubscribe });
};
