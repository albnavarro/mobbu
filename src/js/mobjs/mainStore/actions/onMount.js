// @ts-check

import { setDestroyCallback } from '../../updateList/addWithoutKey';
import { mainStore } from '../mainStore';

/**
 * @param {Object} obj
 * @param {String} obj.id - random Id
 * @param {Function} obj.cb - OnMount callback
 * @reurn void
 *
 * @description
 * Add ouMount callback to store.
 */
export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    mainStore.set('onMountCallback', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: cb }];
    });
};

/**
 * @param {Object} obj
 * @param {String} obj.id - component id
 * @param {HTMLElement} obj.element - root component HTMLElement.
 *
 * @description
 * Fire onMount callback.
 */
export const fireOnMountCallBack = async ({ id, element }) => {
    const { onMountCallback } = mainStore.get();

    /**
     * @type {Object}
     */
    const currentItem = onMountCallback.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    /**
     * @type {Function|undefined}
     *
     * @description
     * If callback is not used addOnMoutCallback is not fired.
     * So there is no callback ( undefined )
     */
    const callback = currentItem?.[id];

    /**
     * @type {Function} destroy callback
     *
     * @description
     * OnMount callback can be async.
     * Pass root component HTMLElement as parameter.
     */
    const destroyCallback = await callback?.({ element });

    /**
     * Update destroy callback
     */
    setDestroyCallback({ cb: destroyCallback, id });

    /**
     * Remove callback
     */
    mainStore.set('onMountCallback', (/** @type {Array} */ prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });
};
