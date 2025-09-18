// @ts-check

import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../common-repeat-invalidate';
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

    invalidatToDelete.forEach(({ unsubscribe, moduleId }) => {
        unsubscribe.forEach((fn) => {
            fn();
        });

        removeInvalidateByInvalidateId({ id, invalidateId: moduleId });
    });
};
