// @ts-check

import { incrementParserCounter } from '../mainStore/actions/parser';
import { parseComponentsRecursive } from './parseComponentRecursive';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @param {string|null} [ obj.runtimeId ]
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseComponents = async ({ element, runtimeId = null }) => {
    incrementParserCounter();

    await parseComponentsRecursive({
        element,
        runtimeId,
    });
};
