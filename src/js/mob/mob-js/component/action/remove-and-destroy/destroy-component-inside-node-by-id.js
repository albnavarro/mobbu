import { componentMap } from '../../component-map';
import { removeAndDestroyById } from './remove-and-destroy-by-id';

/**
 * Remove all children od component inside a specific Node.
 *
 * @param {Object} param
 * @param {string} param.id
 * @param {Element | HTMLElement} param.container
 * @returns {void}
 */
export const destroyComponentInsideNodeById = ({ id, container }) => {
    const instanceValue = componentMap.get(id);
    const child = instanceValue?.child;
    if (!child) return;

    const allChild = Object.values(child ?? {}).flat();

    for (const id of allChild) {
        const state = componentMap.get(id);
        if (!state) continue;

        const element = state?.element;

        if (element && container?.contains(element) && element !== container) {
            removeAndDestroyById({ id });
            continue;
        }

        /**
         * Case: no children component found && nested repeater with a repeater without component. Component can be in a
         * nested repeater
         */
        const currentId = state?.id ?? '';
        destroyComponentInsideNodeById({ id: currentId, container });
    }
};
