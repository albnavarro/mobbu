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
    const diff = Math.abs(currentLenght - previousLenght);
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
};
