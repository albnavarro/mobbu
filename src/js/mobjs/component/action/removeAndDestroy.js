// @ts-check

import { removeOrphansBindEvent } from '../../modules/bindEvents';
import {
    removeCurrentIdToBindProps,
    removeOrphansBindProps,
} from '../../modules/bindProps';
import { removeRepeaterComponentTargetByParentId } from '../../modules/repeater/targetcomponent';
import { removeOrphansPropsFromParent } from '../../modules/staticProps';
import { componentMap } from '../store';
import { removeChildFromChildrenArray } from '../utils';
import { removeRepeaterId } from '../../modules/repeater';
import { removeInvalidateId } from '../../modules/invalidate';

/**
 * @param {Object} param
 * @param {string|undefined} param.id
 * @param {string|undefined} param.parentId
 * @param {string} param.componentName
 */
const removeItselfFromParent = ({ id, parentId, componentName }) => {
    if (!id) return;

    const value = componentMap.get(parentId ?? '');
    if (!value) return;

    const { child } = value;
    if (!parentId || !child) return;

    componentMap.set(parentId, {
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
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Remove component to store and destroy it.
 */
export const removeAndDestroyById = ({ id = '' }) => {
    if (!id || id === '') return;

    const instanceValue = componentMap.get(id);
    if (!instanceValue) return;

    const {
        parentId,
        componentName,
        child,
        element,
        state,
        destroy,
        parentPropsWatcher,
    } = instanceValue;

    /**
     * Destroy children.
     */
    Object.values(child ?? {})
        .flat()
        .forEach((childId) => {
            removeAndDestroyById({ id: childId });
        });

    /**
     * Remove itself from parent.
     */
    removeItselfFromParent({ id, parentId, componentName });

    /**
     * Destroy
     */
    destroy?.();
    state.destroy();

    /**
     * Unsubscribe component binding.
     */
    if (parentPropsWatcher) parentPropsWatcher.forEach((unwatch) => unwatch());
    removeRepeaterComponentTargetByParentId({ id });

    /**
     * Clean all invalidate reference
     */
    removeInvalidateId({ id });
    removeRepeaterId({ id });

    /**
     * Secure check: remove orphas reference from mainStore
     */
    removeCurrentIdToBindProps({ componentId: id });
    componentMap.delete(id);

    /**
     * Remove component from dom
     */
    // @ts-ignore
    element?.removeCustomComponent?.();
    element?.remove();
};

/**
 * @param {Object} param
 * @param {string} param.id
 * @param {HTMLElement} param.container
 * @returns void
 *
 * @description
 * Remove all children od component inside a specific Node.
 */
export const destroyComponentInsideNodeById = ({ id, container }) => {
    const instanceValue = componentMap.get(id);
    const child = instanceValue?.child;
    if (!child) return;

    const allChild = Object.values(child ?? {}).flat();

    allChild.forEach((id) => {
        const state = componentMap.get(id);
        const element = state?.element;

        if (element && container?.contains(element)) {
            removeAndDestroyById({ id });
        }
    });
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
    removeOrphansBindProps();
};

/**
 * @param {object} obj
 * @param {object} [ obj.cb ] destroy callback function
 * @param {object} [ obj.id ] component id
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
