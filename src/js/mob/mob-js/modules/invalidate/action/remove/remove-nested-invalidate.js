import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../../common-repeat-invalidate';
import { removeInvalidateByInvalidateId } from './remove-invalidate-by-invalidate-id';

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
    const invalidatToDelete = getRepeatOrInvalidateInsideElement({
        moduleParentElement: invalidateParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    for (const { unsubscribe, moduleId } of invalidatToDelete) {
        /**
         * Invalidate has multiple observe state so here we have multiple invalidate function.
         */
        for (const fn of unsubscribe) {
            fn();
        }

        removeInvalidateByInvalidateId({ id, invalidateId: moduleId });
    }
};
