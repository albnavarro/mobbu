// @ts-check

import { IS_COMPONENT } from '../../constant';
import { componentStore } from '../store';
import { updateChildrenArray } from '../utils';

/**
 * @param {String} id
 * @returns {String|undefined}
 *
 * @description
 * Get parent id By id
 */
export const getParentIdById = (id = '') => {
    if (!id || id === '') return undefined;

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    /**
     */
    const parentId = instance?.parentId;
    if (!parentId) {
        console.warn(`getParentIdById failed no id found`);
        return undefined;
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
    if (!id || id === '') return undefined;

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    // Get parentId of current component.
    const parentId = instance?.parentId;
    const componentName = instance?.component ?? '';
    if (!parentId) return;

    // Add component Id to parent element.
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                return currentId === parentId
                    ? {
                          ...item,
                          ...{
                              child: {
                                  ...item.child,
                                  ...updateChildrenArray({
                                      currentChild: item.child,
                                      id,
                                      componentName,
                                  }),
                              },
                          },
                      }
                    : item;
            });
        }
    );
};

/**
 * @returns void
 *
 * @description
 * Set a reference to parent component id for each component.
 */
export const setParentsComponent = () => {
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { element, parentId } = item;

                const parentNode = /** @type {HTMLElement|undefined} */ (
                    element?.parentNode
                );

                const parent = /** @type {HTMLElement|undefined} */ (
                    parentNode?.closest(`[${IS_COMPONENT}]`)
                );

                // Assign is if existe a parent component and current parentId is null/undefined
                return parent && (!parentId || parentId === undefined)
                    ? { ...item, ...{ parentId: parent.id } }
                    : item;
            });
        }
    );
};
