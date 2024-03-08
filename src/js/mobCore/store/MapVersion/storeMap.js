/**
 * @type {Map<string, any>}
 */
export const storeMap = new Map();
export const getState = (id) => ({ ...storeMap.get(id) });
export const setState = (id, state) => storeMap.set(id, state);
