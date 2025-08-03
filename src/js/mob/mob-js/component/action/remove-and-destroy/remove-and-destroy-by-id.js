import { removeCurrentIdToBindProps } from '../../../modules/bind-props/remove-current-id-to-bind-props';
import { removeBindObjectParentById } from '../../../modules/bind-object';
import { removeBindTextParentById } from '../../../modules/bind-text';
import { removeInvalidateId } from '../../../modules/invalidate/action/remove-invalidate-id';
import { removeRepeaterId } from '../../../modules/repeater/action/remove-repeater-id';
import { componentMap } from '../../component-map';
import { removeItselfFromParent } from './remove-itself-from-parent';
import { removeRepeaterComponentChildren } from '../../../modules/repeater/action/set-repeat-component-children';
import { removeIdFromInstanceMap } from '../../instance-map';

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
        componentRepeatId,
        instanceName,
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
     * Remove id component from repeaterPlaceholderMap.
     */
    if (componentRepeatId && componentRepeatId.length > 0) {
        removeRepeaterComponentChildren({
            componentId: id,
            repeatId: componentRepeatId,
        });
    }

    /**
     * Remove id component from instanceMap.
     */
    if (instanceName && instanceName.length > 0) {
        removeIdFromInstanceMap({ instanceName, id });
    }

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
