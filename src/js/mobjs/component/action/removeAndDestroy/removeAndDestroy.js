// @ts-check

import { removeOrphansBindEvent } from '../../../modules/bindEvents';
import { removeOrphansBindProps } from '../../../modules/bindProps';
import { removeOrphansPropsFromParent } from '../../../modules/staticProps';
import { componentMap } from '../../store';
import { removeAndDestroyById } from './removeAndDestroyById';

/**
 * @param {Object} param
 * @param {string} param.id
 * @param {Element|HTMLElement} param.container
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

        if (element && container?.contains(element) && element !== container) {
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
    const cancellableComponents = [...componentMap.values()].filter(
        ({ persistent }) => !persistent
    );

    cancellableComponents.forEach(({ id }) => removeAndDestroyById({ id }));
};

/**
 * @returns void
 *
 * @description
 * Remove orphan omponent from store.
 * Secure check.
 */
export const removeOrphanTempIds = () => {
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
