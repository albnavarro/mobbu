// @ts-check

import { getIdByInstanceName } from '../component';
import { getStateById } from './get-state-by-id';

/**
 * Get state by name
 *
 * @param {string} name
 * @returns Object
 */

export const getStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return getStateById(id);
};
