// @ts-check

import { forceComponentChildQuery, useQuery } from '../../parse/use-query';
import { queryAllFutureComponent } from '../../query/query-all-future-component';
import { getAllUserChildPlaceholder } from '../../modules/user-component';
import { componentMap } from '../store';
import { updateChildrenArray } from '../utils';

/**
 * Get parent id By id
 *
 * @param {string} id
 * @returns {string | undefined}
 */
export const getParentIdById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentId = item?.parentId;

    if (!parentId) {
        // console.warn(`getParentIdById failed no id found`);
        return;
    }

    return parentId;
};

/**
 * Update child id. From current component id get parentID and then add to parent child id
 *
 * @param {object} obj
 * @param {string} obj.id
 */
export const addSelfIdToParentComponent = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentId = item?.parentId;

    const componentName = item?.componentName ?? '';
    if (!parentId) return;

    const value = componentMap.get(parentId);
    if (!value) return;

    const { child } = value;
    if (!child) return;

    componentMap.set(parentId, {
        ...value,
        child: {
            ...child,
            ...updateChildrenArray({
                currentChild: child,
                id,
                componentName,
            }),
        },
    });
};

/**
 * Add self id to future component. If id is assigned to component nested in next cycle will be override.
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.element
 * @param {string} params.id
 * @returns {void}
 */
export const addParentIdToFutureComponent = ({ element, id }) => {
    if (!element) return;

    if (useQuery || forceComponentChildQuery) {
        const children = queryAllFutureComponent(element, false);
        children.forEach((child) => {
            child.setParentId(id);
        });

        return;
    }

    const childrenComponent = getAllUserChildPlaceholder({ element });
    childrenComponent.forEach((component) => {
        component.setParentId(id);
    });
};

/**
 * Get first element that contains repaterParent start from last map element.
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.element
 * @returns {string | undefined}
 */
export const getFallBackParentByElement = ({ element }) => {
    if (!element) return;

    return [...componentMap.values()].findLast((item) => {
        return item.element.contains(element) && item.element !== element;
    })?.id;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.compareValue
 * @returns {boolean}
 */
export const compareIdOrParentIdRecursive = ({ id, compareValue }) => {
    if (id === compareValue) return true;

    const item = componentMap.get(id);
    if (!item) return false;

    const parentId = item?.parentId ?? '';
    return compareIdOrParentIdRecursive({ id: parentId, compareValue });
};
