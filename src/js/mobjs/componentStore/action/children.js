// @ts-check

import { componentMap } from '../store';
import { getElementById } from './element';

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @returns {Array.<String>}
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
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @return void
 *
 *
 * @description
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, component }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    /**
     * Get children by tagName.
     */
    const components = getChildrenIdByName({ id, component });

    /**
     * Order by current dom position.
     */
    const componentsInCurrentOrder = components
        .map((id) => {
            return { id, element: getElementById({ id }) };
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
            [component]: componentsInCurrentOrder,
        },
    });
};
