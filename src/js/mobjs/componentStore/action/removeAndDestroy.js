// @ts-check

import { ATTR_IS_COMPONENT } from '../../constant';
import { removeCurrentIdToDynamicProps } from '../../mainStore/actions/props';
import { componentStore } from '../store';
import { removeChildFromChildrenArray } from '../utils';

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Remove component to store and destry it.
 */
export const removeAndDestroyById = ({ id = '' }) => {
    if (!id || id === '') return;

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const { component: componentName, element } =
        instances.find(({ id: currentId }) => {
            return currentId === id;
        }) || {};

    if (!element || !componentName) return;

    /**
     * Destroy all component nested.
     */
    const componentNested = element.querySelectorAll(`[${ATTR_IS_COMPONENT}]`);
    [...componentNested].forEach((component) =>
        removeAndDestroyById({ id: component.id })
    );

    /**
     * -------------
     * Remove id from parent child array.
     * -------------
     */

    /**
     * get parent instance filtered by componentName
     */
    const parentInstance = instances.find(({ child }) => {
        const parentComponentArray = child?.[componentName] ?? [];
        return parentComponentArray.includes(id);
    });

    /**
     * get parentId, and remove id from parent
     */
    const parentId = parentInstance?.id;
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
                                  ...removeChildFromChildrenArray({
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

    /**
     * Remove item From store.
     */
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.filter((current) => {
                const {
                    state,
                    destroy,
                    element,
                    id: currentId,
                    parentPropsWatcher,
                } = current;
                if (currentId === id) {
                    destroy();
                    state.destroy();
                    element?.remove();
                    //Secure check remove orphas reference in mainStore
                    removeCurrentIdToDynamicProps({ componentId: currentId });
                    parentPropsWatcher.forEach((unwatch) => {
                        unwatch();
                    });
                }

                // Assign is if existe a parent component and current parentId is null
                return id !== currentId;
            });
        }
    );

    /**
     * Remove component from dom
     */
    element?.remove();
};

/**
 * @returns void
 *
 * @description
 * Remove orphan omponent from store.
 */
export const removeOrphanComponent = () => {
    const { instances } = componentStore.get();

    /**
     * @type {Array<import('../store.js').componentStoreType>}
     */
    const orphans = instances.filter(
        ({ element }) => !document.body.contains(element)
    );

    orphans.forEach(({ id }) => removeAndDestroyById({ id }));
};

/**
 * @param {Object} obj
 * @param {Object} [ obj.cb ] destroy callback function
 * @param {Object} [ obj.id ] component id
 *
 * @description
 * Update deestroy call back by id.
 */
export const setDestroyCallback = ({ cb = () => {}, id = null }) => {
    if (!id) return;

    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                return id === currentId
                    ? { ...item, ...{ destroy: cb } }
                    : item;
            });
        }
    );
};
