// @ts-check

import { mobCore } from '../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant';

/**
 * @type {Map<String,{'current':Object, 'index':Number}>}
 */
export const currentListValueMap = new Map();

/**
 * @param {{ current:Object, index:Number}} current
 * @returns String
 */
export const setCurrentValueList = (current) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    currentListValueMap.set(id, current);

    return id;
};

/**
 * @param string
 * @return {{ current:Object, index:Number}}
 */
export const getCurrentValueList = (id = '') => {
    const value = currentListValueMap.get(id);
    currentListValueMap.delete(id);

    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
};
