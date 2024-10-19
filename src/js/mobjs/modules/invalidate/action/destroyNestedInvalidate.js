import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../commonRepeatInvalidate';
import { removeInvalidateByInvalidateId } from './removeInvalidateByInvalidateId';
import { invalidateFunctionMap } from '../invalidateFunctionMap';

/**
 * @description
 * Destroy nester invalidate.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.invalidateParent
 * @returns {void}
 */

export const destroyNestedInvalidate = ({ id, invalidateParent }) => {
    const invalidatechildToDelete = getRepeatOrInvalidateInsideElement({
        element: invalidateParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    const invalidateChildToDeleteParsed = [...invalidateFunctionMap.values()]
        .flat()
        .filter((item) => {
            return invalidatechildToDelete.some((current) => {
                return current.id === item.invalidateId;
            });
        });

    invalidateChildToDeleteParsed.forEach((item) => {
        item.unsubscribe.forEach((fn) => {
            fn();
        });

        removeInvalidateByInvalidateId({
            id,
            invalidateId: item.invalidateId,
        });
    });
};
