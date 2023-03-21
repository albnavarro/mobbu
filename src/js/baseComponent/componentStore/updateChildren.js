import { parseComponents } from '../componentParse';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
function add({ childrenContainer, componentName, diff, getChildren }) {
    /**
     * Create palcehodler component
     */
    const elementToAdd = [...Array(diff).keys()].map(() => {
        return `
            <component data-component="${componentName}"/>
        `;
    });

    /**
     * Get last child of component
     */
    const children = getChildren(componentName);
    const lastChildren = children[children.length - 1];

    /**
     * Query last child and append new children.
     * Usare un metodo dello sotre per prender il DOM element dall' id ?
     */
    const lastNode = childrenContainer.querySelector(`#${lastChildren}`);
    elementToAdd.forEach((element) => {
        lastNode.insertAdjacentHTML('afterend', element);
    });
}

function remove({ childrenContainer, componentName, diff, getChildren }) {
    console.log('remove', diff);
}

// First try array of object.
export const updateChildren = async ({
    childrenContainer,
    componentName = '',
    current = [],
    previous = [],
    getChildren,
}) => {
    const currentLenght = current.length;
    const previousLenght = previous.length;

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
        childrenContainer,
        componentName,
        diff: Math.abs(currentLenght - previousLenght),
        getChildren,
    });

    /**
     * Parse new component if there is ( added is executed )
     */
    await parseComponents({ element: childrenContainer });
};
