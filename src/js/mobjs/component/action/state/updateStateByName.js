// @ts-check

import { getIdByInstanceName } from '../component';
import { updateStateById } from './updateStateById';

/**
 * @param {string} name
 * @returns {(prop:string, value: any, fire:(boolean|undefined), clone: (boolean|undefined)) => void}
 *
 * @description
 * Set state
 */

export const updateStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, fire, clone) =>
        updateStateById(id, prop, value, fire, clone);
};
