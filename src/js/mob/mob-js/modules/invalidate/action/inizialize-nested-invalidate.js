// @ts-check

import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../common-repeat-invalidate';

/**
 * Initialize watch function of nested invalidate.
 *
 * Start initialize from older one, so child invalidate is render after parent invalidate
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.invalidateParent - Module parent HTMLElement
 * @param {string} params.id - Component id witch contain moduleParent is defined.
 * @returns {void}
 */

export const inizializeNestedInvalidate = ({ invalidateParent, id }) => {
    if (!invalidateParent) return;

    /**
     * PlaceholderMap
     *
     * - Find module to initialize from modulePlaceholderMap
     * - Module must contained in moduleParent element
     */
    const invalidateToInitialize = getRepeatOrInvalidateInsideElement({
        moduleParentElement: invalidateParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    invalidateToInitialize.forEach(({ fn: initilizeFunction }) => {
        initilizeFunction();
    });
};
