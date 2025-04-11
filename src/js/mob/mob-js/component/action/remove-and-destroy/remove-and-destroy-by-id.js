// @ts-check

import { removeCurrentIdToBindProps } from '../../../modules/bind-props/remove-current-id-to-bind-props';
import { removeBindObjectParentById } from '../../../modules/bind-object';
import { removeBindTextParentById } from '../../../modules/bind-text';
import { removeInvalidateId } from '../../../modules/invalidate/action/remove-invalidate-id';
import { removeRepeaterId } from '../../../modules/repeater/action/remove-repeater-id';
import { componentMap } from '../../store';
import { removeItselfFromParent } from './remove-itself-from-parent';

/**
 * Remove component to store and destroy it.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {void}
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

    /**
     * Clean all invalidate reference
     */
    removeInvalidateId({ id });
    removeRepeaterId({ id });
    removeBindTextParentById({ id });
    removeBindObjectParentById({ id });

    /**
     * Secure check: remove orphas reference from mainStore
     */
    removeCurrentIdToBindProps({ componentId: id });

    /**
     * Remove component from dom
     */
    // @ts-ignore
    element?.removeCustomComponent?.();
    element?.remove();

    /**
     * Detach component. Remove inner reference ( esplicit mark for CG ). Detach component from map.
     */

    // @ts-ignore
    instanceValue.methods = null;

    // @ts-ignore
    instanceValue.refs = null;

    // @ts-ignore
    instanceValue.repeaterInnerWrap = null;

    // @ts-ignore
    instanceValue.element = null;

    // @ts-ignore
    instanceValue.currentRepeaterState = null;

    // @ts-ignore
    instanceValue.state = null;

    componentMap.delete(id);
};
