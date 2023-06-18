// @ts-check

import { componentStore } from '../store';

/**
 * @param {string} id
 * @param {string} prop
 * @param {function} cb
 * @returns {(Promise.<Function>|undefined)}
 *
 * @description
 * Watch state
 */
export const watchById = (id = '', prop = '', cb = () => {}) => {
    if ((!id || id === '') && (!prop || prop === '')) return undefined;

    /**
     * @type {{instances: Array.<import('../store.js').componentStoreType >}}
     */
    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`watchById failed no id found on prop: ${prop}`);
        return undefined;
    }

    return state.watch(prop, cb);
};
