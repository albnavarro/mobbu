import { isDescendant } from '../../mobbu/utils/vanillaFunction';
import { getElementById, removeAndDestroyById } from '../componentStore/action';
import { IS_RUNTIME } from '../utils';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    current,
    previous,
    containerList,
    targetComponent,
    getChildren,
    runtimeId,
}) => {
    const currentLenght = current.length;
    const previousLenght = previous.length;
    const diff = currentLenght - previousLenght;

    /**
     * Add
     */
    if (diff > 0) {
        /**
         * Create palcehodler component
         */
        const elementToAdd = [...Array(diff).keys()].map(() => {
            return `
                <component ${IS_RUNTIME}="${runtimeId}" data-component="${targetComponent}"/>
            `;
        });

        /**
         * Get last child of containerList
         */
        const children = getChildren(targetComponent);
        const childrenFiltered = [...children].filter((id) => {
            return isDescendant(containerList, getElementById({ id }));
        });
        const lastChildren = childrenFiltered[childrenFiltered.length - 1];

        /**
         * Query last child and append new children.
         * TODO Usare un metodo dello sotre per prender il DOM element dall' id ?
         */
        elementToAdd.forEach((element) => {
            const lastNode = containerList.querySelector(`#${lastChildren}`);

            if (lastNode) {
                lastNode.insertAdjacentHTML('afterend', element);
                return;
            }

            containerList.insertAdjacentHTML('afterbegin', element);
        });
    }

    /**
     * Remove
     */

    /**
     * Get all children by component type.
     */
    const children = getChildren(targetComponent);

    /**
     * Filter all children contained in containerList.
     */
    const childrenFiltered = [...children].filter((id) => {
        return isDescendant(containerList, getElementById({ id }));
    });

    const childrenToRemoveByKey = childrenFiltered.filter((_child, i) => {
        return i >= current.length;
    });

    childrenToRemoveByKey.forEach((childId) => {
        removeAndDestroyById({ id: childId });
    });

    return current;
};
