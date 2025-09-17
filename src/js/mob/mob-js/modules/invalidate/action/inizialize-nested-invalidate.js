// @ts-check

import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../common-repeat-invalidate';
import { invalidateInstancesMap } from '../invalidate-id-instances-map';

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
    const invalidateIdToInitialize = getRepeatOrInvalidateInsideElement({
        moduleParentElement: invalidateParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    /**
     * FunctionMap
     *
     * - Find function for initialize nested modules
     * - Use id found in newInvalidateChild
     */
    for (const [
        invalidateId,
        { fn: initilizeFunction },
    ] of invalidateInstancesMap.entries()) {
        const condition = invalidateIdToInitialize.includes(invalidateId);

        if (condition) initilizeFunction();
    }
};
