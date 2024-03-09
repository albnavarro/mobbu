/**
 * @type {import("./type").storeMap}
 */
export const storeMap = new Map();

/**
 * @param {string} id
 * @returns {import("./type").storeMapValue}
 */
export const getFormMainMap = (id) => ({ ...storeMap.get(id) });

/**
 * @param {string} id
 * @param {import("./type").storeMapValue} state
 * @returns {void}
 */
export const updateMainMap = (id, state) => storeMap.set(id, state);

/**
 * @param {string} id
 * @returns {void}
 */
export const removeFromMainMap = (id) => storeMap.delete(id);
