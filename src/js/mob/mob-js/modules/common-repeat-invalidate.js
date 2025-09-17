// @ts-check

import { compareIdOrParentIdRecursive } from '../component/action/parent';
import { invalidateInstancesMap } from './invalidate/invalidate-id-instances-map';
import { repeatInstancesMap } from './repeater/repeat-id-intances-map';

export const MODULE_REPEATER = 'repeater';
export const MODULE_INVALIDATE = 'invalidate';

/**
 * Get all repeat or invalidate inside HTMLElement
 *
 * - Filter modules contained in target component ( componentId )
 * - Filter initialized or notInitialized modules
 * - Filter moduled where parentElement is contained in moduleParentElement
 *
 * @param {object} params
 * @param {HTMLElement} params.moduleParentElement - Main module container
 * @param {boolean} [params.skipInitialized] - Used if we want to initialize module
 * @param {boolean} [params.onlyInitialized] - Used if we want to destroy module
 * @param {string} [params.componentId] - The component where main module is defined
 * @param {string} params.module - Module type repeat or invalidate
 * @returns {string[]}
 */
export const getRepeatOrInvalidateInsideElement = ({
    moduleParentElement,
    skipInitialized = false,
    onlyInitialized = false,
    componentId,
    module,
}) => {
    const entries =
        module === MODULE_REPEATER
            ? repeatInstancesMap.entries()
            : invalidateInstancesMap.entries();

    const result = [];

    for (const item of entries) {
        const [id, { element: currentModuleParent, initialized, scopeId }] =
            item;

        /**
         * Skip 1
         *
         * Check if current scopeId is contained in componentId ( directly or nested )
         */
        if (
            componentId &&
            !compareIdOrParentIdRecursive({
                moduleScopeId: scopeId ?? '',
                targetComponentId: componentId,
            })
        )
            continue;

        /**
         * Skip 2
         *
         * Only not initialized. Use to create nested modules
         */
        if (skipInitialized && initialized) continue;

        /**
         * Only initialized. Use to destroy nested modules
         */
        if (onlyInitialized && !initialized) continue;

        /**
         * Last condition, current module container is child main module container ( non only child of component where
         * module is defined ).
         */
        const condition =
            currentModuleParent &&
            moduleParentElement?.contains(currentModuleParent) &&
            moduleParentElement !== currentModuleParent;

        if (condition) result.push(id);
    }

    return result;
};
