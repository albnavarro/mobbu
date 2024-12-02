// @ts-check

import { MAIN_STORE_ASYNC_PARSER } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { parseComponentsRecursive } from './parseFunction';
import { setParseIsRunning } from './parseIsRunnung';
import { resetCurrentIterationCounter } from './utils';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [ obj.persistent  ]
 * @param {string} [ obj.parentIdForced ]
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseComponents = async ({
    element,
    persistent = false,
    parentIdForced = '',
}) => {
    setParseIsRunning(true);

    await parseComponentsRecursive({
        element,
        persistent,
        parentIdForced,
    });

    resetCurrentIterationCounter();
    setParseIsRunning(false);
};

/**
 * @description
 * Parse component from inner component generated by first parseComponent.
 * Use pub/sub to avoid circular dependencies.
 *
 * @returns {void}
 */
export const initParseWatcher = () => {
    mainStore.watch(
        MAIN_STORE_ASYNC_PARSER,
        async ({ element, parentId, persistent = false }) => {
            await parseComponents({
                element,
                parentIdForced: parentId ?? '',
                persistent,
            });
        }
    );
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
