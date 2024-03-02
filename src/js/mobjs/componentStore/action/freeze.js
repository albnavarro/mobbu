// @ts-check

import { componentMap } from '../store.js';

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const freezePropById = ({ id = '', prop }) => {
    if (!id || id === '') return;

    // - new
    const item = componentMap.get(id);
    if (!item) return;

    const { freezedPros } = item;
    if (!freezedPros) return;

    componentMap.set(id, {
        ...item,
        freezedPros: [...freezedPros, prop],
    });
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const unFreezePropById = ({ id = '', prop }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    const { freezedPros } = item;
    if (!freezedPros) return;

    componentMap.set(id, {
        ...item,
        freezedPros: freezedPros.filter((currentProp) => currentProp !== prop),
    });
};

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @return { boolean }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getFreezePropStatus = ({ id = '', prop }) => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const freezedPros = item?.freezedPros;
    if (!freezedPros) return false;

    return freezedPros.includes(prop);
};
