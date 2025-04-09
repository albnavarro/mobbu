// @ts-check

import { componentMap } from '../../store';
import { removeAndDestroyById } from './remove-and-destroy-by-id';

/**
 * Remove all children od component inside a specific Node.
 *
 * @param {Object} param
 * @param {string} param.id
 * @param {Element | HTMLElement} param.container
 * @returns Void
 */

export const destroyComponentInsideNodeById = ({ id, container }) => {
    const instanceValue = componentMap.get(id);
    const child = instanceValue?.child;
    if (!child) return;

    const allChild = Object.values(child ?? {}).flat();

    allChild.forEach((id) => {
        const state = componentMap.get(id);
        const element = state?.element;

        if (element && container?.contains(element) && element !== container) {
            removeAndDestroyById({ id });
        }
    });
};
