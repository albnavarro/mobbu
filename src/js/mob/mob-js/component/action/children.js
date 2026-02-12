import { componentMap } from '../component-map';

/**
 * Get children id.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {string[] | []}
 */
export const getChildrenById = ({ id = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return Object.values(child).reduce(
        (current, previous) => [...previous, ...current],
        []
    );
};

/**
 * Get children id.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {string[] | []}
 */
export const getChildrenIdByName = ({ id = '', componentName = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return child?.[componentName] ?? [];
};
