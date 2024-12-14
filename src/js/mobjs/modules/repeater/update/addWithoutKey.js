// @ts-check

import { removeAndDestroyById } from '../../../component/action/removeAndDestroy/removeAndDestroyById';
import {
    getElementById,
    getIdsByByRepeatId,
} from '../../../component/action/element';
import { destroyNestedInvalidate } from '../../invalidate/action/destroyNestedInvalidate';
import { destroyNestedRepeat } from '../action/destroyNestedRepeat';
import { getRepeaterInnerWrap } from '../../../component/action/repeater';
import { getParentIdById } from '../../../component/action/parent';
import { chunkIdsByCurrentValue } from '../utils';
import { destroyComponentInsideNodeById } from '../../../component/action/removeAndDestroy/destroyComponentInsideNodeById';
import {
    updateRepeaterWitoutKey,
    updateRepeaterWithoutKeyUseSync,
} from './utils';

/**
 * @param {object} obj
 * @param {string} obj.state
 * @param {any[]} obj.current
 * @param {any[]} obj.previous
 * @param {HTMLElement} obj.repeaterParentElement
 * @param {import('../type').RepeaterRender} obj.render
 * @param {string} [ obj.key ]
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {boolean} obj.useSync
 * @return {any[]}
 *
 * @description
 * Add new children.
 * This method a component with a unique list of the same component
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

        repeaterParentElement.insertAdjacentHTML('beforeend', currentRender);
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
         * For singling component inside same repeater item.
         * Group all childrn by wrapper ( or undefined if there is no wrapper )
         * So destroy all right element by index
         */
        const childrenChunkedByWrapper = chunkIdsByCurrentValue({
            children: idsByRepeatId,
        });

        /**
         * element to remove
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
                 * First destroy all repeater/invalidate inside
                 */
                destroyNestedInvalidate({ id, invalidateParent: element });
                destroyNestedRepeat({ id, repeatParent: element });

                /**
                 * Then destroy component
                 * Destroy all component in repeater item wrapper child of scope component
                 * Or destroy single component if there is no wrapper.
                 */
                const elementWrapper = getRepeaterInnerWrap({ id: childId });

                if (elementWrapper) {
                    destroyComponentInsideNodeById({
                        id: getParentIdById(childId),
                        container: elementWrapper,
                    });

                    elementWrapper.remove();
                } else {
                    removeAndDestroyById({ id: childId });
                }
            });
        });
    }

    return current;
};
