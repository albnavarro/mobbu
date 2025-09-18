// @ts-check

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
    const repeatToDelete = getRepeatOrInvalidateInsideElement({
        moduleParentElement: repeatParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_REPEATER,
    });

    repeatToDelete.forEach(({ unsubscribe, moduleId }) => {
        unsubscribe.forEach((fn) => {
            fn();
        });

        removeRepeatByRepeatId({ id, repeatId: moduleId });
    });
};
