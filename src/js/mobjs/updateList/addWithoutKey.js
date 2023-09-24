// @ts-check

import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { ATTR_CURRENT_LIST_VALUE, ATTR_PARENT_ID } from '../constant';
import { getChildrenInsideElement } from './utils';
import { getElementById } from '../componentStore/action/element';
import { setCurrentValueList } from '../temporaryData/currentRepeaterItemValue';
import { renderHtml } from '../creationStep/utils';

/**
 * @param {Object} obj
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {function} obj.getChildren
 * @param {function} obj.render
 * @param {String} obj.id
 * @return {Array}
 *
 * @description
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = '',
    getChildren = () => {},
    render,
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

            const currentValueList = /* HTML */ `${ATTR_CURRENT_LIST_VALUE}="${setCurrentValueList(
                {
                    current: currentValue,
                    index: currentIndex,
                }
            )}"
            ${ATTR_PARENT_ID}="${id}"`;

            return render({
                required: currentValueList,
                html: (
                    /** @type{TemplateStringsArray} */ strings,
                    /** @type{any} */ ...values
                ) => renderHtml(strings, ...values),
            });
        });

        /**
         * Content of container list id deleted at start.
         * Assume container is dedicated to children.
         * So add simple, mix to simplest solution and efficence.
         */
        elementToAdd.forEach((element) => {
            containerList.insertAdjacentHTML('beforeend', element);
        });
    }

    /**
     * Remove
     */

    if (diff < 0) {
        /**
         * Filter children inside containerList
         */
        const childrenFilteredToRemove = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: containerList,
        });

        /**
         * element to remove
         */
        const childrenToRemoveByKey = childrenFilteredToRemove.filter(
            (_child, i) => {
                return i >= current.length;
            }
        );

        /**
         * Persistent element
         */
        const childrenPersistent = childrenFilteredToRemove.filter(
            (_child, i) => {
                return i < current.length;
            }
        );

        /**
         * Remove all dom component
         * Web Component trick p1.
         * Sure to remove host element.
         */
        containerList.textContent = '';

        /**
         * Destroy
         */
        childrenToRemoveByKey.forEach((childId) => {
            removeAndDestroyById({ id: childId });
        });

        /**
         * Re-add persistent element
         * Web component trick p2.
         */
        childrenPersistent.forEach((childId) => {
            const element = getElementById({ id: childId });
            if (element) containerList.append(element);
        });
    }

    return current;
};
