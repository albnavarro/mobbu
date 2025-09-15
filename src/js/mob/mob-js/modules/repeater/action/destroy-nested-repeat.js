// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';
import {
    getRepeatOrInvalidateInsideElement,
    MODULE_REPEATER,
} from '../../common-repeat-invalidate';
import { removeRepeatByRepeatId } from './remove-repeat-by-repeat-id';

/**
 * Destroy nester repeat.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.repeatParent
 * @returns {void}
 */
export const destroyNestedRepeat = ({ id, repeatParent }) => {
    /**
     * PlaceholderMap
     *
     * - Find module to destroy from modulePlaceholderMap
     * - Module must contained in moduleParent element
     */
    const repeatChildToDelete = getRepeatOrInvalidateInsideElement({
        moduleParentElement: repeatParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_REPEATER,
    });

    /**
     * FunctionMap
     *
     * - Find function for unsubscribe nested modules
     * - Use id found in repeatChildToDelete
     */
    for (const value of repeatFunctionMap.values()) {
        value.forEach(({ repeatId, unsubscribe }) => {
            const condition = repeatChildToDelete.some((current) => {
                return current.id === repeatId;
            });

            if (condition) {
                unsubscribe();

                /**
                 * Remove modules from placeholder && function map
                 */
                removeRepeatByRepeatId({ id, repeatId });
            }
        });
    }
};
