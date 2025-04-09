// @ts-check

import { componentMap } from '../../store';

/**
 * Get state
 *
 * @param {string} id
 * @returns Object
 */

export const getStateById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const state = item?.state;
    return state?.get();
};
