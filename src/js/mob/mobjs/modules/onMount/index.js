// @ts-check

import { setDestroyCallback } from '../../component/action/removeAndDestroy/setDestroyCallback';

/**
 * @type {Map<string,Function>}
 */
export const onMountCallbackMap = new Map();

/**
 * @param {object} params
 * @param {string} params.id - random Id
 * @param {import('./type').OnMountCallback} params.cb - OnMount callback
 * @return void
 *
 * @description
 * Add ouMount callback to store.
 */
export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    onMountCallbackMap.set(id, cb);
};

/**
 * @param {object} params
 * @param {string} params.id - component id
 * @param {HTMLElement|import("../../webComponent/type").UserComponent} params.element - root component HTMLElement.
 *
 * @description
 * Fire onMount callback.
 */
export const fireOnMountCallBack = async ({ id, element }) => {
    const callback = onMountCallbackMap.get(id);

    /**
     * @type {() => void} destroy callback
     *
     * @description
     * OnMount callback can be async.
     * Pass root component HTMLElement as parameter.
     */
    const destroyCallback = await callback?.({
        element,
    });

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
 * @param {object} params
 * @param {string} params.id - random Id
 * @return void
 *
 * @description
 * Remove OnMount reference from main store.
 */
export const removeOnMountCallbackReference = ({ id }) => {
    onMountCallbackMap.delete(id);
};
