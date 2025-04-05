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
import { getRepeaterChild } from '../action/setRepeatChild';

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
    const elementToRemoveByKey = keyToRemove
        .map((item) => {
            const keyValue = item?.[key];
            return getElementByKeyAndRepeatId({
                keyValue,
                repeatId,
            });
        })
        .filter(Boolean);

    const elementToRemoveByComponent = elementToRemoveByKey.length > 0;

    /**
     * Component inside repeater.
     * Remove at the end old element to avoid viual jump
     */
    elementToRemoveByKey.forEach((element) => {
        const currentId = getIdByElement({ element: element });
        if (!currentId) return;

        /**
         * Then destroy component
         * Destroy all component in repeater item wrapper child of scope component
         * Or destroy single component if there is no wrapper.
         */
        const elementWrapper = getRepeaterInnerWrap({ id: currentId });

        const nestedParent = /** @type {HTMLElement} */ (
            elementWrapper ?? element
        );

        /**
         * First destroy all repeater/invalidate inside
         */
        destroyNestedInvalidate({ id, invalidateParent: nestedParent });
        destroyNestedRepeat({ id, repeatParent: nestedParent });

        if (elementWrapper) {
            destroyComponentInsideNodeById({
                id: getParentIdById(currentId) ?? '',
                container: elementWrapper,
            });

            elementWrapper.remove();
        } else {
            removeAndDestroyById({ id: currentId });
        }
    });

    /**
     * No Component inside repeater.
     * Remove at the end old element to avoid viual jump
     */
    if (!elementToRemoveByComponent) {
        const childrenFromRepeater = getRepeaterChild({ repeatId });
        const itemToRemove = childrenFromRepeater.filter((item) => {
            return keyToRemove
                .map((item) => item?.[key])
                .includes(item.value?.[key]);
        });

        itemToRemove.forEach((item) => {
            const { element: currentElement } = item;

            /**
             * First destroy all repeater/invalidate inside
             */
            destroyNestedInvalidate({ id, invalidateParent: currentElement });
            destroyNestedRepeat({ id, repeatParent: currentElement });

            /**
             * Destroy inner component child.
             */
            destroyComponentInsideNodeById({
                id,
                container: currentElement,
            });
        });
    }

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
    ).map(({ keyValue, isNewElement, index }) => {
        if (isNewElement)
            return { keyValue, isNewElement, index, wrapper: undefined };

        /**
         * Get persistent element.
         * Use find function to get first occurrence.
         * If use a wrapper use first wrapper occurrence that contain other component
         * If we don't use a wrapper we have only one component.
         */
        const element = getElementByKeyAndRepeatId({
            keyValue,
            repeatId,
        });

        const id = element ? getIdByElement({ element }) : undefined;

        /**
         * useComponent:
         * If persistent Element use a wrapper save it ( or undefined ).
         * Than this element will added to DOM instead component.
         *
         * do not useComponent
         * Get item by key && keyValue from repeater map.
         * Use wrapper filed to save persistent item/element.
         */
        const wrapperParsed = element
            ? getRepeaterInnerWrap({ id })
            : (() => {
                  const childrenFromRepeater = getRepeaterChild({ repeatId });
                  return childrenFromRepeater.find(
                      (item) => item.value?.[key] === keyValue
                  )?.element;
              })();

        return {
            keyValue,
            isNewElement,
            index,
            persistentElement: element,
            persistentDOMwrapper: wrapperParsed,
        };
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
    newSequenceByKey.forEach(
        ({
            isNewElement,
            keyValue,
            index,
            persistentElement,
            persistentDOMwrapper,
        }) => {
            if (!isNewElement) {
                /**
                 * If there is no wrapper when cut and paster component
                 * we loose debug information.
                 * Update debug information.
                 */
                const { debug } = getDefaultComponent();
                if (
                    debug &&
                    !persistentDOMwrapper &&
                    elementToRemoveByComponent
                ) {
                    const componentName =
                        getComponentNameByElement(persistentElement);

                    repeaterParentElement.insertAdjacentHTML(
                        'beforeend',
                        `<!-- ${componentName} --> `
                    );
                }

                /**
                 * Wrapper
                 */
                if (persistentDOMwrapper) {
                    repeaterParentElement.append(persistentDOMwrapper);
                }

                /**
                 * No wrapper
                 */
                if (!persistentDOMwrapper && persistentElement) {
                    repeaterParentElement.append(persistentElement);
                }

                /**
                 * if is not a new element return.
                 */
                return;
            }

            const currentValue = currentUnique?.[index];

            const currentRender = useSync
                ? updateRepeaterWithtKeyUseSync({
                      id,
                      currentValue,
                      index,
                      state,
                      repeatId,
                      key,
                      keyValue,
                      render,
                  })
                : updateRepeaterWithtKey({
                      id,
                      currentValue,
                      index,
                      state,
                      repeatId,
                      key,
                      keyValue,
                      render,
                  });

            repeaterParentElement.insertAdjacentHTML(
                'beforeend',
                currentRender
            );
        }
    );

    return currentUnique;
};
