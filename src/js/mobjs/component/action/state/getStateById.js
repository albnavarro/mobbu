// @ts-check

import { componentMap } from '../../store';

/**
 * @param {string} id
 * @return object
 *
 * @description
 * Get state
 */

export const getStateById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const state = item?.state;
    return state?.get();
};
