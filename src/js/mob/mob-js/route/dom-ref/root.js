// @ts-check

/**
 * @type {HTMLElement}
 */
let root = document.createElement('div');

/**
 * Set root app.
 *
 * @param {object} obj
 * @param {HTMLElement} obj.element returns void
 */
export const setRoot = ({ element }) => {
    root = element;
};

/**
 * Set root app.
 *
 * @returns {HTMLElement}
 */
export const getRoot = () => root;
