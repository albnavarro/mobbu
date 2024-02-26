// @ts-check

import { mobCore } from '../../mobCore';
import { setRepeaterStateById } from '../componentStore/action/currentRepeatValue';
import { getElementById } from '../componentStore/action/element';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { incrementTickQueuque } from '../componentStore/tick';
import { QUEQUE_TYPE_REPEATER } from '../constant';
import { querySecificRepeater } from '../query/querySecificRepeater';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../temporaryData/repeaterActions';
import { getRepeaterComponentTarget } from '../temporaryData/repeaterTargetComponent';
import { updateChildren } from './updateChildren';
import { getChildrenInsideElement } from './utils';

/**
 * @param {import('../temporaryData/repeater/type').watchListType} param
 * @return {() => void}
 */
export const watchList = ({
    state = '',
    setState = () => {},
    emit = () => {},
    watch = () => {},
    clean = false,
    beforeUpdate = () => {},
    afterUpdate = () => {},
    getChildren = () => {},
    key = '',
    id = '',
    repeaterParentElement,
    repeatId = '',
    render,
}) => {
    /**
     * Remove repeater placeholder
     */
    const repeaterEl = querySecificRepeater(repeaterParentElement, repeatId);
    repeaterEl?.remove();
    // @ts-ignore
    repeaterEl?.removeCustomComponent();

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
    watch(
        state,
        async (/** @type {Array} */ current, /** @type {Array} */ previous) => {
            if (!mobCore.checkType(Array, current)) return;

            /**
             * Add watcher to active queuqe operation.
             */
            const descrementQueue = incrementTickQueuque({
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
                setState(state, previous, false);

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
                return;
            }

            /**
             * If clean is active remove previous children.
             */
            const targetComponentBeforeParse = getRepeaterComponentTarget({
                id: repeatId,
            });

            if (targetComponentBeforeParse && (clean || forceRepeater)) {
                const currentChildern = getChildrenInsideElement({
                    component: targetComponentBeforeParse,
                    getChildren,
                    element: repeaterParentElement,
                });

                currentChildern.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                /**
                 * Web component trick.
                 * Sure to delete host element.
                 */
                repeaterParentElement.textContent = '';
            }

            /**
             * Set current active repeater in mainStore.
             */
            addActiveRepeat({ id, state, container: repeaterParentElement });

            /**
             * Execute beforeUpdate function
             */
            if (mainComponent) {
                beforeUpdate({
                    element: mainComponent,
                    container: repeaterParentElement,
                    childrenId: getChildrenInsideElement({
                        component: targetComponentBeforeParse,
                        getChildren,
                        element: repeaterParentElement,
                    }),
                });
            }

            /**
             * Start main update list function
             */
            const currentUnivoque = await updateChildren({
                state,
                repeaterParentElement,
                targetComponent: targetComponentBeforeParse,
                current,
                previous: clean || forceRepeater ? [] : previous,
                getChildren,
                key,
                id,
                render,
                repeatId,
            });

            /**
             * Now reset previous only with clean props.
             */
            forceRepeater = false;

            const targetComponentAfterParse = getRepeaterComponentTarget({
                id: repeatId,
            });

            /**
             * Filter children inside repeaterParentElement
             */
            const childrenFiltered = getChildrenInsideElement({
                component: targetComponentAfterParse,
                getChildren,
                element: repeaterParentElement,
            });

            /**
             * Update children current value ( for "immutable" children ).
             * - repeater without key: item persistence.
             * - repeater with key: item moved.
             * Update storeComponent currentRepeaterState
             * propierties so bindPros get last current/index value when watch.
             */
            [...childrenFiltered].forEach((id, index) => {
                const current = currentUnivoque?.[index];
                if (!current) return;

                /**
                 * Store current value in store
                 * to use in dynamicrops
                 */
                setRepeaterStateById({ id, value: { current, index } });
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
                        container: repeaterParentElement,
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
                    container: repeaterParentElement,
                });

                unFreezePropById({ id, prop: state });

                /**
                 * Update watch state.
                 * If key is used duplicated item is removed.
                 */
                setState(state, currentUnivoque, false);

                /**
                 * Remove watcher to active queuqe operation.
                 */
                descrementQueue();
            });
        }
    );

    return () => emit(state);
};
