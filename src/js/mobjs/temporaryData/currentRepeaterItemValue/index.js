// @ts-check

import { mobCore } from '../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant';

/**
 * @type {Map<string,{'current':object, 'index':number}>}
 */
export const currentRepeaterValueMap = new Map();

/**
 * @param {{ current:object, index:number}} current
 * @returns string
 */
export const setComponentRepeaterState = (current) => {
    /**
     * @type {string}
     */
    const id = mobCore.getUnivoqueId();
    currentRepeaterValueMap.set(id, current);

    return id;
};

/**
 * @param string
 * @return {{ current:object, index:number}}
 */
export const getComponentRepeaterState = (id = '') => {
    const value = currentRepeaterValueMap.get(id);
    currentRepeaterValueMap.delete(id);

    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
};
