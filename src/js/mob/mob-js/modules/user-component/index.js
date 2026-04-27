// @ts-check

/**
 * @type {Set<import('../../web-component/type').UserComponent>}
 */
export const userPlaceholder = new Set();

/** @returns {boolean} */
let skipAddUserComponent = false;

/**
 * @param {import('../../web-component/type').UserComponent} element
 * @returns {void}
 */
export const addUserPlaceholder = (element) => {
    userPlaceholder.add(element);
};

/**
 * @param {import('../../web-component/type').UserComponent} element
 * @returns {void}
 */
export const removeUserPlaceholder = (element) => {
    userPlaceholder.delete(element);
};

/**
 * UseComponent is inserted in orderf if dom insert ( naturally traversal ). Can't return array with all element because
 * when in this map there element that change position. When paren element switch position in parse the new element is
 * different. Get only first real element.
 *
 * Return an array with one element, to maintain compatibility with query solution.
 *
 * @param {Element} element
 * @returns {import('../../web-component/type').UserComponent | undefined}
 */
export const getFirstUserChildPlaceHolder = (element) => {
    let userComponent;

    for (const item of userPlaceholder) {
        if (element?.contains(item) && item.getIsPlaceholder()) {
            userComponent = item;
            break;
        }
    }

    if (!userComponent) return;

    userPlaceholder.delete(userComponent);
    return userComponent;
};

/**
 * @param {object} params
 * @param {Element} params.element
 * @returns {import('../../web-component/type').UserComponent[]}
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
 * @returns {import('../../web-component/type').UserComponent[]}
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
 * Clean array at the end of app operation. Issue with element that switch position and there no real.
 *
 * @returns {Promise<void>}
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
