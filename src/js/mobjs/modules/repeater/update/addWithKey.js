// @ts-check

import {
    getNewElement,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from '../utils';
import {
    getElementByKeyAndRepeatId,
    getIdByElement,
} from '../../../component/action/element';
import { removeAndDestroyById } from '../../../component/action/removeAndDestroy/removeAndDestroyById';
import { destroyNestedInvalidate } from '../../invalidate/action/destroyNestedInvalidate';
import { destroyNestedRepeat } from '../action/destroyNestedRepeat';
import { getDefaultComponent } from '../../../component/createComponent';
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { getParentIdById } from '../../../component/action/parent';
import { destroyComponentInsideNodeById } from '../../../component/action/removeAndDestroy/destroyComponentInsideNodeById';
import { getComponentNameByElement } from '../../../component/action/component';
import { updateRepeaterWithtKey, updateRepeaterWithtKeyUseSync } from './utils';

/**
 * @param {object} obj
 * @param {string} obj.state
 * @param {Record<string, any>[]} obj.current
 * @param {Record<string, any>[]} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {string} obj.key
 * @param {string} obj.id
 * @param {import('../type').RepeaterRender} obj.render
 * @param {string} obj.repeatId
 * @param {boolean} obj.useSync
 * @return {Array<any>}
 *
 * @description
 * Add new children by key.
 */
export const addWithKey = ({
    state = '',
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    key = '',
    id = '',
    render,
    repeatId,
    useSync,
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
     * Remove at the end old element to avoid viual jump
     */
    elementToRemoveByKey.forEach((element) => {
        const currentId = getIdByElement({ element: element });
        if (!currentId) return;

        /**
         * First destroy all repeater/invalidate inside
         */
        destroyNestedInvalidate({ id, invalidateParent: element });
        destroyNestedRepeat({ id, repeatParent: element });

        /**
         * Then destroy component
         * Destroy all component in repeater item wrapper child of scope component
         * Or destroy single component if there is no wrapper.
         */
        const elementWrapper = getRepeaterInnerWrap({ id: currentId });

        if (elementWrapper) {
            destroyComponentInsideNodeById({
                id: getParentIdById(currentId),
                container: elementWrapper,
            });

            elementWrapper.remove();
        } else {
            removeAndDestroyById({ id: currentId });
        }
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
    ).map(({ key, isNewElement, index }) => {
        if (isNewElement)
            return { key, isNewElement, index, wrapper: undefined };

        /**
         * Get persistent element.
         * Use find function to get first occurrence.
         * If use a wrapper use first wrapper occurrence that contain other component
         * If we don't use a wrapper we have only one component.
         */
        const element = getElementByKeyAndRepeatId({
            key,
            repeatId,
        });

        /**
         * If persistent Element use a wrapper save it.
         * Than this element will added to DOM instead component.
         */
        const id = getIdByElement({ element });
        const wrapper = getRepeaterInnerWrap({ id });

        return { key, isNewElement, index, wrapper };
    });

    /**
     * -------------------
     *  RESET
     * ------------------
     *
     * Reset parent Element
     */
    // repeaterParentElement.textContent = '';
    repeaterParentElement.replaceChildren();

    /**
     * -------------------
     *  NEW DOM
     * ------------------
     *
     * Add persistent element or new element to parse.
     */
    newSequenceByKey.forEach(({ isNewElement, key, index, wrapper }) => {
        if (!isNewElement) {
            const persistentElement = getElementByKeyAndRepeatId({
                key,
                repeatId,
            });

            if (!persistentElement) return;

            /**
             * If there is no wrapper when cut and paster component
             * we loose debug information.
             * Update debug information.
             */
            const { debug } = getDefaultComponent();
            if (debug && !wrapper) {
                const componentName =
                    getComponentNameByElement(persistentElement);

                repeaterParentElement.insertAdjacentHTML(
                    'beforeend',
                    `<!-- ${componentName} --> `
                );
            }

            if (wrapper) {
                /**
                 * Wrapper
                 */
                repeaterParentElement.append(wrapper);
            } else {
                /**
                 * No wrapper
                 */
                repeaterParentElement.append(persistentElement);
            }

            return;
        }

        const currentValue = currentUnique?.[index];

        const currentRender = useSync
            ? updateRepeaterWithtKeyUseSync({
                  currentValue,
                  index,
                  state,
                  repeatId,
                  key,
                  render,
              })
            : updateRepeaterWithtKey({
                  currentValue,
                  index,
                  state,
                  repeatId,
                  key,
                  render,
              });

        repeaterParentElement.insertAdjacentHTML('beforeend', currentRender);
    });

    return currentUnique;
};
