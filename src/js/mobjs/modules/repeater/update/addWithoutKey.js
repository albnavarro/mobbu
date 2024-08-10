// @ts-check

import { removeAndDestroyById } from '../../../component/action/removeAndDestroy';
import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_REPEATER_PROP_BIND,
} from '../../../constant';
import {
    getElementById,
    getIdsByByRepeatId,
} from '../../../component/action/element';
import { setComponentRepeaterState } from '../repeaterValue';
import { renderHtml } from '../../../parse/steps/utils';
import { destroyNestedInvalidate } from '../../invalidate';
import { destroyNestedRepeat } from '..';
import { getDefaultComponent } from '../../../component/createComponent';

/**
 * @param {object} obj
 * @param {string} obj.state
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
 * @param {Function} obj.render
 * @param {string} [ obj.key ]
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @return {array}
 *
 * @description
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    state = '',
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
    render,
    repeatId,
    id,
}) => {
    /**
     * @type {number}
     */
    const currentLenght = current.length;

    /**
     * @type {number}
     */
    const previousLenght = previous.length;

    /**
     * @type {number}
     */
    const diff = currentLenght - previousLenght;

    /**
     * Add
     */
    if (diff > 0) {
        /**
         * Create palcehodler component
         */
        const elementToAdd = [...new Array(diff).keys()].map((_item, index) => {
            const currentValue = current?.[index + previousLenght];
            const currentIndex = index + previousLenght;

            const sync = /* HTML */ `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                {
                    current: currentValue,
                    index: currentIndex,
                }
            )}"
            ${ATTR_REPEATER_PROP_BIND}="${state}"
            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

            return render({
                sync,
                index,
                currentValue,
                html: renderHtml,
            });
        });

        /**
         * Content of container list id deleted at start.
         * Assume container is dedicated to children.
         * So add simple, mix to simplest solution and efficence.
         */
        elementToAdd.forEach((element) => {
            repeaterParentElement.insertAdjacentHTML('beforeend', element);
        });
    }

    /**
     * Remove
     */

    if (diff < 0) {
        /**
         * Filter children inside repeaterParentElement
         */
        const idsByRepeatId = getIdsByByRepeatId({
            id,
            repeatId,
        });

        /**
         * element to remove
         */
        const elementToRemoveByKey = idsByRepeatId.filter((_child, i) => {
            return i >= current.length;
        });

        /**
         * Destroy
         */
        elementToRemoveByKey.forEach((childId) => {
            const element = getElementById({ id: childId });

            destroyNestedInvalidate({ id, invalidateParent: element });
            destroyNestedRepeat({ id, repeatParent: element });
            removeAndDestroyById({ id: childId });
        });
    }

    return current;
};
