// @ts-check

/**
 * @type {import("../../type").PageTransition|(() => void)}
 */
let pageTransition = () => {};

/**
 * @type {import("../../type").BeforePageTransition|(() => void)}
 */
let beforePageTransition = () => {};

/**
 * @param {object} obj
 * @param {import("../../type").BeforePageTransition} [ obj.fn ]
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
 * @param {object} obj
 * @param {(import("../../type").PageTransition)} [ obj.fn ]
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
 * @returns {import("../../type").BeforePageTransition|(() => void)}
 *
 */
export const getBeforePageTransition = () => beforePageTransition;

/**
 * @returns {import("../../type").PageTransition|(() => void)}
 *
 */
export const getPageTransition = () => pageTransition;
