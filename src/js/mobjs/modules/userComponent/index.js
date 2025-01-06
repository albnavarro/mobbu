// @ts-check

/**
 * @type {Set<import('../../webComponent/type').UserComponent>}
 */
const userPlaceholder = new Set();

/** @returns {boolean} */
let skipAddUserComponent = false;

/**
 * @param {import('../../webComponent/type').UserComponent} element
 * @returns {void}
 */
export const addUserPlaceholder = (element) => {
    userPlaceholder.add(element);
};

/**
 * @param {import('../../webComponent/type').UserComponent} element
 * @returns {void}
 */
export const removeUserPlaceholder = (element) => {
    userPlaceholder.delete(element);
};

/**
 * @param {Element} element
 * @returns {import('../../webComponent/type').UserComponent[]}
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
    const userComponent = [...userPlaceholder].find((item) => {
        return element?.contains(item) && item.getIsPlaceholder();
    });

    if (!userComponent) return [];

    userPlaceholder.delete(userComponent);
    return [userComponent];
};

/**
 * @param {object} params
 * @param {Element} params.element
 * @returns {Array<import('../../webComponent/type').UserComponent>}
 *
 * @description
 */
export const getAllUserChildPlaceholder = ({ element }) => {
    return (
        [...userPlaceholder].filter((component) => {
            return (
                element.contains(component) &&
                element !== component &&
                component.getIsPlaceholder?.()
            );
        }) ?? []
    );
};

/**
 * @param {object} params
 * @param {Element} params.element
 * @returns {Array<import('../../webComponent/type').UserComponent>}
 *
 * @description
 */
export const getAllUserComponentUseNamedSlot = ({ element }) => {
    return (
        [...userPlaceholder].filter((component) => {
            return (
                element.contains(component) &&
                element !== component &&
                component.getIsPlaceholder?.() &&
                component?.getSlotPosition?.()
            );
        }) ?? []
    );
};

/**
 * @returns {number}
 */
export const getUserChildPlaceholderSize = () => {
    return userPlaceholder.size;
};

/**
 * @description
 * Redorder placeholder in traversal order.
 * Slot move element, so reorder all map
 * Should be not mandatory, but this smap is a foundamenal step
 *
 * @returns {void}
 */
export const sortUserPlaceholder = () => {
    const orderedSet = [...userPlaceholder].sort((a, b) => {
        if (a === b || !a || !b) return 0;
        if (a.compareDocumentPosition(b) & 2) {
            // b comes before a
            return 1;
        }
        return -1;
    });

    clearUserPlaceHolder();

    orderedSet.forEach((item) => {
        userPlaceholder.add(item);
    });
};

/**
 * @returns {Promise<void>}
 *
 * @description
 * Clean array at the end of app operation.
 * Issue with element that switch position and there no real.
 */
export const clearUserPlaceHolder = async () => {
    userPlaceholder.clear();
};

/**
 * @param {boolean} value
 * @returns {void}
 */
export const setSkipAddUserComponent = (value) => {
    skipAddUserComponent = value;
};

export const getSkipAddUserComponent = () => skipAddUserComponent;
