// @ts-check

import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../common-repeat-invalidate';
import { removeInvalidateByInvalidateId } from './remove-invalidate-by-invalidate-id';
import { invalidateFunctionMap } from '../invalidate-function-map';

/**
 * Destroy nester invalidate.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.invalidateParent
 * @returns {void}
 */
export const destroyNestedInvalidate = ({ id, invalidateParent }) => {
    /**
     * PlaceholderMap
     *
     * - Find module to destroy from modulePlaceholderMap
     * - Module must contained in moduleParent element
     */
    const invalidatechildToDelete = getRepeatOrInvalidateInsideElement({
        moduleParentElement: invalidateParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    /**
     * FunctionMap
     *
     * - Find function for unsubscribe nested modules
     * - Use id found in invalidatechildToDelete
     */
    for (const value of invalidateFunctionMap.values()) {
        value.forEach(({ invalidateId, unsubscribe }) => {
            const condition = invalidatechildToDelete.some((current) => {
                return current.id === invalidateId;
            });

            if (condition) {
                /**
                 * Invalidate has multiple observe item.
                 */
                unsubscribe.forEach((fn) => {
                    fn();
                });

                /**
                 * Remove modules from placeholder && function map
                 */
                removeInvalidateByInvalidateId({ id, invalidateId });
            }
        });
    }
};
