// @ts-check

import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { ATTR_CHILD_REPEATID, ATTR_CURRENT_LIST_VALUE } from '../constant';
import { getChildrenInsideElement } from './utils';
import { getElementById } from '../componentStore/action/element';
import { setComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { renderHtml } from '../creationStep/utils';

/**
 * @param {object} obj
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
 * @param {(arg0: string)=> string[]} obj.getChildren
 * @param {Function} obj.render
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @return {array}
 *
 * @description
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
    getChildren,
    render,
    repeatId,
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
            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

            return render({
                sync,
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
        const childrenFilteredToRemove = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: repeaterParentElement,
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
        repeaterParentElement.textContent = '';

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
            if (element) repeaterParentElement.append(element);
        });
    }

    return current;
};
