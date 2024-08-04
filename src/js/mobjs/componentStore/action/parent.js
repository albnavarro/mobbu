// @ts-check

import { useQuery } from '../../parseComponent/useQuery';
import { queryAllFutureComponent } from '../../query/queryAllFutureComponent';
import { getAllUserChildPlaceholder } from '../../webComponent/usePlaceHolderToRender';
import { componentMap } from '../store';
import { updateChildrenArray } from '../utils';

/**
 * @param {string} id
 * @returns {string|undefined}
 *
 * @description
 * Get parent id By id
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
 * @param {object} obj
 * @param {string} obj.id
 *
 * @description
 * Update child id.
 * From current component id get parentID and then add to parent child id
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
 * @param {object} params
 * @param {string} params.componentId
 * @returns void
 *
 * @description
 * Set a reference to parent component id for each component.
 */
export const setParentsIdFallback = ({ componentId }) => {
    const item = componentMap.get(componentId);
    if (!item) return;

    const { element, parentId } = item;

    /**
     * Repeater has parentid from placeholder creation.
     */
    if (parentId && parentId.length > 0) return;

    /**
     * Get first element that contains componentToParse start from last map element.
     */
    const fallBackParentId = getFallBackParentByElement({
        element,
    });

    const newItem =
        fallBackParentId && fallBackParentId !== ''
            ? {
                  ...item,
                  parentId: fallBackParentId ?? '',
              }
            : item;

    componentMap.set(componentId, newItem);
};

/**
 * @returns void
 *
 * @description
 * Add self id to future component.
 * If id is assigned to component nested in next cycle will be override.
 */
export const addParentIdToFutureComponent = ({ element, id }) => {
    const children = useQuery
        ? queryAllFutureComponent(element, false)
        : getAllUserChildPlaceholder({ element });

    children.forEach((child) => {
        child.setParentId(id);
    });
};

/**
 * @param {object} params
 * @param {HTMLElement} params.element
 * @returns {string}
 *
 * @description
 * Get first element that contains repaterParent start from last map element.
 */
export const getFallBackParentByElement = ({ element }) => {
    return [...componentMap.values()].reverse().find((item) => {
        return item.element.contains(element) && item.element !== element;
    })?.id;
};
