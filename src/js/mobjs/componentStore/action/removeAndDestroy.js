// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { removeOnMountCallbackReference } from '../../mainStore/actions/onMountReference';
import { removeCurrentIdToDynamicProps } from '../../mainStore/actions/props';
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

    const instances2 = [...componentMap.values()];

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const { component: componentName2, element: element2 } =
        instances2.find(({ id: currentId }) => {
            return currentId === id;
        }) || {};

    if (!element2 || !componentName2) return;

    /**
     * Destroy all component nested.
     */
    const componentNested2 = element2.querySelectorAll(
        `[${ATTR_IS_COMPONENT}]`
    );
    [...componentNested2].forEach((component) =>
        removeAndDestroyById({
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
    const parentInstance2 = instances2.find(({ child }) => {
        const parentComponentArray = child?.[componentName2] ?? [];
        return parentComponentArray.includes(id);
    });

    /**
     * get parentId, and remove id from parent
     */
    const parentId2 = parentInstance2?.id;

    for (const [key, value] of componentMap) {
        const { child } = value;

        if (key === parentId2) {
            componentMap.set(key, {
                ...value,

                child: {
                    ...child,
                    ...removeChildFromChildrenArray({
                        currentChild: child,
                        id,
                        componentName: componentName2,
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
            removeOnMountCallbackReference({ id: key });
            removeCurrentIdToDynamicProps({ componentId: key });
        }
    }

    componentMap.delete(id);

    /**
     * Remove component from dom
     */
    // @ts-ignore
    element2?.removeCustomComponent?.();
    element2?.remove();
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
    const orphans2 = [...componentMap.values()].filter(
        ({ element, isCancellable }) =>
            isCancellable && !document.body.contains(element)
    );

    orphans2.forEach(({ id }) => removeAndDestroyById({ id }));
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
    componentMap.set(id, { ...item, destroy: cb });
};
