// @ts-check

import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Set initialized to true.
 *
 * @param {object} params
 * @param {string} params.repeatId - RepeatId
 * @returns {void}
 */
export const setRepeaterInstancesMapInitialized = ({ repeatId }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    repeatInstancesMap.set(repeatId, {
        ...item,
        initialized: true,
    });
};
