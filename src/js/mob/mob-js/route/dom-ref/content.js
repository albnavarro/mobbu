/** @type {string} */
let contentAttributeId = '';

/** @type {HTMLElement | null} */
let DOMContentElement;

/**
 * Set root app.
 *
 * @param {object} obj
 * @param {string} obj.contentId Returns void
 */
export const setContentId = ({ contentId = '' }) => {
    contentAttributeId = contentId;
};

/**
 * Set root app.
 *
 * @returns {string}
 */
export const getContentId = () => contentAttributeId;

/** @returns {void} */
export const setContentElement = () => {
    DOMContentElement = document?.querySelector(contentAttributeId);
};

/** @returns {HTMLElement | null} */
export const getContentElement = () => DOMContentElement;
