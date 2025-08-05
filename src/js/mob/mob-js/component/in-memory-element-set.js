/**
 * @type {Set<import('../web-component/type').UserComponent>}
 */
const inMemoryElementSet = new Set();

/**
 * @param {import('../web-component/type').UserComponent} element
 */
export const addElementToInMemorySet = (element) => {
    inMemoryElementSet.add(element);
};

/**
 * @returns {import('../web-component/type').UserComponent[]}
 */
export const getInMemorySet = () => {
    return [...inMemoryElementSet];
};

/**
 * @param {import('../web-component/type').UserComponent} element
 */
export const cleanInMemorySet = (element) => inMemoryElementSet.delete(element);
