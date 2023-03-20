export const updateChildrenArray = ({ currentChild, id, componentName }) => {
    const arr = currentChild?.[componentName] ?? [];
    const newArr = [...arr, id];
    currentChild[componentName] = newArr;
    return currentChild;
};
