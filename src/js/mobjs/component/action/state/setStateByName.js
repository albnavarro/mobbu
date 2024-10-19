// @ts-check

import { getIdByInstanceName } from '../component';
import { setStateById } from './setStateById';

/**
 * @param {string} name
 * @returns {(prop:string, value:any, fire:(boolean|undefined)) => void}
 *
 * @description
 * Set state
 */

export const setStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, fire) => setStateById(id, prop, value, fire);
};
