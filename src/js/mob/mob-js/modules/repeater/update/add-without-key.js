// @ts-check

import { removeAndDestroyById } from '../../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { getElementById } from '../../../component/action/element';
import { destroyNestedInvalidate } from '../../invalidate/action/destroy-nested-invalidate';
import { destroyNestedRepeat } from '../action/destroy-nested-repeat';
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { chunkIdsByCurrentValue } from '../utils';
import { destroyComponentInsideNodeById } from '../../../component/action/remove-and-destroy/destroy-component-inside-node-by-id';
import {
    updateRepeaterWitoutKey,
    updateRepeaterWithoutKeyUseSync,
} from './utils';
import { getRepeaterNativeDOMChildren } from '../action/set-repeat-native-dom-children';
import { getDefaultComponent } from '../../../component/create-component';
import { setRepeaterPlaceholderCurrentData } from '../action/set-repeat-placeholder-map-current-data';

/**
 * @param {HTMLElement} container - Repeater parent element.
 */
const removeMissedDebugComment = (container) => {
    const lastElementChild = container.lastElementChild;
    if (!lastElementChild) return;

    let node = lastElementChild.nextSibling;

    while (node) {
        const nextNode = node.nextSibling;
        if (node.nodeType === Node.COMMENT_NODE) {
            node.remove();
        }

        node = nextNode;
    }
};

/**
 * Add new children. This method a component with a unique list of the same component
 *
 * @param {object} params
 * @param {string} params.state - Observed state.
 * @param {Record<string, any>[]} params.current - Current state array
 * @param {Record<string, any>[]} params.previous - Current state array
 * @param {HTMLElement} params.repeaterParentElement - The div that contain repeater.
 * @param {import('../type').RepeaterRender} params.render - The render function that return repeater item.
 * @param {string} params.id - Component id where repeater is contained.
 * @param {string} params.repeatId - Id of repeater
 * @param {boolean} params.useSync - If true dataset is add manually by user.
 * @param {string[]} params.currentChildren - Previous childre id inside repeater.
 * @returns {any[]}
 */
export const addWithoutKey = ({
    state = '',
    current = [],
    previous = [],
    repeaterParentElement = document.createElement('div'),
    render,
    repeatId,
    id,
    useSync,
    currentChildren,
}) => {
    /**
     * Update current data value in repeatPlaceholderMap before create proxi.
     */
    setRepeaterPlaceholderCurrentData({
        repeatId,
        currentData: current,
    });

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
        const currentRender = useSync
            ? updateRepeaterWithoutKeyUseSync({
                  diff,
                  previousLenght,
                  current,
                  state,
                  repeatId,
                  render,
              })
            : updateRepeaterWitoutKey({
                  diff,
                  current,
                  previousLenght,
                  render,
                  state,
                  repeatId,
              });

        if (useSync) {
            repeaterParentElement.insertAdjacentHTML(
                'beforeend',
                /** @type {string} */ (currentRender)
            );
        }

        if (!useSync) {
            /** @type {Element[]} */ (currentRender).forEach((element) => {
                repeaterParentElement.append(element);
            });
        }
    }

    /**
     * Remove
     */

    if (diff < 0) {
        /**
         * For singling component inside same repeater item. Group all childrn by wrapper ( or undefined if there is no
         * wrapper ) So destroy all right element by index
         */
        const childrenComponentChunkedByWrapper = chunkIdsByCurrentValue({
            children: currentChildren,
        });

        /**
         * Element to remove
         */
        const componentToRemoveByKey = childrenComponentChunkedByWrapper.filter(
            (_child, i) => {
                return i >= current.length;
            }
        );

        /**
         * Destroy component.
         */
        componentToRemoveByKey.forEach((childArray) => {
            childArray.forEach((childId) => {
                const element = getElementById({ id: childId });

                /**
                 * Then destroy component Destroy all component in repeater item wrapper child of scope component Or
                 * destroy single component if there is no wrapper.
                 */
                const elementWrapper = getRepeaterInnerWrap({
                    id: childId,
                });

                const nestedParent = /** @type {HTMLElement} */ (
                    elementWrapper ?? element
                );

                /**
                 * First destroy all repeater/invalidate inside
                 */
                destroyNestedInvalidate({ id, invalidateParent: nestedParent });
                destroyNestedRepeat({ id, repeatParent: nestedParent });
                removeAndDestroyById({ id: childId });

                if (elementWrapper) elementWrapper.remove();
            });
        });

        const { debug } = getDefaultComponent();
        if (debug) removeMissedDebugComment(repeaterParentElement);

        /**
         * Fall back for repeater without component inside. If there is no component in repeater fallback to element in
         * repeater map.
         */
        if (childrenComponentChunkedByWrapper.length > 0) return current;

        const childrenFromRepeater = getRepeaterNativeDOMChildren({ repeatId });
        if (!childrenFromRepeater) return current;

        const childrenFromRepeaterToRemove = childrenFromRepeater.filter(
            ({ index }) => {
                return index >= current.length;
            }
        );

        childrenFromRepeaterToRemove.forEach((item) => {
            const { element: currentElement } = item;

            /**
             * First destroy all repeater/invalidate inside TODO: should be removed if there is no component ?
             */
            destroyNestedInvalidate({ id, invalidateParent: currentElement });
            destroyNestedRepeat({ id, repeatParent: currentElement });

            /**
             * Destroy inner component child. item with no component but with repeater/invalidate inside. TODO:
             * Matrioska se secondoLevel non ha componenti dovrebbe andare in maniera ricorsiva nei figli di id. Lo
             * stesso in with-key.
             */
            destroyComponentInsideNodeById({
                id,
                container: currentElement,
            });

            currentElement.remove();
        });
    }

    return current;
};
