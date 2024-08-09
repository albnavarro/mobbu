// @ts-check

/**
 * @type {HTMLElement}
 */
let root = document.createElement('div');

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setRoot = ({ element }) => {
    root = element;
};

/**
 * @returns { HTMLElement }
 *
 * @description
 * Set root app.
 */
export const getRoot = () => root;
