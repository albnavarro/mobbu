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

/**
 * @param {object} params
 * @param {HTMLElement} params.source
 * @param {HTMLElement} params.target
 * @returns {void}
 */
export const transferAllAttributes = ({ source, target }) => {
    for (const attr of source.attributes) {
        if (attr.name.startsWith('__')) continue;

        /**
         * Style attribute should be added to existet.
         */
        if (attr.name === 'style') {
            target.style.cssText += ';' + attr.value;
            continue;
        }

        /**
         * Class attribute should be added to existet.
         */
        if (attr.name === 'class') {
            for (const cls of attr.value.split(/\s+/)) {
                if (cls) target.classList.add(cls);
            }
            continue;
        }

        /**
         * Generic attribute override original if exist.
         */
        target.setAttribute(attr.name, attr.value);
    }
};
