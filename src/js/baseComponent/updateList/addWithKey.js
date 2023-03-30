import {
    getElementById,
    getElementByKeyAndParentId,
    removeAndDestroyById,
    setStateById,
    updateChildrenOrder,
} from '../componentStore/action';
import {
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from './utils';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';
import { IS_RUNTIME } from '../utils';
import { createProps } from '../mainStore/actions/props';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * get partial list to add from chunked array of components.
 */
function getPArtialsComponentList({
    targetComponent,
    key,
    runtimeId,
    props,
    currentUnique,
    index,
}) {
    const currentProps = createProps(
        props({ current: currentUnique?.[index], index })
    );

    return `
        <component data-props=${currentProps} ${IS_RUNTIME}="${runtimeId}" data-component="${targetComponent}" data-key="${key}"/>
    `;
}

/**
 * Add new children by key.
 */
export const addWithKey = ({
    state,
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = {},
    getChildren = () => {},
    key = '',
    props = null,
    id,
    runtimeId = '',
} = {}) => {
    const currentUnique = getUnivoqueByKey({ data: current, key });

    /*
     * get univoque current array by key without fire callback.
     */
    setStateById(id, state, () => currentUnique, false);

    /**
     * Get set of data with the right sequence of new list element mixinig old and news.
     */
    const elementToAddObj = mixPreviousAndCurrentData(
        currentUnique,
        previous,
        key
    );

    /**
     * --------------------------
     * REORDER PERSISITE ELEMENT DI POSITION CHANGE
     * --------------------------
     */

    /**
     * Get an array with the new order of previous list element
     * !chouldInser means that the element is not a new element.
     */
    const newPersistentElementOrder = elementToAddObj
        .filter(({ isNewElement }) => !isNewElement)
        .map((item) => {
            return getElementByKeyAndParentId({
                key: item.key,
                parentId: id,
            });
        });

    /**
     * get parte element to reorder.
     */
    const parent = newPersistentElementOrder[0]?.parentNode ?? containerList;

    /**
     * Remove the node and reinser the same in right position
     */
    if (parent) parent.innerHTML = '';
    newPersistentElementOrder.forEach((item) => {
        if (item) parent.appendChild(item);
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
     * Get all children by component type.
     */
    const children = getChildren(targetComponent);

    /**
     * Filter all children contained in containerList.
     */
    const childrenFiltered = [...children].filter((id) => {
        return isDescendant(containerList, getElementById({ id }));
    });

    /**
     * --------------------------
     * ADD NEW LEMENT
     * --------------------------
     */

    /**
     * Chunk the sequentially new element in group.
     * So then insert the block of new element.
     * Every persisten element go in index 0 of chunk
     * This element is used to append new element.
     */
    const chunkedElementToAdd = elementToAddObj.reduce(
        (previous, current) => {
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

    /**
     * The inverse above
     */
    const elementToRemoveObj = getNewElement(previous, currentUnique, key);
    const elementToRemoveByKey = elementToRemoveObj.map((item) => {
        const keyValue = item?.[key];
        return getElementByKeyAndParentId({ key: keyValue, parentId: id });
    });

    chunkedElementToAdd.forEach((item) => {
        const firstEl = item[0];
        const { isNewElement: firstElementIsNew } = firstEl;

        /**
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
            : getElementByKeyAndParentId({
                  key: item[0]?.key,
                  parentId: id,
              });

        /**
         * Filter from chunk the new element and create the new placeholder component
         */
        const componentToAppend = item
            .filter((element) => element.isNewElement)
            .map((element) =>
                getPArtialsComponentList({
                    targetComponent,
                    key: element.key,
                    runtimeId,
                    props,
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
