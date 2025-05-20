import { getIdByInstanceName } from '../component';
import { setStateById } from './set-state-by-id';

/**
 * Set state
 *
 * @param {string} name
 * @returns {(prop: string, value: any, options?: { emit?: boolean }) => void}
 */

export const setStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, { emit = true } = {}) =>
        setStateById(id, prop, value, { emit });
};
