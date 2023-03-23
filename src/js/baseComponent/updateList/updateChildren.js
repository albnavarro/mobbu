import { parseComponents } from '../componentParse';
import { arrayDifferenceTest } from './utils';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
function add({ containerList, targetComponent, diff, getChildren }) {
    /**
     * Create palcehodler component
     */
    const elementToAdd = [...Array(diff).keys()].map(() => {
        return `
            <component data-component="${targetComponent}"/>
        `;
    });

    /**
     * Get last child of component
     */
    const children = getChildren(targetComponent);
    const lastChildren = children[children.length - 1];

    /**
     * Query last child and append new children.
     * Usare un metodo dello sotre per prender il DOM element dall' id ?
     */
    const lastNode = containerList.querySelector(`#${lastChildren}`);
    elementToAdd.forEach((element) => {
        lastNode.insertAdjacentHTML('afterend', element);
    });
}

function remove({ containerList, targetComponent, diff, getChildren }) {
    console.log('remove', diff);
}

// First try array of object.
export const updateChildren = async ({
    containerList,
    targetComponent = '',
    current = [],
    previous = [],
    getChildren,
}) => {
    const currentLenght = current.length;
    const previousLenght = previous.length;

    arrayDifferenceTest();

    /**
     * If there isn't new children return;
     */
    if (currentLenght === previousLenght) return;

    /**
     * Add or remove children.
     */
    const fn = currentLenght > previousLenght ? add : remove;

    /**
     * Execue function.
     */
    fn({
        containerList,
        targetComponent,
        diff: Math.abs(currentLenght - previousLenght),
        getChildren,
    });

    /**
     * Parse new component if there is ( added is executed )
     */
    await parseComponents({ element: containerList });
};
