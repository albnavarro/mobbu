// @ts-check

import { mobCore } from '../../mobCore';
import { gerOrderedChildrenById } from '../componentStore/action/children';
import {
    getComponentIdByRepeatercontext,
    setRepeaterStateById,
} from '../componentStore/action/currentRepeatValue';
import { getEachParent } from '../componentStore/action/each';
import { getElementById } from '../componentStore/action/element';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { incrementTickQueuque } from '../componentStore/tick';
import { incrementRepeaterTickQueuque } from '../componentStore/tickRepeater';
import { QUEQUE_TYPE_REPEATER } from '../constant';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../temporaryData/repeaterActions';
import { getRepeaterComponentTarget } from '../temporaryData/repeaterTargetComponent';
import { updateChildren } from './updateChildren';
import { getChildrenInsideElementByRepeaterId } from './utils';

/**
 * @param {any} param
 * @return {() => void}
 */
export const watchEach = ({
    state = '',
    setState,
    emit,
    watch,
    clean = false,
    beforeUpdate = () => {},
    afterUpdate = () => {},
    key = '',
    id = '',
    eachId = '',
    render,
}) => {
    const mainComponent = getElementById({ id });

    /**
     * First run use an empty previous array
     * To run first emit from definition store.
     */
    let forceRepeater = true;

    /**
     * Watcher is destroyed with the component tahu implement list repeater.
     * repater works if data is an array ( is a list so data must be an array )
     */
    const unsubscribe = watch(
        state,
        async (/** @type {Array} */ current, /** @type {Array} */ previous) => {
            if (!mobCore.checkType(Array, current)) return;

            const eachParentElement = getEachParent({
                id: eachId,
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
                container: eachParentElement,
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
                id: eachId,
            });

            if (targetComponentBeforeParse && (clean || forceRepeater)) {
                const currentChildern = getChildrenInsideElementByRepeaterId({
                    id,
                    repeatId: eachId,
                });

                currentChildern.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                /**
                 * Web component trick.
                 * Sure to delete host element.
                 */
                eachParentElement.textContent = '';
            }

            /**
             * Set current active repeater in mainStore.
             */
            addActiveRepeat({ id, state, container: eachParentElement });

            /**
             * Execute beforeUpdate function
             */
            if (mainComponent) {
                beforeUpdate({
                    element: mainComponent,
                    container: eachParentElement,
                    childrenId: getChildrenInsideElementByRepeaterId({
                        id,
                        repeatId: eachId,
                    }),
                });
            }

            /**
             * Start main update list function
             */
            const currentUnivoque = await updateChildren({
                state,
                repeaterParentElement: eachParentElement,
                targetComponent: targetComponentBeforeParse,
                current,
                previous: clean || forceRepeater ? [] : previous,
                key,
                id,
                render,
                repeatId: eachId,
            });

            /**
             * Now reset previous only with clean props.
             */
            forceRepeater = false;

            /**
             * Filter children inside repeaterParentElement
             */

            const childrenFiltered = getChildrenInsideElementByRepeaterId({
                id,
                repeatId: eachId,
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
                        container: eachParentElement,
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
                    container: eachParentElement,
                });

                unFreezePropById({ id, prop: state });

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
                descrementRepeaterQueue();
            });
        }
    );

    emit(state);

    return unsubscribe;
};