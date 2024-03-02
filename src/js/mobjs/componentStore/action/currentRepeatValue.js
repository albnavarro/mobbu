// @ts-check

import { componentMap } from '../store.js';

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {any} obj.value
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setRepeaterStateById = ({ id = '', value }) => {
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
 * @param {object} obj
 * @param {string} obj.id
 * @return { any }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getRepeaterStateById = ({ id = '' }) => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const currentRepeaterState = item?.currentRepeaterState;
    return currentRepeaterState;
};
