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
    const invalidatechildToDelete = getRepeatOrInvalidateInsideElement({
        element: invalidateParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    /**
     * Prefer cycle componentMap instead create a copy for performance. Better for memory.
     */
    for (const value of invalidateFunctionMap.values()) {
        value.forEach(({ invalidateId, unsubscribe }) => {
            const condition = invalidatechildToDelete.some((current) => {
                return current.id === invalidateId;
            });

            if (condition) {
                unsubscribe.forEach((fn) => {
                    fn();
                });

                removeInvalidateByInvalidateId({ id, invalidateId });
            }
        });
    }

    // const invalidateChildToDeleteParsed = [...invalidateFunctionMap.values()]
    //     .flat()
    //     .filter((item) => {
    //         return invalidatechildToDelete.some((current) => {
    //             return current.id === item.invalidateId;
    //         });
    //     });
    //
    // invalidateChildToDeleteParsed.forEach((item) => {
    //     item.unsubscribe.forEach((fn) => {
    //         fn();
    //     });
    //
    //     removeInvalidateByInvalidateId({
    //         id,
    //         invalidateId: item.invalidateId,
    //     });
    // });
};
