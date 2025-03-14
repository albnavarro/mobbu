/** @type{string[]} */
let current_computed_keys = [];
let active = false;

/**
 * @returns{void}
 */
export const initializeCurrentComputedKey = () => {
    active = true;
    current_computed_keys.length = 0;
};

/**
 * @description
 * Return a copy of items.
 * Avoid side effect.
 *
 * @returns{string[]}
 */
export const getCurrentComputedKey = () => {
    active = false;
    return [...current_computed_keys];
};

/**
 * @param {string} key
 * @returns{void}
 */
export const setCurrentComputedKey = (key) => {
    if (!active || !key) return;
    if (current_computed_keys.includes(key)) return;
    current_computed_keys = [...current_computed_keys, key];
};
