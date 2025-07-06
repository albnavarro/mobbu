import { getIdByInstanceName } from '../component';
import { setStateById } from './set-state-by-id';

/**
 * Set state by name
 *
 * @template T
 * @param {string} name
 * @returns {import('../../../type').SetStateByName<T>}
 */
export const setStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, { emit = true } = {}) =>
        setStateById(id, /** @type {string} */ (prop), value, { emit });
};
