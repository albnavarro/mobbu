// @ts-check

import { componentMap } from '../store';

/**
 * @param {string} id
 * @param {string} prop
 * @param {(arg0: any) => void} cb
 * @param {{wait?: boolean}} [ options ]
 * @returns {(( function():void )|undefined)}
 *
 * @description
 * Watch state
 */
export const watchById = (
    id = '',
    prop = '',
    cb = () => {},
    { wait = false } = {}
) => {
    if ((!id || id === '') && (!prop || prop === '')) return;
    const item = componentMap.get(id);
    const state = item?.state;

    return state?.watch(prop, cb, { wait: wait ?? false });
};
