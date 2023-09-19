// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { componentMap } from '../store';
import { updateChildrenArray } from '../utils';

/**
 * @param {String} id
 * @returns {String|undefined}
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
 * @param {Object} obj
 * @param {String} obj.id
 *
 * @description
 * Update child id.
 * From current component id get parentID and then add to parent child id
 */
export const addSelfToParentComponent = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentId = item?.parentId;
    const componentName = item?.component ?? '';
    if (!parentId) return;

    for (const [key, value] of componentMap) {
        const { child } = value;

        if (key === parentId) {
            componentMap.set(key, {
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
        }
    }
};

/**
 * @returns void
 *
 * @description
 * Set a reference to parent component id for each component.
 */
export const setParentsComponent = ({ componentId }) => {
    const item = componentMap.get(componentId);
    if (!item) return;

    const { element, parentId } = item;

    const parentNode = /** @type {HTMLElement|undefined} */ (
        element?.parentNode
    );

    const parent = /** @type {HTMLElement|undefined} */ (
        parentNode?.closest(`[${ATTR_IS_COMPONENT}]`)
    );

    const newItem =
        parent && (!parentId || parentId === undefined)
            ? {
                  ...item,
                  parentId: parent?.dataset[ATTR_IS_COMPONENT_VALUE] ?? '',
              }
            : item;

    componentMap.set(componentId, newItem);
};
