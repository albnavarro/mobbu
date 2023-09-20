// @ts-check

import { mobCore } from '../../../mobCore';
import { setDestroyCallback } from '../../componentStore/action/removeAndDestroy';
import { UNSET } from '../../constant';
import { getDefaultComponent } from '../../createComponent';

export const onMountCallbackMap = new Map();

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
    onMountCallbackMap.set(id, cb);
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
    const callback = onMountCallbackMap.get(id);

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
    onMountCallbackMap.delete(id);
};

/**
 * @param {Object} obj
 * @param {String} obj.id - random Id
 * @reurn void
 *
 * @description
 * Remove OnMount reference from main store.
 */
export const removeOnMountCallbackReference = ({ id }) => {
    onMountCallbackMap.delete(id);
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
