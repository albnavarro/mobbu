// @ts-check

import { mobCore } from '../../../../mobCore';
import { gerOrderedChildrenById } from '../../../component/action/children';
import {
    getComponentIdByRepeatercontext,
    setRepeaterStateById,
} from '../../../component/action/repeater';
import { getRepeatParent, inizializeNestedRepeat } from '..';
import {
    getElementById,
    getIdsByByRepeatId,
} from '../../../component/action/element';
import {
    freezePropById,
    unFreezePropById,
} from '../../../component/action/freeze';
import { removeAndDestroyById } from '../../../component/action/removeAndDestroy';
import { incrementTickQueuque } from '../../../queque/tick';
import { incrementRepeaterTickQueuque } from '../../../queque/tickRepeater';
import { QUEQUE_TYPE_REPEATER } from '../../../constant';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../activeRepeater';
import { getRepeaterComponentTarget } from '../targetcomponent';
import { updateRepeater } from '../update';
import { inizializeNestedInvalidate } from '../../invalidate';
import { getFallBackParentByElement } from '../../../component/action/parent';

/**
 * @param {import('../type').watchListType} param
 * @return {() => void}
 */
export const watchRepeat = ({
    state = '',
    setState,
    // emit,
    watch,
    clean = false,
    beforeUpdate,
    afterUpdate,
    key = '',
    id = '',
    repeatId = '',
    render,
}) => {
    const mainComponent = getElementById({ id });

    /**
     * Use if first render from repeat params is removed.
     * - forceRepeater = true
     * - emit at the end
     *
     * First run use an empty previous array
     * To run first emit from definition store.
     */
    let forceRepeater = false;

    /**
     * When repater is created nested Main component is not parsed.
     * So addSelfIdToParentComponent doesn't work.
     * Get first element that contains repaterParent start from last map element.
     */
    const fallBackParentId = getFallBackParentByElement({
        element: getRepeatParent({ id: repeatId }),
    });

    /**
     * Watcher is destroyed with the component tahu implement list repeater.
     * repater works if data is an array ( is a list so data must be an array )
     */
    const unsubscribe = watch(
        state,
        async (/** @type {Array} */ current, /** @type {Array} */ previous) => {
            if (!mobCore.checkType(Array, current)) return;

            const repeatParentElement = getRepeatParent({
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
                container: repeatParentElement,
            });

            if (repeatIsRunning) {
                /**
                 * If repater is running:
                 * back to previous state without fire callback
                 */
                unFreezePropById({ id, prop: state });
                setState(state, previous, false);

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
                descrementRepeaterQueue();
                return;
            }

            /**
             * If clean is active remove previous children.
             */
            const targetComponentBeforeParse = getRepeaterComponentTarget({
                id: repeatId,
            });

            const childrenBeforeUdate = getIdsByByRepeatId({
                id,
                repeatId,
            });

            /**
             * Execute beforeUpdate function first time ( no await )
             */
            if (mainComponent && !forceRepeater) {
                beforeUpdate({
                    element: mainComponent,
                    container: repeatParentElement,
                    childrenId: childrenBeforeUdate,
                });
            }

            /**
             * Execute beforeUpdate function on update ( use await )
             */
            if (mainComponent && !forceRepeater) {
                await beforeUpdate({
                    element: mainComponent,
                    container: repeatParentElement,
                    childrenId: getIdsByByRepeatId({
                        id,
                        repeatId,
                    }),
                });
            }

            /**
             * If clean of first time remove DOM from repeater container.
             */
            if (targetComponentBeforeParse && (clean || forceRepeater)) {
                const currentChildern = getIdsByByRepeatId({
                    id,
                    repeatId,
                });

                currentChildern.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                /**
                 * Web component trick.
                 * Sure to delete host element.
                 */
                repeatParentElement.textContent = '';
            }

            /**
             * Set current active repeater in mainStore.
             */
            addActiveRepeat({ id, state, container: repeatParentElement });

            /**
             * Start main update list function
             */
            const currentUnivoque = await updateRepeater({
                state,
                repeaterParentElement: repeatParentElement,
                targetComponent: targetComponentBeforeParse,
                current,
                previous: clean || forceRepeater ? [] : previous,
                key,
                id,
                fallBackParentId,
                render,
                repeatId,
            });

            /**
             * Now reset previous only with clean props.
             */
            forceRepeater = false;

            /**
             * Filter children inside repeaterParentElement
             */

            const childrenFiltered = getIdsByByRepeatId({
                id,
                repeatId,
            });

            /**
             * Order children by DOM position.
             */
            const childrenFilteredSorted = [
                ...gerOrderedChildrenById({ children: childrenFiltered }),
            ];

            const hasKey = key && key !== '';

            /**
             * Update children current value ( for "immutable" children ).
             * - repeater without key: item persistence.
             * - repeater with key: item moved.
             * Update storeComponent currentRepeaterState
             * propierties so bindPros get last current/index value when watch.
             */
            childrenFilteredSorted.forEach((id, index) => {
                const currentValue = currentUnivoque?.[index];
                if (!currentValue) return;

                // const realIndex = hasKey
                //     ? current.indexOf(currentValue)
                //     : index;

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

                /**
                 * Get id of children of FirstRepeaterChild
                 */
                const firstRepeaterchildChildren =
                    getComponentIdByRepeatercontext({
                        contextId: id,
                    });

                /**
                 * Store current value in store
                 * to use in dynamicrops
                 * ( child if FirstRepeaterChild )
                 */
                firstRepeaterchildChildren.forEach((childId) => {
                    setRepeaterStateById({
                        id: childId,
                        value: {
                            current: currentValue,
                            index: realIndex,
                        },
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
                    afterUpdate({
                        element: mainComponent,
                        container: repeatParentElement,
                        childrenId: childrenFiltered,
                    });
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
                    container: repeatParentElement,
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
                 * Initialize repeater/invalidate in same scope
                 * Nesessary because main component is not parsed here
                 * Get new children
                 * Initialize repeater/invalidate inside each new component.
                 */
                const newChildren = childrenFiltered.filter(
                    (x) => !childrenBeforeUdate.includes(x)
                );

                newChildren.forEach((id) => {
                    const element = getElementById({ id });

                    inizializeNestedInvalidate({
                        invalidateParent: element,
                    });

                    inizializeNestedRepeat({ repeatParent: element });
                });
            });
        }
    );

    // emit(state);

    return unsubscribe;
};
