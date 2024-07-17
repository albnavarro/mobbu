// @ts-check

import { updateChildrenOrder } from '../componentStore/action/children';
import { MAIN_STORE_ASYNC_PARSER } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { addWithKey } from './addWithKey';
import { addWithoutKey } from './addWithoutKey';
import { listKeyExist } from './utils';

/**
 * @param {object} obj
 * @param {string} obj.state
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {(arg0: string)=> string[]} obj.getChildren
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {Function} obj.render
 * @return {Promise.<Array.<object>>}
 *
 * @description
 * Update repater list.
 */
export const updateChildren = async ({
    state = '',
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
    current = [],
    previous = [],
    getChildren,
    key = '',
    id,
    render,
    repeatId,
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
     * Execute function.
     * Get unique array of data ( current compared with previous )
     */
    const currentUnivoque = fn({
        state,
        current,
        previous,
        repeaterParentElement,
        targetComponent,
        getChildren,
        key,
        id,
        render,
        repeatId,
    });

    /**
     * Parse inner component.
     * Use pub/sub to avoid circular dependencies.
     * Parse current HTMLDom to create inner component.
     * Scan and await the end of possible noew component creation.
     */
    mainStore.set(
        MAIN_STORE_ASYNC_PARSER,
        { element: repeaterParentElement, parentId: id },
        false
    );
    await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);

    updateChildrenOrder({
        id,
        componentName: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
