import { getIdByInstanceName } from '../component';
import { updateStateById } from './update-state-by-id';

/**
 * Update state by name
 *
 * @template T
 * @param {string} name
 * @returns {import('../../../type').UpdateStateByName<T>}
 */

export const updateStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, { emit = true, clone = false } = {}) =>
        updateStateById(
            id,
            /** @type {string} */ (prop),
            /** @type {() => any} */ (value),
            {
                emit,
                clone,
            }
        );
};
