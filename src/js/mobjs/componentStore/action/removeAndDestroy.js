// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { removeCurrentIdToDynamicProps } from '../../temporaryData/dynamicProps';
import { componentMap } from '../store';
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

    const instances = [...componentMap.values()];

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
        removeAndDestroyById({
            // @ts-ignore
            id: component?.dataset[ATTR_IS_COMPONENT_VALUE],
        })
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

    for (const [key, value] of componentMap) {
        const { child } = value;

        if (key === parentId) {
            componentMap.set(key, {
                ...value,

                child: {
                    ...child,
                    ...removeChildFromChildrenArray({
                        currentChild: child,
                        id,
                        componentName,
                    }),
                },
            });
        }

        if (key === id) {
            const { state, destroy, parentPropsWatcher } = value;

            destroy();
            state.destroy();
            parentPropsWatcher.forEach((unwatch) => unwatch());

            /**
             * Secure check: remove orphas reference from mainStore
             */
            removeCurrentIdToDynamicProps({ componentId: key });
        }
    }

    componentMap.delete(id);

    /**
     * Remove component from dom
     */
    // @ts-ignore
    element?.removeCustomComponent?.();
    element?.remove();
};

/**
 * @returns void
 *
 * @description
 * Remove non persistent component from store.
 * ( all component without element defined in wrapper ).
 */
export const removeCancellableComponent = () => {
    const cancellableComponents2 = [...componentMap.values()].filter(
        ({ isCancellable }) => isCancellable
    );

    cancellableComponents2.forEach(({ id }) => removeAndDestroyById({ id }));
};

/**
 * @returns void
 *
 * @description
 * Remove orphan omponent from store.
 * Secure check.
 */
export const removeOrphanComponent = () => {
    const orphans = [...componentMap.values()].filter(
        ({ element, isCancellable }) =>
            isCancellable && !document.body.contains(element)
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

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, { ...item, destroy: cb });
};
