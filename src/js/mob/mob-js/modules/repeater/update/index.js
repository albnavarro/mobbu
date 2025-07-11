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
 * @param {object} obj
 * @param {string} obj.state
 * @param {boolean} obj.persistent
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {any[]} obj.current
 * @param {any[]} obj.previous
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {string} obj.fallBackParentId
 * @param {string} obj.repeatId
 * @param {import('../type').RepeaterRender} obj.render
 * @param {boolean} obj.useSync
 * @returns {Promise<any[]>}
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
    });

    /**
     * Parse inner component. Use pub/sub to avoid circular dependencies. Parse current HTMLDom to create inner
     * component. Scan and await the end of possible noew component creation.
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
