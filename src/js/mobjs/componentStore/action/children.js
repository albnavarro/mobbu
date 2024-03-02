// @ts-check

import { componentMap } from '../store';
import { getElementById } from './element';

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @returns {Array.<string>}
 *
 * @description
 * Get children id.
 */
export const getChildrenIdByName = ({ id = '', component = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return child?.[component] ?? [];
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @param {Array<HTMLElement|undefined>} [ obj.filterBy ]
 * @return void
 *
 *
 * @description
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, component, filterBy = [] }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    const components = getChildrenIdByName({ id, component });
    const componentsIdFiltered = components
        .map((id) => {
            return { id, element: getElementById({ id }) };
        })
        .filter(({ element }) => {
            return filterBy.length > 0 ? filterBy.includes(element) : true;
        })
        .sort(function (a, b) {
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
            [component]: componentsIdFiltered,
        },
    });
};
