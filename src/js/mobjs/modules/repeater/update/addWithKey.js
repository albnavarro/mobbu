// @ts-check

import {
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from '../utils';
import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../../constant';
import {
    getElementByKeyAndRepeatId,
    getIdByElement,
} from '../../../component/action/element';
import { removeAndDestroyById } from '../../../component/action/removeAndDestroy';
import { setComponentRepeaterState } from '../repeaterValue';
import { renderHtml } from '../../../parse/steps/utils';
import { destroyNestedInvalidate } from '../../invalidate';
import { destroyNestedRepeat } from '..';

/**
 * @param {object} obj
 * @param {string} obj.state
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
    state,
    key,
    currentUnique,
    index,
    render,
    repeatId,
}) {
    /**
     * Execute prop function.
     * Get current value and save in component store item.
     */
    const currentValue = currentUnique?.[index];

    const sync = /* HTML */ ` ${ATTR_KEY}="${key}"
    ${ATTR_REPEATER_PROP_BIND}="${state}"
    ${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
        current: currentValue,
        index,
    })}"
    ${ATTR_CHILD_REPEATID}="${repeatId}"`;

    return render({
        sync,
        index,
        currentValue,
        html: renderHtml,
    });
}

/**
 * @param {object} obj
 * @param {string} obj.state
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.targetComponent
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
    state = '',
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    targetComponent = '',
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
     * ------------------
     * REMOVE
     * ------------------
     *
     * Get element to delete from DOM and from componentMap
     */
    const keyToRemove = getNewElement(previous, currentUnique, key);
    const elementToRemoveByKey = keyToRemove.map((item) => {
        const keyValue = item?.[key];
        return getElementByKeyAndRepeatId({
            key: keyValue,
            repeatId,
        });
    });

    /**
     * Remove
     */
    elementToRemoveByKey.forEach((element) => {
        const currentId = getIdByElement({ element: element });
        if (!currentId) return;

        destroyNestedInvalidate({ id, invalidateParent: element });
        destroyNestedRepeat({ id, repeatParent: element });
        removeAndDestroyById({ id: currentId });
    });

    /**
     * -------------------
     *  NEW DATA
     * ------------------
     *
     * Get set of data with the right sequence of new list element
     * mark old and new element with isNewElement props.
     */
    const newSequenceByKey = mixPreviousAndCurrentData(
        currentUnique,
        previous,
        key
    );

    /**
     * -------------------
     *  RESET
     * ------------------
     *
     * Reset parent Element
     */
    repeaterParentElement.innerHTML = '';

    /**
     * -------------------
     *  NEW DOM
     * ------------------
     *
     * Add persistent element or new element to parse.
     */
    newSequenceByKey.forEach(({ isNewElement, key, index }) => {
        if (!isNewElement) {
            const persistentElement = getElementByKeyAndRepeatId({
                key,
                repeatId,
            });

            if (!persistentElement) return;
            repeaterParentElement.append(persistentElement);
            return;
        }

        repeaterParentElement.insertAdjacentHTML(
            'beforeend',
            getPartialsComponentList({
                state,
                targetComponent,
                key,
                currentUnique,
                index,
                render,
                id,
                repeatId,
            })
        );
    });

    return currentUnique;
};
