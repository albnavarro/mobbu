// @ts-check

import { updateChildrenOrder } from '../componentStore/action/children';
import { mainStore } from '../mainStore/mainStore';
import { addWithKey } from './addWithKey';
import { addWithoutKey } from './addWithoutKey';
import { listKeyExist } from './utils';

/**
 * @param {Object} obj
 * @param {String} obj.state
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {function} obj.getChildren
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {Array|Object} obj.bindEvents
 * @param {string} obj.key
 * @param {string} obj.id
 * @return {Promise.<Array.<Object>>}
 *
 * @description
 * Update repater list.
 */
export const updateChildren = async ({
    containerList = document.createElement('div'),
    targetComponent = '',
    current = [],
    previous = [],
    getChildren = () => {},
    props = {},
    dynamicProps,
    bindEvents,
    key = '',
    id,
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
     * Execue function.
     * Get unique array of data ( current compared with previous )
     */
    const currentUnivoque = fn({
        current,
        previous,
        containerList,
        targetComponent,
        getChildren,
        props,
        dynamicProps,
        bindEvents,
        key,
        id,
    });

    /**
     * Parse inner component.
     * Use pub/sub to avoid circular dependencies.
     * Parse current HTMLDom to create inner component.
     * Scan and await the end of possible noew component creation.
     */
    mainStore.set('repeaterParserRoot', containerList, false);
    await mainStore.emitAsync('repeaterParserRoot');

    updateChildrenOrder({
        id,
        component: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
