// @ts-check

import {
    destroyComponentInsideNodeById,
    removeAndDestroyById,
} from '../../../component/action/removeAndDestroy';
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
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { getParentIdById } from '../../../component/action/parent';
import { chunkIdsByRepeaterWrapper } from '../utils';

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

            const sync =
                /* HTML */ () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
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
         * For singling component inside same repeater item.
         * Group all childrn by wrapper ( or undefined if there is no wrapper )
         * So destroy all right element by index
         */
        const childrenChunkedByWrapper = chunkIdsByRepeaterWrapper({
            children: idsByRepeatId,
        });

        /**
         * element to remove
         */
        const elementToRemoveByKey = childrenChunkedByWrapper.filter(
            (_child, i) => {
                return i >= current.length;
            }
        );

        /**
         * Destroy
         */
        elementToRemoveByKey.forEach((childArray) => {
            childArray.forEach((childId) => {
                const element = getElementById({ id: childId });

                /**
                 * Get element wrapper
                 */
                const elementWrapper = getRepeaterInnerWrap({ id: childId });

                /**
                 * Destroy all component in repeater item wrapper child of scope component
                 * Or destroy single component if there is no wrapper.
                 */
                if (elementWrapper) {
                    destroyComponentInsideNodeById({
                        id: getParentIdById(childId),
                        container: elementWrapper,
                    });

                    elementWrapper.remove();
                } else {
                    removeAndDestroyById({ id: childId });
                }

                destroyNestedInvalidate({ id, invalidateParent: element });
                destroyNestedRepeat({ id, repeatParent: element });
            });
        });
    }

    return current;
};
