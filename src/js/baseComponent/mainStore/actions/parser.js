import { mainStore } from '../mainStore';

/**
 * Increment the number of parser active.
 */
export const incrementParserCounter = () => {
    mainStore.set('activeParser', (prev) => {
        return prev + 1;
    });
};

/**
 * Decrement the number of parser active.
 */
export const decrementParserCounter = () => {
    mainStore.set('activeParser', (prev) => {
        return prev - 1;
    });

    const { activeParser } = mainStore.get();
    return activeParser;
};
