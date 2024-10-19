import { compareIdOrParentIdRecursive } from '../component/action/parent';
import { invalidateIdPlaceHolderMap } from './invalidate/invalidateIdPlaceHolderMap';
import { repeatIdPlaceHolderMap } from './repeater/repeatIdPlaceHolderMap';

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
 * @returns {{id: string, parent:HTMLElement}[]}
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
            ([_id, parent]) => {
                /**
                 * When destroy nested repat compare the the scope id is the same or a parent id
                 * Check only repeate descendants by scopeId
                 */
                if (
                    componentId &&
                    !compareIdOrParentIdRecursive({
                        id: parent.scopeId,
                        compareValue: componentId,
                    })
                )
                    return;

                /**
                 * Only not initialized.
                 * Use on create nested modules
                 */
                if (skipInitialized && parent?.initialized) return false;

                /**
                 * Only initialized.
                 * Use on destroy nested modules
                 */
                if (onlyInitialized && !parent?.initialized) return false;

                /**
                 * Last DOM check
                 */
                return (
                    element?.contains(parent.element) &&
                    element !== parent.element
                );
            }
        )
        .map(([id, parent]) => ({
            id,
            parent: parent?.element,
        }));
};
