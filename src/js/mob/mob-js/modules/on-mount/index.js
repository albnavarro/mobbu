// @ts-check

import { setDestroyCallback } from '../../component/action/remove-and-destroy/set-destroy-callback';

/**
 * @type {Map<string, Function>}
 */
export const onMountCallbackMap = new Map();

/**
 * Add ouMount callback to store.
 *
 * @param {object} params
 * @param {string} params.id - Random Id
 * @param {import('./type').OnMountCallback} params.cb - OnMount callback
 * @returns {void}
 */
export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    onMountCallbackMap.set(id, cb);
};

/**
 * Fire onMount callback.
 *
 * @param {object} params
 * @param {string} params.id - Component id
 * @param {HTMLElement | import('../../web-component/type').UserComponent} params.element - Root component HTMLElement.
 */
export const fireOnMountCallBack = async ({ id, element }) => {
    const callback = onMountCallbackMap.get(id);

    /**
     * OnMount callback can be async. Pass root component HTMLElement as parameter.
     *
     * @type {() => void} destroy Callback
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
 * Remove OnMount reference from main store.
 *
 * @param {object} params
 * @param {string} params.id - Random Id
 * @returns {void}
 */
export const removeOnMountCallbackReference = ({ id }) => {
    onMountCallbackMap.delete(id);
};
