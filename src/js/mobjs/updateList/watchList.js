// @ts-checc

import { mobCore } from '../../mobCore';
import { setCurrentListValueById } from '../componentStore/action/currentListValue';
import { getElementById } from '../componentStore/action/element';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { querySecificRepeater } from '../query/querySecificRepeater';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../temporaryData/repeaterActions';
import { updateChildren } from './updateChildren';
import { getChildrenInsideElement } from './utils';

/**
 * @typedef {Object} watchListType
 * @property { HTMLElement } containerList
 * @property { String } repeatId
 */

/**
 * @param {import('../temporaryData/repeater/add').repeaterType & watchListType}
 * @return {() => Function}
 */
export const watchList = ({
    state = '',
    setState = () => {},
    emit = () => {},
    watch = () => {},
    props = {},
    bindEvents = [],
    clean = false,
    dynamicProps,
    beforeUpdate = () => {},
    afterUpdate = () => {},
    targetComponent = '',
    getChildren = () => {},
    key = '',
    id = '',
    containerList,
    repeatId = '',
    render,
}) => {
    /**
     * Remove repeater placeholder
     */
    const repeaterEl = querySecificRepeater(containerList, repeatId);
    repeaterEl?.remove();
    repeaterEl?.removeCustomComponent();

    const mainComponent = getElementById({ id });

    /**
     * First run use an empty previus array
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
             * If clean is active remove previous children.
             */
            if (clean || forceRepeater) {
                const currentChildern = getChildrenInsideElement({
                    component: targetComponent,
                    getChildren,
                    element: containerList,
                });

                currentChildern.forEach((id) => {
                    removeAndDestroyById({ id });
                });

                /**
                 * Web component trick.
                 * Sure to delete host element.
                 */
                containerList.textContent = '';
            } else {
                /**
                 * If there isn't new children return;
                 * Compare previous and current array.
                 */
                if (JSON.stringify(current) === JSON.stringify(previous))
                    return;
            }

            /**
             * Secure step 1.
             * Avoid state mutation during list contruction.
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
                container: containerList,
            });

            if (repeatIsRunning) {
                /**
                 * If repater is running:
                 * back to previous state without fire callback
                 */
                setState(state, previous, false);
                return;
            }

            /**
             * Set current active repeater in mainStore.
             */
            addActiveRepeat({ id, state, container: containerList });

            /**
             * Execute beforeUpdate function
             */
            beforeUpdate({
                element: mainComponent,
                container: containerList,
                childrenId: getChildrenInsideElement({
                    component: targetComponent,
                    getChildren,
                    element: containerList,
                }),
            });

            /**
             * Start main update list function
             */
            const currentUnivoque = await updateChildren({
                state,
                containerList,
                targetComponent,
                current,
                previous: clean || forceRepeater ? [] : previous,
                getChildren,
                key,
                props,
                dynamicProps,
                bindEvents,
                id,
                render,
            });

            /**
             * Now reset previous only with clean props.
             */
            forceRepeater = false;

            /**
             * Filter children inside containerList
             */
            const childrenFiltered = getChildrenInsideElement({
                component: targetComponent,
                getChildren,
                element: containerList,
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
                setCurrentListValueById({ id, value: { current, index } });
            });

            /**
             * Fire onComplete next tick;
             */
            setTimeout(async () => {
                /**
                 * Execute afterUpdate function
                 */
                afterUpdate({
                    element: mainComponent,
                    container: containerList,
                    childrenId: childrenFiltered,
                });

                /**
                 * Remove active repeater after all so avoid multiple
                 * fire on the same repeater while running.
                 *
                 * Use 2 frmae after onMount/Fyre dynamic timing.
                 */
                removeActiveRepeat({
                    id,
                    state,
                    container: containerList,
                });

                unFreezePropById({ id, prop: state });

                /**
                 * Update watch state.
                 * If key is used duplicated item is removed.
                 */
                setState(state, currentUnivoque, false);
            });
        }
    );

    return () => emit(state);
};
