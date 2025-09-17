// @ts-check

import { repeatIdsMap } from '../repeat-ids-map';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Clean the two utils map on component destroy. Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @returns {void}
 */

export const removeRepeaterId = ({ id }) => {
    if (repeatIdsMap.has(id)) {
        const value = repeatIdsMap.get(id);
        if (!value) return;

        /**
         * Remove reference to parent Id taken from repeat web component.
         */
        value.forEach(({ repeatId }) => {
            if (repeatInstancesMap.has(repeatId)) {
                repeatInstancesMap.delete(repeatId);
            }
        });

        /**
         * Delete all
         */
        repeatIdsMap.delete(id);
    }
};
