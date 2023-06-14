// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { parseComponents } from '../componentParse';
import { updateChildrenOrder } from '../componentStore/action/children';
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
 * @param {string} obj.key
 * @param {string} obj.id
 * @return {Promise.<Array.<{key: string}>>}
 *
 * @description
 * Update repater list.
 */
export const updateChildren = async ({
    state = '',
    containerList = document.createElement('div'),
    targetComponent = '',
    current = [],
    previous = [],
    getChildren = () => {},
    props = {},
    key = '',
    id,
}) => {
    /**
     * If there isn't new children return;
     * Compare previous and current array.
     */
    if (JSON.stringify(current) === JSON.stringify(previous)) return [];

    /**
     * Check if thereis a key
     */
    const hasKey = listKeyExist({ current, previous, key });

    /**
     * Filter right function
     */
    const fn = hasKey ? addWithKey : addWithoutKey;

    /**
     * Generate unique id to parse only component with this id.
     */
    const runtimeId = getUnivoqueId();

    /**
     * Execue function.
     */
    const currentUnivoque = fn({
        runtimeId,
        state,
        current,
        previous,
        containerList,
        targetComponent,
        getChildren,
        props,
        key,
        id,
    });

    /**
     * Parse new component if there is ( added is executed )
     */
    await parseComponents({
        element: containerList,
        runtimeId,
    });

    updateChildrenOrder({
        id,
        component: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
