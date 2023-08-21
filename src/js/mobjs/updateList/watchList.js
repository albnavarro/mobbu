// @ts-check

import { checkType } from '../../mobbu/store/storeType';
import { setCurrentById } from '../componentStore/action/current';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { setStateById } from '../componentStore/action/state';
import { ATTR_REPEATID } from '../constant';
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
 * @param { object } obj.dynamicProps
 * @param { string } obj.state
 * @param { string } obj.targetComponent
 * @param { function } obj.watch
 * @param { HTMLElement } obj.containerList
 * @param { String } obj.repeatId
 */
export const watchList = ({
    state = '',
    watch = () => {},
    containerList = document.createElement('div'),
    props = {},
    dynamicProps = undefined,
    beforeUpdate = () => {},
    afterUpdate = () => {},
    targetComponent = '',
    getChildren = () => {},
    key = '',
    id = '',
    repeatId = '',
}) => {
    /**
     * Remove repeater placeholder
     */
    const repeaterEl = containerList.querySelector(
        `[${ATTR_REPEATID}='${repeatId}']`
    );
    repeaterEl?.remove();

    /**
     * Watcher is destroyed with the component tahu implement list repeater.
     * repater works if data is an array ( is a list so data must be an array )
     */
    watch(
        state,
        async (/** @type {Array} */ current, /** @type {Array} */ previous) => {
            if (!checkType(Array, current)) return;

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
                dynamicProps,
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

                /**
                 * Store current value in store
                 * to use in dynamicProps
                 */
                setCurrentById({ id, value: { current, index } });

                const newState = props({
                    current: currentUnivoque?.[index],
                    index,
                });

                // TODO check id newsState is an object
                // anche in pros ?
                Object.entries(newState).forEach(([key, value]) => {
                    setStateById(id, key, value);
                });
            });

            /**
             * Fire onComplete next tick;
             */
            setTimeout(async () => {
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
            });
        }
    );
};
