// @ts-check

import { MobCore } from '../../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../../constant';

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
    const id = MobCore.getUnivoqueId();
    currentRepeaterValueMap.set(id, current);

    return id;
};

/**
 * @param {( string | undefined )} id
 * @return {{ current:object, index:number}}
 */
export const getComponentRepeaterState = (id = '') => {
    if (!id) return DEFAULT_CURRENT_REPEATER_STATE;

    const value = currentRepeaterValueMap.get(id);
    currentRepeaterValueMap.delete(id);

    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
};
