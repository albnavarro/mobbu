// @ts-check

import { getIdByInstanceName } from '../component';
import { updateStateById } from './updateStateById';

/**
 * @param {string} name
 * @returns {(prop:string, value: any, options?: { emit?: boolean, clone?: boolean }) => void}
 *
 * @description
 * Set state
 */

export const updateStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, { emit = true, clone = false } = {}) =>
        updateStateById(id, prop, value, { emit, clone });
};
