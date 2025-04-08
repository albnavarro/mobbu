// @ts-check

import { compareIdOrParentIdRecursive } from '../component/action/parent';
import { invalidateIdPlaceHolderMap } from './invalidate/invalidate-id-placeholder-map';
import { repeatIdPlaceHolderMap } from './repeater/repeat-id-placeholder-map';

export const MODULE_REPEATER = 'repeater';
export const MODULE_INVALIDATE = 'invalidate';

/**
 * @description
 * Get all repeat or invalidate inside HTMLElement
 *
 * @param {object} params
 * @param {HTMLElement} params.element
 * @param {boolean} [ params.skipInitialized ]
 * @param {boolean} [ params.onlyInitialized ]
 * @param {string} [ params.componentId ]
 * @param {string} params.module
 * @returns {{id: string, parent:HTMLElement|undefined}[]}
 */
export const getRepeatOrInvalidateInsideElement = ({
    element,
    skipInitialized = false,
    onlyInitialized = false,
    componentId,
    module,
}) => {
    const entries =
        module === MODULE_REPEATER
            ? [...repeatIdPlaceHolderMap.entries()]
            : [...invalidateIdPlaceHolderMap.entries()];

    return entries
        .filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_id, { element: currentElement, initialized, scopeId }]) => {
                /**
                 * When destroy nested repat compare the the scope id is the same or a parent id
                 * Check only repeate descendants by scopeId
                 */
                if (
                    componentId &&
                    !compareIdOrParentIdRecursive({
                        id: scopeId ?? '',
                        compareValue: componentId,
                    })
                )
                    return;

                /**
                 * Only not initialized.
                 * Use on create nested modules
                 */
                if (skipInitialized && initialized) return false;

                /**
                 * Only initialized.
                 * Use on destroy nested modules
                 */
                if (onlyInitialized && !initialized) return false;

                /**
                 * Last DOM check
                 */
                return (
                    currentElement &&
                    element?.contains(currentElement) &&
                    element !== currentElement
                );
            }
        )
        .map(([id, parent]) => ({
            id,
            parent: parent?.element,
        }));
};
