// @ts-check

import { updateChildrenOrder } from '../componentStore/action/children';
import { MAIN_STORE_REPEATER_PARSER_ROOT } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { addWithKey } from './addWithKey';
import { addWithoutKey } from './addWithoutKey';
import { listKeyExist } from './utils';

/**
 * @param {Object} obj
 * @param {String} obj.state
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {function} obj.getChildren
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {Function} obj.render
 * @return {Promise.<Array.<Object>>}
 *
 * @description
 * Update repater list.
 */
export const updateChildren = async ({
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
    current = [],
    previous = [],
    getChildren = () => {},
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
        MAIN_STORE_REPEATER_PARSER_ROOT,
        repeaterParentElement,
        false
    );
    await mainStore.emitAsync(MAIN_STORE_REPEATER_PARSER_ROOT);

    updateChildrenOrder({
        id,
        component: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
