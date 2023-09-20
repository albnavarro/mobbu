import { mobCore } from '../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant';

export const currentListValueMap = new Map();

/**
 * @params {{ current:Object, index:Number}}
 * @returns String
 */
export const setCurrentValueList = (current = {}) => {
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
