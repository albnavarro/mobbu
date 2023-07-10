// @ts-check

/**
 * @param {Object} obj
 * @param {{String: Array.<string>}} obj.currentChild
 * @param {string} obj.id
 * @param {string} obj.componentName
 *
 * @return {{String: Array.<string>}}
 *
 *
 * @description
 * Support getChildrenIdByName action.
 * Update child obj id, insert new child id in the array of same component family.
 *
 * [componentName] : [string, string, ...]
 */
export const updateChildrenArray = ({
    currentChild,
    id = '',
    componentName = '',
}) => {
    const arr = currentChild?.[componentName] ?? [];
    currentChild[componentName] = [...arr, id];
    return currentChild;
};

/**
 * @param {Object} obj
 * @param {{String: Array.<string>}} obj.currentChild
 * @param {String} obj.id
 * @param {String} obj.componentName
 *
 * @return {{String: Array.<string>}}
 *
 *
 * @description
 * Support getChildrenIdByName action.
 * Remove child obj id from  the array of same component family.
 *
 */
export const removeChildFromChildrenArray = ({
    currentChild,
    id = '',
    componentName = '',
}) => {
    const arr = currentChild?.[componentName] ?? [];
    currentChild[componentName] = arr.filter(
        (/** @type {string} */ currentId) => {
            return id !== currentId;
        }
    );
    return currentChild;
};

/**
 * @param {Object} obj
 * @param {Object} obj.props
 * @param {Object} obj.store - SimpleStore instance
 * @returns {Object}
 */
export const addPropsToState = ({ props, store }) => {
    Object.entries(props).forEach(([key, value]) => {
        store.set(key, value);
    });
};
