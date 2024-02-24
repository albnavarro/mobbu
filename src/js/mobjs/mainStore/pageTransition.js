// @ts-check

/**
 * @type {import("../type").pageTransition|(() => void)}
 */
let pageTransition = () => {};

/**
 * @type {import("../type").beforePageTransition|(() => void)}
 */
let beforePageTransition = () => {};

/**
 * @param {Object} obj
 * @param {import("../type").beforePageTransition} [ obj.fn ]
 * returns void
 *
 *
 * @description
 */
export const setBeforePageTransition = ({ fn }) => {
    if (!fn) return;

    beforePageTransition = fn;
};

/**
 * @param {Object} obj
 * @param {(import("../type").pageTransition)} [ obj.fn ]
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setPageTransition = ({ fn }) => {
    if (!fn) return;

    pageTransition = fn;
};

/**
 * @returns {import("../type").beforePageTransition|(() => void)}
 *
 */
export const getBeforePageTransition = () => beforePageTransition;

/**
 * @returns {import("../type").pageTransition|(() => void)}
 *
 */
export const getPageTransition = () => pageTransition;
