// @ts-check

import { mobCore } from '../../../../mobCore';
import { getOrderedChunkByCurrentRepeatValue } from '../../../component/action/children';
import { setRepeaterStateById } from '../../../component/action/repeater';
import {
    getElementById,
    getIdsByByRepeatId,
} from '../../../component/action/element';
import {
    freezePropById,
    unFreezePropById,
} from '../../../component/action/freeze';
import { removeAndDestroyById } from '../../../component/action/removeAndDestroy/removeAndDestroyById';
import { incrementTickQueuque } from '../../../queque/tick';
import { incrementRepeaterTickQueuque } from '../../../queque/tickRepeater';
import { QUEQUE_TYPE_REPEATER } from '../../../constant';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../activeRepeater';
import { updateRepeater } from '../update';
import { inizializeNestedInvalidate } from '../../invalidate/action/inizializeNestedInvalidate';
import { getFallBackParentByElement } from '../../../component/action/parent';
import { chunkIdsByCurrentValue } from '../utils';
import { getRepeatParent } from '../action/getRepeaterParent';
import { inizializeNestedRepeat } from '../action/inizializeNestedRepeat';
import { setRepeaterChild } from '../action/setRepeatChild';

/**
 * @param {import('../type').watchListType} param
 * @return {() => void}
 */
export const watchRepeat = ({
    state = '',
    setState,
    persistent,
    watch,
    clean = false,
    beforeUpdate,
    afterUpdate,
    key = '',
    id = '',
    repeatId = '',
    render,
    useSync = false,
}) => {
    const mainComponent = getElementById({ id });

    /**
     * When repater is created nested Main component is not parsed.
     * So addSelfIdToParentComponent doesn't work.
     * Get first element that contains repaterParent start from last map element.
     */
    const fallBackParentId = getFallBackParentByElement({
        element: getRepeatParent({ id: repeatId }),
    });

    /**
     * Fire first callback
     * The main parse is ended.
     */
    afterUpdate();

    /**
     * Watcher is destroyed with the component tahu implement list repeater.
     * repater works if data is an array ( is a list so data must be an array )
     */
    const unsubscribe = watch(
        state,
        async (
            /** @type {Array<any>} */ current,
            /** @type {Array<any>} */ previous
        ) => {
            if (!mobCore.checkType(Array, current)) return;

            const repeaterParentElement = getRepeatParent({
                id: repeatId,
            });

            /**
             * Add watcher to active queuqe operation.
             */
            const descrementQueue = incrementTickQueuque({
                state,
                id,
                type: QUEQUE_TYPE_REPEATER,
            });

            const descrementRepeaterQueue = incrementRepeaterTickQueuque({
                state,
                id,
                type: QUEQUE_TYPE_REPEATER,
            });

            /**
             * Secure step 1.
             * Avoid state mutation during list construction.
             * Useful when list component is async.
             */
            freezePropById({ id, prop: state });

            /**
             * Secure step 2 ( if step 1 fail, but i don't think ).
             * Check if the same repeat is running
             * Id true, skip and revert the new state to previous without fire watch
             * So the data is consistent with dom
             *
             */
            const repeatIsRunning = getActiveRepeater({
                id,
                state,
                container: repeaterParentElement,
            });

            if (repeatIsRunning) {
                /**
                 * If repater is running:
                 * back to previous state without fire callback
                 */
                unFreezePropById({ id, prop: state });
                setState(state, previous, { emit: false });

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
                descrementRepeaterQueue();
                return;
            }

            const childrenBeforeUdateByRepeatId = getIdsByByRepeatId({
                id,
                repeatId,
            });

            if (mainComponent) {
                await beforeUpdate();
            }

            /**
             * If clean of first time remove DOM from repeater container.
             */
            if (clean) {
                const currentChildern = getIdsByByRepeatId({
                    id,
                    repeatId,
                });

                currentChildern.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                if (repeaterParentElement) {
                    /**
                     * Web component trick.
                     * Sure to delete host element.
                     */
                    repeaterParentElement.textContent = '';
                }
            }

            /**
             * Set current active repeater in mainStore.
             */
            addActiveRepeat({ id, state, container: repeaterParentElement });

            /**
             * Start main update list function
             */
            const currentUnivoque = await updateRepeater({
                state,
                persistent,
                repeaterParentElement,
                current,
                previous: clean ? [] : previous,
                key,
                id,
                fallBackParentId,
                render,
                repeatId,
                useSync,
            });

            /**
             * Filter children inside repeaterParentElement
             */

            const childrenFilteredByRepeatId = getIdsByByRepeatId({
                id,
                repeatId,
            });

            /**
             * Use key ?
             */
            const hasKey = key && key !== '';

            /**
             * For singling component inside same repeater item.
             * Group all children by wrapper ( or undefined if there is no wrapper )
             * So the index and current value is fine.
             */
            const childrenChunkedByWrapper = chunkIdsByCurrentValue({
                children: childrenFilteredByRepeatId,
                previousChildren: childrenBeforeUdateByRepeatId,
            });

            /**
             * Ik key is used and element change position
             * Order children by DOM position.
             * Withiut key element is rendered in traversal order.
             * Compare first item of chunk
             *
             * If no key is used, children only update it's state.
             * Element are add to componentMap in tree traversal order.
             * So is natuarally ordered.
             *
             * In case is necessary (in case of ?):
             * It is possible use `getOrderedChunkByCurrentRepeatValue` with useIndex
             * The key is undefined here.
             * Only component added has new index, the index is added on creation.
             * So the index of new element here is the right index.
             */
            const chunkChildrenOrdered = hasKey
                ? [
                      ...getOrderedChunkByCurrentRepeatValue({
                          children: childrenChunkedByWrapper,
                          key,
                          current,
                      }),
                  ]
                : childrenChunkedByWrapper;

            // const chunkChildrenOrdered = hasKey
            //     ? [
            //           ...gerOrderedChunkByDOMPosition({
            //               children: childrenChunkedByWrapper,
            //           }),
            //       ]
            //     : childrenChunkedByWrapper;

            /**
             * Update children current value ( for "immutable" children ).
             * - repeater without key: item persistence.
             * - repeater with key: item moved.
             * Update storeComponent currentRepeaterState
             * propierties so bindPros get last current/index value when watch.
             */
            chunkChildrenOrdered.forEach((childArray, index) => {
                childArray.forEach((id) => {
                    const currentValue = currentUnivoque?.[index];
                    if (!currentValue) return;

                    /**
                     * @description
                     * Find real index in original array ( current )
                     */
                    const realIndex = hasKey
                        ? current.findIndex((value) => {
                              return (
                                  `${value?.[key]}` ===
                                  `${currentUnivoque?.[index]?.[key]}`
                              );
                          })
                        : index;

                    /**
                     * Store current value in store
                     * to use in dynamicrops
                     * FrstRepeaterChild
                     */
                    setRepeaterStateById({
                        id,
                        value: { current: currentValue, index: realIndex },
                    });
                });
            });

            /**
             * Fire onComplete next tick;
             */
            mobCore.useNextLoop(async () => {
                /**
                 * Execute afterUpdate function
                 */
                if (mainComponent) {
                    afterUpdate();
                }

                /**
                 * Remove active repeater after all so avoid multiple
                 * fire on the same repeater while running.
                 *
                 * Use 2 frmae after onMount/Fyre dynamic timing.
                 */
                removeActiveRepeat({
                    id,
                    state,
                    container: repeaterParentElement,
                });

                /**
                 * Unfreeze prop onnly when all is quiet
                 *
                 * Prevent overload error.
                 */
                unFreezePropById({ id, prop: state });

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
                descrementRepeaterQueue();

                /**
                 * Initialize nested repeater/invalidate.
                 */
                inizializeNestedInvalidate({
                    invalidateParent: repeaterParentElement,
                    id,
                });

                inizializeNestedRepeat({
                    repeatParent: repeaterParentElement,
                    id,
                });

                /**
                 * If there is no component in repeater update repaaterMapChildren.
                 * This utils is used only when repeat has no component inside.
                 */
                if (chunkChildrenOrdered.length === 0) {
                    setRepeaterChild({ repeatId, id, bind: state });
                }
            });
        }
    );

    return unsubscribe;
};
