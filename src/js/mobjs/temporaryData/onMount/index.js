// @ts-check

import { mobCore } from '../../../mobCore';
import { setDestroyCallback } from '../../componentStore/action/removeAndDestroy';
import { UNSET } from '../../constant';
import { getDefaultComponent } from '../../createComponent';
import { mainStore } from '../../mainStore/mainStore';

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

/**
 * @param {Object} obj
 * @param {Boolean|'UNSET'} obj.isolateOnMount
 * @param {String} obj.id - component id
 * @param {HTMLElement} obj.element - root component HTMLElement.
 * @returns Function
 *
 * @description
 * Fire onMount callback.
 */
export const executeFireOnMountCallBack = ({ isolateOnMount, id, element }) => {
    const isolateOnMountParsed =
        isolateOnMount === UNSET
            ? getDefaultComponent().isolateOnMount
            : isolateOnMount;

    return isolateOnMountParsed
        ? /**
           * With heavy onMount function fire next one frame after.
           */
          new Promise((resolve) => {
              fireOnMountCallBack({
                  id,
                  element,
              });

              setTimeout(() => {
                  mobCore.useFrame(() => {
                      mobCore.useNextTick(() => {
                          resolve({ success: true });
                      });
                  });
              });
          })
        : fireOnMountCallBack({ id, element });
};
