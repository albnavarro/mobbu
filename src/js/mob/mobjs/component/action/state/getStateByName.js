// @ts-check

import { getIdByInstanceName } from '../component';
import { getStateById } from './getStateById';

/**
 * @param {string} name
 * @return object
 *
 * @description
 * Get state by name
 */

export const getStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return getStateById(id);
};
