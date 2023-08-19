// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
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
 * @param {string} obj.key
 * @param {string} obj.id
 * @return {Promise.<Array.<Object>>}
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
    dynamicProps = undefined,
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
     * Get unique array of data ( current compared with previous )
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
        dynamicProps,
        key,
        id,
    });

    /**
     * Parse inner component.
     * Use pub/sub to avoid circular dependencies.
     * Parse current HTMLDom to create inner component.
     * Scan and await the end of possible noew component creation.
     */
    mainStore.set(
        'parseComponentEvent',
        { element: containerList, runtimeId },
        false
    );
    await mainStore.emitAsync('parseComponentEvent');

    updateChildrenOrder({
        id,
        component: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
