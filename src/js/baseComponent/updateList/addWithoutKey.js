import { isDescendant } from '../../mobbu/utils/vanillaFunction';
import { getElementById, removeAndDestroyById } from '../componentStore/action';

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
                <component data-component="${targetComponent}"/>
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
         * Usare un metodo dello sotre per prender il DOM element dall' id ?
         */
        const lastNode = containerList.querySelector(`#${lastChildren}`);
        elementToAdd.forEach((element) => {
            lastNode.insertAdjacentHTML('afterend', element);
        });

        return;
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
};
