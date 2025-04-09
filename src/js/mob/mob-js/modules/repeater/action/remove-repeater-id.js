// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * Clean the two utils map on component destroy. Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @returns {void}
 */

export const removeRepeaterId = ({ id }) => {
    if (repeatFunctionMap.has(id)) {
        const value = repeatFunctionMap.get(id);
        if (!value) return;

        /**
         * Remove reference to parent Id taken from repeat web component.
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
