// @ts-check

import {
    getChildrenInsideElement,
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from './utils';
import {
    ATTR_BIND_EVENTS,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_IS_RUNTIME,
    ATTR_KEY,
    ATTR_PROPS,
    ATTR_WILL_COMPONENT,
} from '../constant';
import { setBindProps, setStaticProps } from '../mainStore/actions/props';
import {
    getElementById,
    getElementByKeyInContainer,
} from '../componentStore/action/element';
import { updateChildrenOrder } from '../componentStore/action/children';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { setCurrentValueList } from '../mainStore/actions/currentListValue';
import { setBindEvents } from '../mainStore/actions/bindEvents';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * @param {Object} obj
 * @param {string} obj.targetComponent
 * @param {string} obj.key
 * @param {string} obj.runtimeId
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {object} obj.bindEvents
 * @param {Array} obj.currentUnique
 * @param {number} obj.index
 *
 * @return {String}
 *
 * @description
 * Get partial list to add from chunked array of components.
 */
function getPartialsComponentList({
    targetComponent,
    key,
    runtimeId,
    props,
    dynamicProps,
    bindEvents,
    currentUnique,
    index,
}) {
    /**
     * Execute prop function.
     * Get current value and save in component store item.
     */
    const currentValue = currentUnique?.[index];
    const currentProps = setStaticProps(
        props({ current: currentValue, index })
    );

    /**
     * Gat and save dynamicProps.
     */
    const currentDynamicProps = dynamicProps
        ? `${ATTR_DYNAMIC}=${setBindProps(dynamicProps)}`
        : '';

    /**
     * Gat and save bindEvents.
     */
    const currentBindEvents = dynamicProps
        ? `${ATTR_BIND_EVENTS}=${setBindEvents(bindEvents)}`
        : '';

    return /* HTML */ `
        <component
            ${ATTR_PROPS}=${currentProps}
            ${currentDynamicProps}
            ${currentBindEvents}
            ${ATTR_IS_RUNTIME}="${runtimeId}"
            ${ATTR_WILL_COMPONENT}="${targetComponent}"
            ${ATTR_KEY}="${key}"
            ${ATTR_CURRENT_LIST_VALUE}="${setCurrentValueList({
                current: currentValue,
                index,
            })}"
        >
        </component>
    `;
}

/**
 * @param {Object} obj
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {function} obj.getChildren
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {Array|object} obj.bindEvents
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {string} obj.runtimeId
 * @return {Array}
 *
 * @description
 * Add new children by key.
 */
export const addWithKey = ({
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = '',
    getChildren = () => {},
    key = '',
    props = {},
    dynamicProps,
    bindEvents,
    id = '',
    runtimeId = '',
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
            container: containerList,
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
                container: containerList,
            });
        });

    /**
     * @type {HTMLElement|undefined}
     *
     * @description
     * get parent element to reorder.
     */
    // @ts-ignore
    const parent = newPersistentElementOrder[0]?.parentNode ?? containerList;

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
        component: targetComponent,
    });

    /**
     * Filter children inside containerList
     */
    const childrenFiltered = getChildrenInsideElement({
        component: targetComponent,
        getChildren,
        element: containerList,
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
     * Every persisten element go in index 0 of chunk
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
         * 1 - If the first element of the lsit is new append before
         * the first existing element
         *
         * 2 -Otherwise appen to element at index 0 of current chank
         * this element is persistent.
         */
        const previousOrNextExistingElement = firstElementIsNew
            ? getElementById({
                  id: childrenFiltered[0],
              })
            : getElementByKeyInContainer({
                  key: item[0]?.key,
                  parentId: id,
                  container: containerList,
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
                    runtimeId,
                    props,
                    dynamicProps,
                    bindEvents,
                    currentUnique,
                    index: element.index,
                })
            )
            .join('');

        /**
         * Check if append new component before or after componentToAppend.
         */
        const position = firstElementIsNew ? BEFORE : AFTER;

        /**
         * If the new data is not empty go normale
         * Otherwise append children to parent listCOntainer.
         */
        if (previousOrNextExistingElement) {
            previousOrNextExistingElement.insertAdjacentHTML(
                position,
                componentToAppend
            );
        } else {
            containerList.insertAdjacentHTML('afterbegin', componentToAppend);
        }
    });

    /**
     * --------------------------
     * REMOVE ELEMENT
     * --------------------------
     */
    elementToRemoveByKey.forEach((component) => {
        const id = component?.id;
        if (!id) return;

        removeAndDestroyById({ id });
    });

    return currentUnique;
};
