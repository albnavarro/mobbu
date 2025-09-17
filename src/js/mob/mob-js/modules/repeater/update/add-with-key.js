// @ts-check

import {
    getItemToRemoveByKey,
    getUnivoqueByKey,
    mixPreviousAndCurrentData,
} from '../utils';
import { getElementsByKeyAndRepeatId } from '../../../component/action/element';
import { removeAndDestroyById } from '../../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { destroyNestedInvalidate } from '../../invalidate/action/destroy-nested-invalidate';
import { destroyNestedRepeat } from '../action/destroy-nested-repeat';
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { destroyComponentInsideNodeById } from '../../../component/action/remove-and-destroy/destroy-component-inside-node-by-id';
import { updateRepeaterWithtKey, updateRepeaterWithtKeyUseSync } from './utils';
import { getRepeaterNativeDOMChildren } from '../action/set-repeat-native-dom-children';
import { getComponentNameByElement } from '../../../component/action/component';
import { getDefaultComponent } from '../../../component/create-component';
import { setRepeaterInstancesCurrentData } from '../action/set-repeat-instances-map-current-data';

/**
 * @param {object} params
 * @param {HTMLElement} params.container
 * @param {HTMLElement} params.element
 */
const addDebugToComponent = ({ element, container }) => {
    const componentName = getComponentNameByElement(element);
    container.insertAdjacentHTML('beforeend', `<!-- ${componentName} --> `);
};

/**
 * Add new children by key.
 *
 * @param {object} params
 * @param {string} params.state - Observed state.
 * @param {Record<string, any>[]} params.current - Current state array
 * @param {Record<string, any>[]} params.previous - Current state array
 * @param {HTMLElement} params.repeaterParentElement - The div that contain repeater.
 * @param {string} params.key - Define id repeater use a key
 * @param {string} params.id - Component id where repeater is contained.
 * @param {import('../type').RepeaterRender} params.render - The render function that return repeater item.
 * @param {string} params.repeatId - Id of repeater
 * @param {boolean} params.useSync - If true dataset is add manually by user.
 * @returns {any[]}
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
     * Get unique data array by key
     */
    const currentUnique = getUnivoqueByKey({ data: current, key });

    /**
     * Update current data value in repeatPlaceholderMap before create proxi.
     */
    setRepeaterInstancesCurrentData({
        repeatId,
        currentData: currentUnique,
    });

    /**
     * # REMOVE
     */

    /**
     * Extract from current item to remove comparer key.
     */
    const currentItemToRemoveByKey = getItemToRemoveByKey(
        previous,
        currentUnique,
        key
    );

    /**
     * Get first element to remove/delete by key ( currentItemToRemoveByKey ). Then if element is single child remove
     * it. If there is more element inside a wrapper remove all component inside wrapper SO we need only first
     * occurrence.
     *
     * TODO ( maybe ). return all component ( find to filter ). Then in forEach above destroy single component without
     * use `destroyComponentInsideNodeById`, cycle item and destroy component, the result should be a multidimensional
     * array.
     */
    const componentsToRemoveByKey = currentItemToRemoveByKey
        .map((item) => {
            const keyValue = item?.[key];
            return getElementsByKeyAndRepeatId({
                keyValue,
                repeatId,
            });
        })
        .filter((item) => item.length > 0);

    /**
     * Create a boolean value to check if there is some component to remove.
     */
    const shouldRemoveComponent = componentsToRemoveByKey.length > 0;

    /**
     * Remove component.
     */
    componentsToRemoveByKey.forEach((item) => {
        const firstOccurrence = item[0].element;
        const firstCurrentId = item[0].id;
        if (!firstCurrentId) return;

        /**
         * Then destroy component Destroy all component in repeater item wrapper child of scope component Or destroy
         * single component if there is no wrapper.
         */
        const elementWrapper = getRepeaterInnerWrap({ id: firstCurrentId });

        const nestedParent = /** @type {HTMLElement} */ (
            elementWrapper ?? firstOccurrence
        );

        /**
         * First destroy all repeater/invalidate inside
         */
        destroyNestedInvalidate({ id, invalidateParent: nestedParent });
        destroyNestedRepeat({ id, repeatParent: nestedParent });

        item.forEach(({ id }) => {
            removeAndDestroyById({ id });
        });

        if (elementWrapper) {
            elementWrapper.remove();
        }
    });

    /**
     * No Component inside repeater. Remove at the end old element to avoid viual jump
     */
    if (!shouldRemoveComponent) {
        const childrenFromRepeater = getRepeaterNativeDOMChildren({ repeatId });
        const itemToRemove = childrenFromRepeater.filter((item) => {
            return currentItemToRemoveByKey
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
     * ## NEW DATA
     *
     * Get set of data with the right sequence of new list element mark old and new element with isNewElement props.
     */
    const newSequenceByKey = mixPreviousAndCurrentData(
        currentUnique,
        previous,
        key
    ).map(({ keyValue, isNewElement, index }) => {
        if (isNewElement)
            return { keyValue, isNewElement, index, wrapper: undefined };

        /**
         * Get persistent element. Use find function to get first occurrence. If use a wrapper use first wrapper
         * occurrence that contain other component If we don't use a wrapper we have only one component.
         */
        const element = getElementsByKeyAndRepeatId({
            keyValue,
            repeatId,
        });

        /**
         * UseComponent: If persistent Element use a wrapper save it ( or undefined ). Than this element will added to
         * DOM instead component.
         *
         * Do not useComponent Get item by key && keyValue from repeater map. Use wrapper filed to save persistent
         * item/element.
         */
        const wrapperParsed = element[0]?.element
            ? getRepeaterInnerWrap({ id: element[0]?.id ?? '' })
            : (() => {
                  const childrenFromRepeater = getRepeaterNativeDOMChildren({
                      repeatId,
                  });
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
     * ## RESET
     *
     * Reset parent Element
     */
    // repeaterParentElement.textContent = '';
    repeaterParentElement.replaceChildren();

    /**
     * ## NEW DOM
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
                const { debug } = getDefaultComponent();

                /**
                 * Wrapper
                 */
                if (persistentDOMwrapper) {
                    repeaterParentElement.append(persistentDOMwrapper);
                }

                /**
                 * No wrapper If there is no wrapper assuming we have only one component child
                 */
                if (!persistentDOMwrapper && persistentElement?.[0]?.element) {
                    repeaterParentElement.append(persistentElement[0].element);

                    if (debug) {
                        addDebugToComponent({
                            element: persistentElement[0]?.element,
                            container: repeaterParentElement,
                        });
                    }
                }

                /**
                 * If is not a new element return.
                 */
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
                      keyValue,
                      render,
                  })
                : updateRepeaterWithtKey({
                      currentValue,
                      index,
                      state,
                      repeatId,
                      key,
                      keyValue,
                      render,
                  });

            if (useSync) {
                repeaterParentElement.insertAdjacentHTML(
                    'beforeend',
                    /** @type {string} */ (currentRender)
                );
            }

            if (!useSync && currentRender) {
                repeaterParentElement.append(
                    /** @type {Element} */ (currentRender)
                );
            }
        }
    );

    return currentUnique;
};
