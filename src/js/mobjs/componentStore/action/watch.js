// @ts-check

import { componentMap } from '../store';

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
    if ((!id || id === '') && (!prop || prop === '')) return;
    const { state } = componentMap.get(id);

    return state.watch(prop, cb);
};
