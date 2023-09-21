// @ts-check

/**
 * @type {Number}
 */
let parserCounter = 0;

/**
 * @return void
 *
 * @description
 * Increment the number of parser active.
 */
export const incrementParserCounter = () => {
    parserCounter += 1;
};

/**
 * @return Number - how many parser is active.
 *
 * @description
 * Decrement the number of parser active.
 */
export const decrementParserCounter = () => {
    parserCounter -= 1;
    return parserCounter;
};

/**
 * @return void
 *
 * @description
 * reset paresercounter;
 */
export const resetParserCounter = () => {
    parserCounter = 0;
};
