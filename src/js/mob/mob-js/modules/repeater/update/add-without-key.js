// @ts-check

import { removeAndDestroyById } from '../../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import {
    getElementById,
    getIdsByByRepeatId,
} from '../../../component/action/element';
import { destroyNestedInvalidate } from '../../invalidate/action/destroy-nested-invalidate';
import { destroyNestedRepeat } from '../action/destroy-nested-repeat';
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { getParentIdById } from '../../../component/action/parent';
import { chunkIdsByCurrentValue } from '../utils';
import { destroyComponentInsideNodeById } from '../../../component/action/remove-and-destroy/destroy-component-inside-node-by-id';
import {
    updateRepeaterWitoutKey,
    updateRepeaterWithoutKeyUseSync,
} from './utils';
import { getRepeaterChild } from '../action/set-repeat-child';

/**
 * Add new children. This method a component with a unique list of the same component
 *
 * @param {object} obj
 * @param {string} obj.state
 * @param {any[]} obj.current
 * @param {any[]} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {import('../type').RepeaterRender} obj.render
 * @param {string} [obj.key]
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {boolean} obj.useSync
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
        const currentRender = useSync
            ? updateRepeaterWithoutKeyUseSync({
                  id,
                  diff,
                  previousLenght,
                  current,
                  state,
                  repeatId,
                  render,
              })
            : updateRepeaterWitoutKey({
                  id,
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
         * Filter children inside repeaterParentElement
         */
        const idsByRepeatId = getIdsByByRepeatId({
            id,
            repeatId,
        });

        /**
         * For singling component inside same repeater item. Group all childrn by wrapper ( or undefined if there is no
         * wrapper ) So destroy all right element by index
         */
        const childrenChunkedByWrapper = chunkIdsByCurrentValue({
            children: idsByRepeatId,
        });

        /**
         * Element to remove
         */
        const elementToRemoveByKey = childrenChunkedByWrapper.filter(
            (_child, i) => {
                return i >= current.length;
            }
        );

        /**
         * Destroy
         */
        elementToRemoveByKey.forEach((childArray) => {
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

                destroyNestedInvalidate({ id, invalidateParent: nestedParent });
                destroyNestedRepeat({ id, repeatParent: nestedParent });

                if (elementWrapper) {
                    /**
                     * First destroy all repeater/invalidate inside
                     */
                    destroyComponentInsideNodeById({
                        id: getParentIdById(childId) ?? '',
                        container: elementWrapper,
                    });

                    elementWrapper.remove();
                } else {
                    removeAndDestroyById({ id: childId });
                }
            });
        });

        /**
         * Fall back for repeater without component inside. If there is no component in repeater fallback to element in
         * repeater map.
         */
        if (childrenChunkedByWrapper.length > 0) return current;

        const childrenFromRepeater = getRepeaterChild({ repeatId });
        if (!childrenFromRepeater) return current;

        const childrenFromRepeaterToRemove = childrenFromRepeater.filter(
            ({ index }) => {
                return index >= current.length;
            }
        );

        childrenFromRepeaterToRemove.forEach((item) => {
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
            currentElement.remove();
        });
    }

    return current;
};
