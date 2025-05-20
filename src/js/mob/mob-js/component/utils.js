/**
 * Support getChildrenIdByName action. Update child obj id, insert new child id in the array of same component family.
 *
 * [componentName] : [string, string, ...]
 *
 * @param {object} obj
 * @param {Record<string, string[]>} obj.currentChild
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {{ string: string[] } | {}}
 */
export const updateChildrenArray = ({
    currentChild,
    id = '',
    componentName = '',
}) => {
    const childGroupByName = currentChild?.[componentName] ?? [];
    currentChild[componentName] = [...childGroupByName, id];
    return currentChild;
};

/**
 * Support getChildrenIdByName action. Remove child obj id from the array of same component family.
 *
 * @param {object} obj
 * @param {Record<string, string[]>} obj.currentChild
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {{ string: string[] } | {}}
 */
export const removeChildFromChildrenArray = ({
    currentChild,
    id = '',
    componentName = '',
}) => {
    const childGroupByName = currentChild?.[componentName] ?? [];
    currentChild[componentName] = childGroupByName.filter(
        (/** @type {string} */ currentId) => {
            return id !== currentId;
        }
    );
    return currentChild;
};

/**
 * @param {object} obj
 * @param {object} obj.props
 * @param {import('../../mob-core/store/type').MobStoreReturnType<any>} obj.store - SimpleStore instance
 * @returns {void}
 */
export const addPropsToState = ({ props, store }) => {
    Object.entries(props).forEach(([key, value]) => {
        store.set(key, value);
    });
};
