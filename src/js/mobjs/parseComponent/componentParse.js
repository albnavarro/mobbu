// @ts-check

import { awaitNextLoop } from '../componentStore/utils';
import { MAIN_STORE_ASYNC_PARSER } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { incrementParserCounter } from '../temporaryData/parser/parser';
import {
    clearUserPlaceHolder,
    reorderUserPlaceholder,
} from '../webComponent/usePlaceHolderToRender';
import { parseComponentsRecursive } from './parseComponentRecursive';
import { useQuery } from './useQuery';
import { resetCurrentIterationCounter } from './utils';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [ obj.isCancellable ]
 * @param {string} [ obj.parentIdForced ]
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseComponents = async ({
    element,
    isCancellable = true,
    parentIdForced = '',
}) => {
    /**
     * Await one loop so avery component is in useMap.
     */
    await awaitNextLoop();

    incrementParserCounter();
    if (!useQuery) reorderUserPlaceholder();

    await parseComponentsRecursive({
        element,
        isCancellable,
        parentIdForced,
    });

    resetCurrentIterationCounter();
    if (!useQuery) clearUserPlaceHolder();
};

/**
 * @description
 * Parse component from inner component generated by first parseComponent.
 * Use pub/sub to avoid circular dependencies.
 *
 * @returns {void}
 */
export const initParseWatcher = () => {
    mainStore.watch(MAIN_STORE_ASYNC_PARSER, async ({ element, parentId }) => {
        await parseComponents({
            element,
            parentIdForced: parentId ?? '',
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
