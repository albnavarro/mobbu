import { tick } from '../queque/tick';

/**
 * @type {Set<import('./type').userComponent>}
 */
export const userPlaceholder = new Set();

/**
 * @param {import('./type').userComponent} element
 * @returns {void}
 */
export const addUserPlaceholder = (element) => {
    userPlaceholder.add(element);
};

/**
 * @param {Element} element
 * @returns {import('./type').userComponent[]}
 *
 * @description
 * useComponent is inserted in orderf if dom insert ( naturally traversal ).
 * Can't return array with all element because when in this map there element that change position.
 * When paren element switch position in parse the new element is different.
 * Get only first real element.
 *
 * Return an array with one element, to maintain compatibility with query solution.
 */
export const getFirstUserChildPlaceHolder = (element) => {
    const userComponent = [...userPlaceholder.values()].find((item) => {
        return element?.contains(item) && item.getIsPlaceholder();
    });

    userPlaceholder.delete(userComponent);
    return [userComponent];
};

/**
 * @param {object} params
 * @param {Element} params.element
 * @returns {Array<import('./type').userComponent>}
 *
 * @description
 */
export const getAllUserChildPlaceholder = ({ element }) => {
    return [...userPlaceholder.values()].filter((item) => {
        return element?.contains(item) && item.getIsPlaceholder();
    });
};

/**
 * @returns {number}
 *
 * @description
 */
export const getUserChildPlaceholderSize = () => {
    return userPlaceholder.size;
};

/**
 * @returns {Promise<void>}
 *
 * @description
 * Clean array at the end of app operation.
 * Issue with element that switch position and there no real.
 */
export const clearUserPlaceHolder = async () => {
    await tick();
    userPlaceholder.clear();
};
