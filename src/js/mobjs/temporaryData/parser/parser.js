// @ts-check

import { mainStore } from '../../mainStore/mainStore';

/**
 * @return void
 *
 * @description
 * Increment the number of parser active.
 */
export const incrementParserCounter = () => {
    mainStore.set('activeParser', (/** @type {Number} */ prev) => {
        return prev + 1;
    });
};

/**
 * @return Number - how many parser is active.
 *
 * @description
 * Decrement the number of parser active.
 */
export const decrementParserCounter = () => {
    mainStore.set('activeParser', (/** @type {Number} */ prev) => {
        return prev - 1;
    });

    const { activeParser } = mainStore.get();
    return activeParser;
};

/**
 * @return void
 *
 * @description
 * reset paresercounter;
 */
export const resetParserCounter = () => {
    mainStore.set('activeParser', 0);
};
