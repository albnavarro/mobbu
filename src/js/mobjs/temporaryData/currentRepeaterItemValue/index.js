// @ts-check

import { mobCore } from '../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant';

/**
 * @type {Map<String,{'current':Object, 'index':Number}>}
 */
export const currentRepeaterValueMap = new Map();

/**
 * @param {{ current:Object, index:Number}} current
 * @returns String
 */
export const setComponentRepeaterState = (current) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    currentRepeaterValueMap.set(id, current);

    return id;
};

/**
 * @param string
 * @return {{ current:Object, index:Number}}
 */
export const getComponentRepeaterState = (id = '') => {
    const value = currentRepeaterValueMap.get(id);
    currentRepeaterValueMap.delete(id);

    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
};
