// @ts-check

import { componentMap } from '../store';
import { getElementById } from './element';

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {string[]|[]}
 *
 * @description
 * Get children id.
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

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @param {Array<HTMLElement|undefined>} [ obj.filterBy ]
 * @return void
 *
 *
 * @description
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, componentName, filterBy = [] }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    const components = getChildrenIdByName({ id, componentName });
    const componentsIdFiltered = components
        .map((id) => {
            return { id, element: getElementById({ id }) };
        })
        .filter(({ element }) => {
            return filterBy.length > 0 ? filterBy.includes(element) : true;
        })
        .sort((a, b) => {
            const { element: elementA } = a;
            const { element: elementB } = b;
            if (elementA === elementB || !elementA || !elementB) return 0;
            if (elementA.compareDocumentPosition(elementB) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ id }) => id);

    const item = componentMap.get(id);
    if (!item) return;

    const { child } = item;
    componentMap.set(id, {
        ...item,
        child: {
            ...child,
            [componentName]: componentsIdFiltered,
        },
    });
};

/**
 * @param {object} obj
 * @param {string[]} obj.children
 * @return {string[]}
 *
 *
 * @description
 * Get an array of children sorted by DOM position
 */
export const gerOrderedChildrenById = ({ children }) => {
    return children
        .map((id) => {
            return { id, element: getElementById({ id }) };
        })
        .sort((a, b) => {
            const { element: elementA } = a;
            const { element: elementB } = b;
            if (elementA === elementB || !elementA || !elementB) return 0;
            if (elementA.compareDocumentPosition(elementB) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ id }) => id);
};
