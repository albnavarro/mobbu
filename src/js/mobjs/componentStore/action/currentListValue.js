// @ts-check

import { componentMap } from '../store.js';

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {any} obj.value
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setCurrentListValueById = ({ id = '', value }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, {
        ...item,
        currentRepeaterState: value,
        isRepeater: true,
    });
};

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @return { any }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getCurrentListValueById = ({ id = '' }) => {
    if (!id || id === '') return false;

    const { currentRepeaterState } = componentMap.get(id);
    return currentRepeaterState;
};
