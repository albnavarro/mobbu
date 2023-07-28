// @ts-check

import { checkType } from '../../mobbu/store/storeType';
import { setStateById } from '../componentStore/action/state';
import {
    addActiveRepeat,
    getActiveRepeater,
    removeActiveRepeat,
} from '../mainStore/actions/repeatActions';
import { parseRuntime } from '../parseComponent/parseRuntime';
import { updateChildren } from './updateChildren';
import { getChildrenInsideElement } from './utils';

/**
 * @param {Object} obj
 * @param { function({container:HTMLElement, childrenId:Array.<String>}):void } obj.afterUpdate
 * @param { function({container:HTMLElement, childrenId:Array.<String>}):void } obj.beforeUpdate
 * @param { function } obj.getChildren
 * @param { string } obj.id
 * @param { string } obj.key
 * @param { object } obj.props
 * @param { string } obj.state
 * @param { string } obj.targetComponent
 * @param { function } obj.updateState
 * @param { function } obj.watch
 * @param { HTMLElement } obj.containerList
 */
export const watchList = ({
    state = '',
    watch = () => {},
    containerList = document.createElement('div'),
    props = {},
    updateState = () => {},
    beforeUpdate = () => {},
    afterUpdate = () => {},
    targetComponent = '',
    getChildren = () => {},
    key = '',
    id = '',
}) => {
    /**
     * Watcher is destroyed with the component tahu implement list repeater.
     * repater works if data is an array ( is a list so data must be an array )
     */
    watch(
        state,
        async (/** @type {Array} */ current, /** @type {Array} */ previous) => {
            if (!checkType(Array, current)) return;

            /**
             * Check if the same repeat is running
             * Id true, skip and revert the new state to previous without fire watch
             * So the data is consistent with dom
             *
             * TODO May be if the state will revert to previous, other watches will be misaligned
             * But it is extreme situation with asyncronous component.
             * use beforeUpdate and afterUpdate to inhibit stet change during updateList
             * But! this watcher is the first watcher instance , created before onMount.
             * So maybe the other watcher take the righr ( previous ) value
             * To check.
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
                setStateById(id, state, previous, false);
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
                previous,
                getChildren,
                key,
                props,
                id,
            });

            /**
             * Filter children inside containerList
             */
            const childrenFiltered = getChildrenInsideElement({
                component: targetComponent,
                getChildren,
                element: containerList,
            });

            /**
             * Update children state.
             */
            [...childrenFiltered].forEach((id, index) => {
                const current = currentUnivoque?.[index];
                if (!current) return;

                updateState({
                    current: currentUnivoque?.[index],
                    setChildState: (
                        /** @type{any} */ prop,
                        /** @type{any} */ val
                    ) => setStateById(id, prop, val),
                    index,
                });
            });

            /**
             * Fire onComplete next tick;
             */
            setTimeout(async () => {
                /**
                 * Remove active repeater
                 */
                removeActiveRepeat({ id, state, container: containerList });

                /**
                 * Check inner component until there is (recursive).
                 */
                await parseRuntime({ container: containerList });

                /**
                 * Execute afterUpdate function
                 */
                afterUpdate({
                    container: containerList,
                    childrenId: childrenFiltered,
                });
            });
        }
    );
};
