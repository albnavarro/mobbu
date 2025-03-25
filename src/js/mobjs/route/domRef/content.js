// @ts-check

/** @type {string} */
let contentAttributeId = '';

/** @type {HTMLElement|null} */
let DOMContentElement;

/**
 * @param {object} obj
 * @param {string} obj.contentId
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setContentId = ({ contentId = '' }) => {
    contentAttributeId = contentId;
};

/**
 * @returns {string}
 *
 * @description
 * Set root app.
 */
export const getContentId = () => contentAttributeId;

/** @returns {void} */
export const setContentElement = () => {
    DOMContentElement = document?.querySelector(contentAttributeId);
};

/** @returns {HTMLElement|null} */
export const getContentElement = () => DOMContentElement;
