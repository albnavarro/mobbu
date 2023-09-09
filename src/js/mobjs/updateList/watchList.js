// @ts-checc

import { mobCore } from '../../mobCore';
import { setCurrentListValueById } from '../componentStore/action/currentListValue';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
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
 * @param { Boolean } obj.clean
 * @param { object } obj.dynamicProps
 * @param { string } obj.state
 * @param { Function } obj.setState
 * @param { string } obj.targetComponent
 * @param { function } obj.watch
 * @param { HTMLElement } obj.containerList
 * @param { String } obj.repeatId
 *
 * @return {() => Function}
 */
export const watchList = ({
    state = '',
    setState = () => {},
    emit = () => {},
    watch = () => {},
    containerList = document.createElement('div'),
    props = {},
    clean = false,
    dynamicProps,
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
                id,
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
             * Update children state.
             */
            [...childrenFiltered].forEach((id, index) => {
                const current = currentUnivoque?.[index];
                if (!current) return;

                /**
                 * Store current value in store
                 * to use in dynamicrops
                 */
                setCurrentListValueById({ id, value: { current, index } });

                const newState = props({ current, index });

                if (newState)
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
