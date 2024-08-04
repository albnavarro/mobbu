/**
 * @type {Set<import('./type').userComponent>}
 */
let userPlaceholder = new Set();

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
 * @returns {void}
 *
 * @description
 * Clean array at the end of parseRecursive.
 * Issue with element that switch position and there no real.
 */
export const clearUserPlaceHolder = () => {
    userPlaceholder.clear();
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
 * @returns {void}
 *
 * @description
 * Order user component by DOM position
 * pre-order depth-first traversal
 *
 * Secure check.
 * When DOM is append to document component is added to userPlaceholder in right position.
 * Prevent possible error.
 */
export const reorderUserPlaceholder = () => {
    const newValues = [...userPlaceholder.values()].sort((a, b) => {
        // if (a === b) return 0;
        //
        // // if (a.compareDocumentPosition(b) & 2) {
        // if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
        //     // b comes before a
        //     return 1;
        // }

        // return -1;
        const posCompare = a.compareDocumentPosition(b);

        if (
            posCompare & Node.DOCUMENT_POSITION_FOLLOWING ||
            posCompare & Node.DOCUMENT_POSITION_CONTAINED_BY
        ) {
            // a < b
            return -1;
        }

        if (
            posCompare & Node.DOCUMENT_POSITION_PRECEDING ||
            posCompare & Node.DOCUMENT_POSITION_CONTAINS
        ) {
            // a > b
            return 1;
        }

        if (
            posCompare & Node.DOCUMENT_POSITION_DISCONNECTED ||
            posCompare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
        ) {
            throw 'Cannot sort the given nodes.';
        }

        return 0;
    });

    userPlaceholder = new Set(newValues);
};
