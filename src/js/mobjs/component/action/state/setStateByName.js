// @ts-check

import { getIdByInstanceName } from '../component';
import { setStateById } from './setStateById';

/**
 * @param {string} name
 * @returns {(prop:string, value:any, options?: { emit?: boolean }) => void}
 *
 * @description
 * Set state
 */

export const setStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, { emit = true } = {}) =>
        setStateById(id, prop, value, { emit });
};
