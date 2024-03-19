// @ts-check

import {
    getChildrenInsideElement,
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from './utils';
import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_PARENT_ID,
} from '../constant';
import {
    getElementById,
    getElementByKeyInContainer,
    getIdByElement,
} from '../componentStore/action/element';
import { updateChildrenOrder } from '../componentStore/action/children';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { setComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { renderHtml } from '../creationStep/utils';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * @param {object} obj
 * @param {string} obj.targetComponent
 * @param {string} obj.key
 * @param {string} obj.repeatId
 * @param {array} obj.currentUnique
 * @param {number} obj.index
 * @param {Function} obj.render
 * @param {string} obj.id
 *
 * @return {string}
 *
 * @description
 * Get partial list to add from chunked array of components.
 */
function getPartialsComponentList({
    key,
    currentUnique,
    index,
    render,
    id,
    repeatId,
}) {
    /**
     * Execute prop function.
     * Get current value and save in component store item.
     */
    const currentValue = currentUnique?.[index];

    const sync = /* HTML */ ` ${ATTR_KEY}="${key}"
    ${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
        current: currentValue,
        index,
    })}"
    ${ATTR_CHILD_REPEATID}="${repeatId}" ${ATTR_PARENT_ID}="${id}"`;

    return render({
        sync,
        html: (
            /** @type{string[]} */ strings,
            /** @type{string[]} */ ...values
        ) => renderHtml(strings, ...values),
    });
}

/**
 * @param {object} obj
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
 * @param {Function} obj.getChildren
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {Function} obj.render
 * @param {string} obj.repeatId
 * @return {array}
 *
 * @description
 * Add new children by key.
 */
export const addWithKey = ({
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
    getChildren = () => {},
    key = '',
    id = '',
    render,
    repeatId,
}) => {
    /**
     * @description
     * Get unique data array by key
     */
    const currentUnique = getUnivoqueByKey({ data: current, key });

    /**
     * Get element to delete before element is removed from dom in reorder list step.
     */
    const elementToRemoveObj = getNewElement(previous, currentUnique, key);
    const elementToRemoveByKey = elementToRemoveObj.map((item) => {
        const keyValue = item?.[key];
        return getElementByKeyInContainer({
            key: keyValue,
            parentId: id,
            container: repeaterParentElement,
        });
    });

    /**
     * Get set of data with the right sequence of new list element
     * mark old and new element with isNewElement props.
     */
    const elementToAddObj = mixPreviousAndCurrentData(
        currentUnique,
        previous,
        key
    );

    /**
     * --------------------------
     * REORDER PERSISTENT ELEMENT DI POSITION CHANGE
     * --------------------------
     */

    /**
     * Get an array with only old element that is not deleted
     */
    const newPersistentElementOrder = elementToAddObj
        .filter(({ isNewElement }) => !isNewElement)
        .map((item) => {
            return getElementByKeyInContainer({
                key: item.key,
                parentId: id,
                container: repeaterParentElement,
            });
        });

    /**
     * @type {HTMLElement|undefined}
     *
     * @description
     * get parent element to reorder.
     */
    // @ts-ignore
    const parent =
        newPersistentElementOrder[0]?.parentNode ?? repeaterParentElement;

    /**
     * Remove the node and reinsert the old pers element in right position.
     */
    if (parent) parent.innerHTML = '';
    newPersistentElementOrder.forEach((/** {HTMLElement} */ item) => {
        if (parent && item) parent.append(item);
    });

    /**
     * --------------------------
     * GET CHILD IN DOM IN RIGHT ORDER
     * --------------------------
     */

    /**
     * Now update the element order in store.
     */
    updateChildrenOrder({
        id,
        componentName: targetComponent,
        filterBy: newPersistentElementOrder,
    });

    /**
     * Filter children inside repeaterParentElement
     */
    const childrenFiltered = getChildrenInsideElement({
        component: targetComponent,
        getChildren,
        element: repeaterParentElement,
    });

    /**
     * --------------------------
     * ADD NEW LEMENT
     * --------------------------
     */

    /**
     * @type {Array.<Array.<{isNewElement: boolean, key:string, index:number}>>}
     *
     * @description
     * Chunk the sequentially new element in group.
     * So then insert the block of new element.
     * Every persistent element go in index 0 of chunk
     * This element is used to append new element.
     */
    const chunkedElementToAdd = elementToAddObj.reduce(
        (/** @type {Array} */ previous, current) => {
            return current.isNewElement
                ? (() => {
                      previous.at(-1).push(current);
                      return previous;
                  })()
                : [...previous, [current]];
        },
        [[]]
    );

    /**
     * Remove first empty array if nothig changed at begging of data.
     */
    if (!chunkedElementToAdd?.[0].length) chunkedElementToAdd.shift();

    chunkedElementToAdd.forEach((item) => {
        const firstEl = item[0];
        const { isNewElement: firstElementIsNew } = firstEl;

        /**
         * @description
         * 1 - If the first element of the list is new append before
         * the first existing element
         *
         * 2 -Otherwise append to element at index 0 of current chank
         * this element is persistent.
         */
        const previousOrNextExistingElement = firstElementIsNew
            ? getElementById({
                  id: childrenFiltered[0],
              })
            : getElementByKeyInContainer({
                  key: item[0]?.key,
                  parentId: id,
                  container: repeaterParentElement,
              });

        /**
         * Filter from chunk the new element and create the new placeholder component
         */
        const componentToAppend = item
            .filter((element) => element.isNewElement)
            .map((element) =>
                getPartialsComponentList({
                    targetComponent,
                    key: element.key,
                    currentUnique,
                    index: element.index,
                    render,
                    id,
                    repeatId,
                })
            )
            .join('');

        /**
         * Check if append new component before or after componentToAppend.
         */
        const position = firstElementIsNew ? BEFORE : AFTER;

        /**
         * If the new data is not empty go normal
         * Otherwise append children to parent listCOntainer.
         */
        if (previousOrNextExistingElement) {
            previousOrNextExistingElement.insertAdjacentHTML(
                position,
                componentToAppend
            );
        } else {
            repeaterParentElement.insertAdjacentHTML(
                'afterbegin',
                componentToAppend
            );
        }
    });

    /**
     * --------------------------
     * REMOVE ELEMENT
     * --------------------------
     */
    elementToRemoveByKey.forEach((component) => {
        const id = getIdByElement({ element: component });
        if (!id) return;

        removeAndDestroyById({ id });
    });

    return currentUnique;
};
