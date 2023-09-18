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

    const { parentId } = componentMap.get(id);
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
    const parentId2 = item?.parentId;
    const componentName2 = item?.component;
    if (!parentId2) return;

    for (const [key, value] of componentMap) {
        const { child } = value;

        if (key === parentId2) {
            componentMap.set(key, {
                ...value,

                child: {
                    ...child,
                    ...updateChildrenArray({
                        currentChild: child,
                        id,
                        componentName: componentName2,
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
                  parentId: parent?.dataset[ATTR_IS_COMPONENT_VALUE],
              }
            : item;

    componentMap.set(componentId, newItem);
};
