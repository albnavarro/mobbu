// @ts-check

import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * Set initialized to true.
 *
 * @param {object} params
 * @param {string} params.repeatId - RepeatId
 * @returns {void}
 */
export const setRepeaterPlaceholderMapInitialized = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        initialized: true,
    });
};
