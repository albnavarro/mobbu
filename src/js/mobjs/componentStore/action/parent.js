// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { queryAllFutureComponent } from '../../query/queryAllFutureComponent';
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
     * TODO: alternative solution for component that is not parsed inside other component
     * So the non have id added by parent.
     */
    const parentNode = /** @type {HTMLElement|undefined} */ (
        element?.parentNode
    );

    const parent = /** @type {HTMLElement|undefined} */ (
        parentNode?.closest(`[${ATTR_IS_COMPONENT}]`)
    );

    const newItem =
        parent && (!parentId || parentId === '')
            ? {
                  ...item,
                  parentId: parent?.dataset[ATTR_IS_COMPONENT_VALUE] ?? '',
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
export const addSelfIdToFutureComponent = ({ element, id }) => {
    const children = queryAllFutureComponent(element, false);
    children.forEach((child) => {
        // @ts-ignore
        child.setParentId(id);
    });
};
