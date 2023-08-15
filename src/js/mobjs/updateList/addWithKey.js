// @ts-check

import {
    getChildrenInsideElement,
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from './utils';
import { IS_RUNTIME } from '../constant';
import { bindProps, staticProps } from '../mainStore/actions/props';
import {
    getElementById,
    getElementByKeyInContainer,
} from '../componentStore/action/element';
import { setStateById } from '../componentStore/action/state';
import { updateChildrenOrder } from '../componentStore/action/children';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * @param {Object} obj
 * @param {string} obj.targetComponent
 * @param {string} obj.key
 * @param {string} obj.runtimeId
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
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
    currentUnique,
    index,
}) {
    const currentProps = staticProps(
        props({ current: currentUnique?.[index], index })
    );

    const currentDynamicProps = bindProps(dynamicProps);

    return /* HTML */ `
        <component
            data-staticprops=${currentProps}
            data-bindprops=${currentDynamicProps}
            ${IS_RUNTIME}="${runtimeId}"
            data-component="${targetComponent}"
            data-key="${key}"
        >
        </component>
    `;
}

/**
 * @param {Object} obj
 * @param {string} obj.state
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {function} obj.getChildren
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {string} obj.runtimeId
 * @return {Array}
 *
 * @description
 * Add new children by key.
 */
export const addWithKey = ({
    state = '',
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = '',
    getChildren = () => {},
    key = '',
    props = {},
    dynamicProps = {},
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

    /*
     * Update main component state with an array of unique item.
     * addWithKey means we have an array of unique key, no duplicates.
     */
    setStateById(id, state, () => currentUnique, false);

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
        if (parent && item) parent.appendChild(item);
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
            return !current.isNewElement
                ? [...previous, [current]]
                : (() => {
                      previous[previous.length - 1].push(current);
                      return previous;
                  })();
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
