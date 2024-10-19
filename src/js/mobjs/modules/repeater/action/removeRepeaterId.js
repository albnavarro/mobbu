// @ts-check

import { repeatFunctionMap } from '../repeatFunctionMap';
import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @description
 * Clean the two utils map on component destroy.
 * Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @returns {void}
 */

export const removeRepeaterId = ({ id }) => {
    if (repeatFunctionMap.has(id)) {
        const value = repeatFunctionMap.get(id);

        /**
         *Remove reference to parent Id taken from repeat web component.
         */
        value.forEach(({ repeatId }) => {
            if (repeatIdPlaceHolderMap.has(repeatId)) {
                repeatIdPlaceHolderMap.delete(repeatId);
            }
        });

        /**
         * Delete all
         */
        repeatFunctionMap.delete(id);
    }
};
