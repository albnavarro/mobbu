/**
 * Support getChildrenIdByName action.
 * Update child obj, insert new id component in the array of same component family.
 */
export const updateChildrenArray = ({ currentChild, id, componentName }) => {
    const arr = currentChild?.[componentName] ?? [];
    currentChild[componentName] = [...arr, id];
    return currentChild;
};
