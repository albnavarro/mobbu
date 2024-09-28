// @ts-check

import { setDestroyCallback } from '../../component/action/removeAndDestroy';

/**
 * @type {Map<string,Function>}
 */
export const onMountCallbackMap = new Map();

/**
 * @param {object} obj
 * @param {string} obj.id - random Id
 * @param {(arg0:{ element:HTMLElement,refs:{[key:string]:HTMLElement|HTMLElement[]} })=>void} obj.cb - OnMount callback
 * @return void
 *
 * @description
 * Add ouMount callback to store.
 */
export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    onMountCallbackMap.set(id, cb);
};

/**
 * @param {object} obj
 * @param {string} obj.id - component id
 * @param {HTMLElement|import("../../webComponent/type").userComponent} obj.element - root component HTMLElement.
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
 * @param {object} obj
 * @param {string} obj.id - random Id
 * @return void
 *
 * @description
 * Remove OnMount reference from main store.
 */
export const removeOnMountCallbackReference = ({ id }) => {
    onMountCallbackMap.delete(id);
};
