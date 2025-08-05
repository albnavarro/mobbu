import { useParentIdQuery, useQuery } from '../../parse/strategy';
import { queryAllFutureComponent } from '../../query/query-all-future-component';
import { getAllUserChildPlaceholder } from '../../modules/user-component';
import { componentMap } from '../component-map';
import { updateChildrenArray } from '../utils';
import { getIdFromWeakElementMap } from '../weak-element-map';

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

    if (useParentIdQuery) {
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
 * Find first component parent node.
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.element
 * @returns {string | undefined}
 */
export const getParentIdFromWeakElementMap = ({ element }) => {
    if (!element) return;
    let parentNode = element.parentNode;

    /**
     * @type {string | undefined}
     */
    let id;

    while (parentNode && !id) {
        id = getIdFromWeakElementMap({
            element: /** @type {HTMLElement} */ (parentNode),
        });

        if (!id) {
            parentNode = parentNode.parentNode;
        }
    }

    return id ?? '';
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
