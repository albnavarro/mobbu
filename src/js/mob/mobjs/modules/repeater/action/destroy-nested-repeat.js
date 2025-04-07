// @ts-check

import { repeatFunctionMap } from '../repeat-function-map';
import {
    getRepeatOrInvalidateInsideElement,
    MODULE_REPEATER,
} from '../../common-repeat-invalidate';
import { removeRepeatByRepeatId } from './remove-repeat-by-repeat-id';

/**
 * @description
 * Destroy nester repeat.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.repeatParent
 * @returns {void}
 */

export const destroyNestedRepeat = ({ id, repeatParent }) => {
    /**
     * Filter repater with scopeId equal or descendants of componentId
     * Avoid unnecessary element.contains() check.
     */
    const repeatChildToDelete = getRepeatOrInvalidateInsideElement({
        element: repeatParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_REPEATER,
    });

    const repeatChildToDeleteParsed = [...repeatFunctionMap.values()]
        .flat()
        .filter((item) => {
            return repeatChildToDelete.some((current) => {
                return current.id === item.repeatId;
            });
        });

    repeatChildToDeleteParsed.forEach((item) => {
        item.unsubscribe();

        removeRepeatByRepeatId({
            id,
            repeatId: item.repeatId,
        });
    });
};
