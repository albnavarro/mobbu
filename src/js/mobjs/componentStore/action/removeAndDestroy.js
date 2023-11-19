// @ts-check

import { removeOrphansBindEvent } from '../../temporaryData/bindEvents';
import {
    removeCurrentIdToDynamicProps,
    removeOrphansDynamicProps,
} from '../../temporaryData/dynamicProps';
import { removeRepeaterComponentTargetByParentId } from '../../temporaryData/repeaterTargetComponent';
import { removeOrphansPropsFromParent } from '../../temporaryData/staticProps';
import { componentMap } from '../store';
import { removeChildFromChildrenArray } from '../utils';

/**
 * @param {HTMLElement} parent
 * @return void
 *
 *
 * @description
 * Remove component to store and destroy it.
 */
// const removeAllChildNodes = (parent) => {
//     while (parent.firstChild) {
//         parent.firstChild.remove();
//     }
// };

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Remove component to store and destroy it.
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
     * Remove children.
     */
    const item = componentMap.get(id);
    const child = item?.child ?? {};
    Object.values(child)
        .flat()
        .forEach((childId) => {
            removeAndDestroyById({ id: childId });
        });

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
        if (!child) break;

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
            if (parentPropsWatcher)
                parentPropsWatcher.forEach((unwatch) => unwatch());
            removeRepeaterComponentTargetByParentId({ id: key });

            /**
             * Secure check: remove orphas reference from mainStore
             */
            removeCurrentIdToDynamicProps({ componentId: key });
        }
    }

    componentMap.delete(id);

    /**
     * Remove all inner node before remove element.
     * here we remove event handlers.
     * Prevent memory leaks.
     * Should not necessary on modern browser.
     */
    // removeAllChildNodes(element);

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

    /**
     * Remove props reference.
     * Async loading and interrupt can leave rubbish.
     */
    removeOrphansPropsFromParent();
    removeOrphansBindEvent();
    removeOrphansDynamicProps();
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
