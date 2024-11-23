// @ts-check

import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @description
 * Get repeat parent by repeat id.
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {HTMLElement|undefined}
 */
export const getRepeatParent = ({ id }) => {
    if (!repeatIdPlaceHolderMap.has(id)) {
        return;
    }

    const parent = repeatIdPlaceHolderMap.get(id);
    return parent?.element;
};
