/**
 * @type {boolean}
 */
let shouldFireEvent = true;

/**
 * @returns {void}
 */
export const allowFireEvent = () => {
    shouldFireEvent = true;
};

/**
 * @returns {void}
 */
export const preventFireEvent = () => {
    shouldFireEvent = false;
};

/**
 * @returns {boolean}
 */
export const getFireEvent = () => shouldFireEvent;
