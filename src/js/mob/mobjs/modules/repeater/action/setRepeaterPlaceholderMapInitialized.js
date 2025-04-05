// @ts-check

import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @description
 * Set initialized to true.
 *
 * @param {object} params
 * @param {string} params.repeatId - repeatId
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
