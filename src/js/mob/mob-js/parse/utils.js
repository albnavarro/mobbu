/**
 * @type {number}
 */
let currentIterationCounter = 0;

/**
 * @returns {void}
 */
export const incrementCurrentIterationCounter = () => {
    currentIterationCounter += 1;
};

/**
 * @returns {number}
 */
export const getCurrentIterationCounter = () => currentIterationCounter;

/**
 * @returns {void}
 */
export const resetCurrentIterationCounter = () => {
    currentIterationCounter = 0;
};
