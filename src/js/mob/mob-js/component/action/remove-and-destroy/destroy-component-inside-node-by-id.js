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

    allChild.forEach((id) => {
        const state = componentMap.get(id);
        const element = state?.element;
        const currentId = state?.id ?? '';

        if (element && container?.contains(element) && element !== container) {
            removeAndDestroyById({ id });
            return;
        } else {
            /**
             * Case: no children component found && nested repeater with a repeater without component. Component can be
             * in a nested repeater
             */
            destroyComponentInsideNodeById({ id: currentId, container });
        }
    });
};
