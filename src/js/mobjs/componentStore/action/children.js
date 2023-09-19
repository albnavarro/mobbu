// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { componentMap } from '../store';
import { getComponentNameById } from './component';
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
    const element2 = getElementById({ id });
    if (!element2) return;

    /**
     * Get id af all component inside
     */
    const components2 = element2.querySelectorAll(`[${ATTR_IS_COMPONENT}]`);
    const componentsIdNow2 = [...components2].map(
        (item) => item?.dataset[ATTR_IS_COMPONENT_VALUE]
    );

    /**
     * Filter for the component we are looking for
     */
    const componentsIdFiltered2 = componentsIdNow2.filter((currentId) => {
        return getComponentNameById(currentId) === component;
    });

    const item = componentMap.get(id);
    if (!item) return;

    const { child } = item;
    componentMap.set(id, {
        ...item,
        child: {
            ...child,
            [component]: componentsIdFiltered2,
        },
    });
};
