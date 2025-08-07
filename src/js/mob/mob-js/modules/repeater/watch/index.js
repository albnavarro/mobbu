// @ts-check

import { MobCore } from '../../../../mob-core';
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
import { removeAndDestroyById } from '../../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { incrementTickQueuque } from '../../../queque/tick';
import { incrementRepeaterTickQueuque } from '../../../queque/tick-repeater';
import { QUEQUE_TYPE_REPEATER } from '../../../constant';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../active-repeater';
import { updateRepeater } from '../update';
import { inizializeNestedInvalidate } from '../../invalidate/action/inizialize-nested-invalidate';
import { getParentIdFromWeakElementMap } from '../../../component/action/parent';
import { chunkIdsByCurrentValue } from '../utils';
import { getRepeatParent } from '../action/get-repeater-parent';
import { inizializeNestedRepeat } from '../action/inizialize-nested-repeat';
import { setRepeaterNativeDOMChildren } from '../action/set-repeat-native-dom-children';

/**
 * @param {import('../type').WatchList} param
 * @returns {() => void}
 */
export const watchRepeat = ({
    state = '',
    setState,
    persistent = false,
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
     * When repater is created nested Main component is not parsed. So addSelfIdToParentComponent doesn't work. Get
     * first element that contains repaterParent start from last map element.
     */
    const parentByElement = getRepeatParent({ id: repeatId });
    const fallBackParentId = parentByElement
        ? (getParentIdFromWeakElementMap({ element: parentByElement }) ?? '')
        : '';

    /**
     * Fire first callback The main parse is ended.
     */
    afterUpdate();

    /**
     * Watcher is destroyed with the component tahu implement list repeater. repater works if data is an array ( is a
     * list so data must be an array )
     */
    const unsubscribe = watch(
        state,
        async (/** @type {any[]} */ current, /** @type {any[]} */ previous) => {
            if (!MobCore.checkType(Array, current)) return;

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
             * Secure step 1. Avoid state mutation during list construction. Useful when list component is async.
             */
            freezePropById({ id, prop: state });

            /**
             * Secure step 2 ( if step 1 fail, but i don't think ). Check if the same repeat is running Id true, skip
             * and revert the new state to previous without fire watch So the data is consistent with dom
             */
            const repeatIsRunning = getActiveRepeater({
                id,
                state,
                container: repeaterParentElement,
            });

            if (repeatIsRunning) {
                /**
                 * If repater is running: back to previous state without fire callback
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

            /**
             * Get current component inside repeater.
             */
            const childrenBeforeUdateByRepeatId = getIdsByByRepeatId({
                id,
                repeatId,
            });

            /**
             * Run function before update.
             */
            if (mainComponent) {
                await beforeUpdate();
            }

            /**
             * If clean destroy component inside repeater and clean refuse inside.
             */
            if (clean) {
                childrenBeforeUdateByRepeatId.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                if (repeaterParentElement) {
                    /**
                     * Web component trick. Sure to delete host element.
                     */
                    repeaterParentElement.textContent = '';
                }
            }

            /**
             * Set current active repeater in mainStore.
             */
            if (repeaterParentElement)
                addActiveRepeat({
                    id,
                    state,
                    container: repeaterParentElement,
                });

            /**
             * Run add-with-key or add-without-key.
             */
            const currentUpdated = await updateRepeater({
                state,
                persistent,
                repeaterParentElement:
                    repeaterParentElement ?? document.createElement('div'),
                current,
                previous: clean ? [] : previous,
                key,
                id,
                fallBackParentId,
                render,
                repeatId,
                useSync,
                currentChildren: clean ? [] : childrenBeforeUdateByRepeatId,
            });

            /**
             * Get new children after update.
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
             * After update, group component inside single repeat node in a chunked array.
             *
             * At this time the components are still in no particular order.
             */
            const childrenChunkedByWrapper = chunkIdsByCurrentValue({
                children: childrenFilteredByRepeatId,
                previousChildren: childrenBeforeUdateByRepeatId,
            });

            /**
             * Ik key is used and element change position we have to order childrenChunkedByWrapper by currentUnivoque
             * position. Starting from currentUnivoque, use key to remap currentUnivoque with an array of component with
             * the the specific key.
             *
             * TODO: pass currentUpdated to getOrderedChunkByCurrentRepeatValue(), internally the value is recalculated.
             *
             * If no key is used, component children only update it's state. Element are add to componentMap in tree
             * traversal order. So is natuarally ordered.
             */
            const chunkChildrenOrdered = hasKey
                ? [
                      ...getOrderedChunkByCurrentRepeatValue({
                          children: childrenChunkedByWrapper,
                          key,
                          current,
                          currentUnivoque: currentUpdated,
                      }),
                  ]
                : childrenChunkedByWrapper;

            /**
             * Update persistent component current value.
             */
            chunkChildrenOrdered.forEach((childArray, index) => {
                childArray.forEach((id) => {
                    const currentValue = currentUpdated?.[index];
                    if (!currentValue) return;

                    /**
                     * Find real index in original array ( currentUpdated )
                     */
                    const realIndex = hasKey
                        ? current.findIndex((value) => {
                              return (
                                  `${value?.[key]}` ===
                                  `${currentUpdated?.[index]?.[key]}`
                              );
                          })
                        : index;

                    /**
                     * Store current value in store to use in dynamicrops FrstRepeaterChild
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
            MobCore.useNextLoop(async () => {
                /**
                 * Execute afterUpdate function
                 */
                if (mainComponent) {
                    afterUpdate();
                }

                /**
                 * Remove active repeater after all so avoid multiple fire on the same repeater while running.
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
                 * If there is no component in repeater update repaaterMapChildren. This utils is used only when repeat
                 * has no component inside.
                 */
                if (chunkChildrenOrdered.length === 0) {
                    setRepeaterNativeDOMChildren({
                        repeatId,
                        id,
                        observe: state,
                    });
                }
            });
        }
    );

    return unsubscribe;
};
