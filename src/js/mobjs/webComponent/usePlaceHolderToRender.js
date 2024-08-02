/**
 * @type {Set<import('./type').userComponent>}
 */
const userPlaceholder = new Set();

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
export const getuserPlaceHolder = (element) => {
    const userComponent = [...userPlaceholder.values()].find((item) => {
        return element?.contains(item) && item.getIsPlaceholder();
    });

    userPlaceholder.delete(userComponent);
    return [userComponent];
};

/**
 * @returns {void}
 *
 * @description
 * Clean array at the end of parseRecursive.
 * Issue with element that switch position and there no real.
 */
export const cleanuserPlaceHolder = () => {
    userPlaceholder.clear();
};
