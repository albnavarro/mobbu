// @ts-check

import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../../common-repeat-invalidate';
import { invalidateFunctionMap } from '../invalidate-function-map';

/**
 * Initialize watch function of nested invalidate. Start initialize from older one, so child invalidate is render after
 * parent invalidate
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.invalidateParent
 * @param {string} params.id - ComponentId
 * @returns {void}
 */

export const inizializeNestedInvalidate = ({ invalidateParent, id }) => {
    if (!invalidateParent) return;

    const newInvalidateChild = getRepeatOrInvalidateInsideElement({
        element: invalidateParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    const invalidateChildToInizialize = [...invalidateFunctionMap.values()]
        .flat()
        .filter(({ invalidateId }) => {
            return newInvalidateChild.some((current) => {
                return current.id === invalidateId;
            });
        });

    invalidateChildToInizialize.forEach(({ fn }) => {
        fn();
    });
};
