/**
 * @type{WeakMap<HTMLElement, string>}
 */
const weakElementMap = new WeakMap();

/**
 * @param {object} params
 * @param {HTMLElement} params.element
 * @param {string} params.id
 */
export const addElementToWeakElementMap = ({ element, id }) => {
    weakElementMap.set(element, id);
};

/**
 * @param {object} params
 * @param {HTMLElement} params.element
 * @returns {string | undefined}
 */
export const getIdFromWeakElementMap = ({ element }) => {
    return weakElementMap.get(element);
};
