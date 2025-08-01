import { componentMap } from '../component-map.js';

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @returns {void}
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
        freezedPros: [...new Set([...freezedPros, prop])],
    });
};

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @returns {void}
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
 * Update element root from generic to real after conversion.
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @returns {boolean}
 */
export const getFreezePropStatus = ({ id = '', prop }) => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const freezedPros = item?.freezedPros;
    if (!freezedPros) return false;

    return freezedPros.includes(prop);
};
