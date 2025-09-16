// @ts-check

import { MAIN_STORE_ASYNC_PARSER } from '../../../main-store/constant';
import {
    mainStore,
    resetMainStoreAsyncParser,
} from '../../../main-store/main-store';
import { addWithKey } from './add-with-key';
import { addWithoutKey } from './add-without-key';
import { listKeyExist } from '../utils';

/**
 * Update repater list.
 *
 * @param {object} params
 * @param {string} params.state - Observed state.
 * @param {boolean} params.persistent - The component inside repeat will not destroyed on page navigation
 * @param {HTMLElement} params.repeaterParentElement - The div that contain repeater.
 * @param {Record<string, any>[]} params.current - Current state array
 * @param {Record<string, any>[]} params.previous - Current state array
 * @param {string} params.key - Define id repeater use a key
 * @param {string} params.id - Component id where repeater is contained.
 * @param {string} params.fallBackParentId - FallBackParentId is used with autoDetectParentId strategy disabled only
 * @param {string} params.repeatId - Id of repeater
 * @param {import('../type').RepeaterRender} params.render - The render function that return repeater item.
 * @param {boolean} params.useSync - If true dataset is add manually by user.
 * @param {string[]} params.currentChildren - Previous childre id inside repeater.
 * @returns {Promise<any[]>} - The array parsed ( if key is used has unique element )
 */
export const updateRepeater = async ({
    state = '',
    persistent,
    repeaterParentElement = document.createElement('div'),
    current = [],
    previous = [],
    key = '',
    id,
    fallBackParentId = '',
    render,
    repeatId,
    useSync,
    currentChildren = [],
}) => {
    /**
     * Check if thereis a key
     */
    const hasKey = listKeyExist({ current, previous, key });

    /**
     * Filter right function
     */
    const fn = hasKey ? addWithKey : addWithoutKey;

    /**
     * Execute function. Get unique array of data ( current compared with previous )
     */
    const currentUnivoque = fn({
        state,
        current,
        previous,
        repeaterParentElement,
        key,
        id,
        render,
        repeatId,
        useSync,
        currentChildren,
    });

    /**
     * Parse inner component. Use pub/sub to avoid circular dependencies. Parse current HTMLDom to create inner
     * component. Scan and await the end of possible noew component creation.
     *
     * - FallBackParentId is used with autoDetectParentId strategy disabled only
     */
    mainStore.set(
        MAIN_STORE_ASYNC_PARSER,
        {
            element: repeaterParentElement,
            parentId: fallBackParentId ?? id,
            persistent,
        },
        { emit: false }
    );
    await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
    resetMainStoreAsyncParser();

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
