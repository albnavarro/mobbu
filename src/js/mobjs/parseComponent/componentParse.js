// @ts-check

import { mainStore } from '../mainStore/mainStore';
import { incrementParserCounter } from '../temporaryData/parser/parser';
import { parseComponentsRecursive } from './parseComponentRecursive';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @param {Boolean} [ obj.isCancellable ]
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseComponents = async ({ element, isCancellable = true }) => {
    incrementParserCounter();

    await parseComponentsRecursive({
        element,
        isCancellable,
        currentIterationCounter: 0,
    });
};

/**
 * @description
 * Parse component from inner component generated by first parseComponent.
 * Use pub/sub to avoid circular dependencies.
 *
 * @returns {void}
 */
export const initParseWatcher = () => {
    mainStore.watch('parseComponentEvent', async ({ element }) => {
        await parseComponents({
            element,
        });
    });
};

/**
 * @param {HTMLElement} element
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseDom = async (element) => {
    await parseComponents({
        element,
    });
};
