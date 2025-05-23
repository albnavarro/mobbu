import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { getRepeaterStateById } from '../../component/action/repeater';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch } from '../../component/action/props';
import { setStateById } from '../../component/action/state/set-state-by-id';
import { getStateById } from '../../component/action/state/get-state-by-id';
import { watchById } from '../../component/action/watch';
import { incrementTickQueuque } from '../../queque/tick';
import { componentMap } from '../../component/store';
import { QUEQUE_TYPE_BINDPROPS } from '../../constant';
import {
    repeaterQuequeIsEmpty,
    repeaterTick,
} from '../../queque/tick-repeater';
import {
    invalidateQuequeIsEmpty,
    invalidateTick,
} from '../../queque/tick-invalidate';
import { getElementById } from '../../component/action/element';
import { removeAndDestroyById } from '../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { bindPropsMap } from './bind-props-map';

/**
 * Store props and return a unique identifier
 *
 * @example
 *     ```javascript
 *       <MyComponent
 *           data-bindprops="${bindProps({
 *               bind: ['state1', 'state1'],
 *               props: ({ state1, state2 }) => {
 *                   return {
 *                       childState1: state1,
 *                       childState2: state2,
 *                   };
 *               },
 *           })}"
 *       ></MyComponent>
 *     ```;
 *
 * @type {import('./type').SetBindProps} data
 */
export const setBindProps = (data) => {
    const hasProps = 'props' in data;

    if (!hasProps) {
        console.warn(`bindProps not valid`);
        return;
    }

    /**
     * Get explicit dependencies or get from `proxi.get()`
     */
    const bindDetected =
        data?.bind && MobCore.checkType(Array, data.bind)
            ? data.bind
            : (() => {
                  MobDetectBindKey.initializeCurrentDependencies();
                  // Run props only if is typeOf Function
                  if (MobCore.checkType(Function, data.props)) {
                      data.props({}, {}, 0);
                  }
                  return MobDetectBindKey.getCurrentDependencies();
              })();

    if (bindDetected.length === 0) {
        console.warn(`bindProps not valid, no dependencies found`);
        return;
    }

    const dataUpdated = { ...data, bind: bindDetected };

    /**
     * @type {string}
     */
    const id = MobCore.getUnivoqueId();
    bindPropsMap.set(id, {
        ...dataUpdated,
        componentId: '',
        propsId: id,
    });

    return id;
};

/**
 * Store props and return a unique identifier
 *
 * @param {object} obj
 * @param {string} obj.componentId
 * @param {string[]} obj.bind
 * @param {(arg0: Record<string, any>, value: Record<string, any>, index: number) => object} obj.props
 * @param {string} obj.currentParentId
 * @param {boolean} obj.fireCallback
 * @returns {void}
 */
const updateBindProp = ({
    componentId,
    bind,
    props,
    currentParentId,
    fireCallback,
}) => {
    if (!currentParentId) return;

    /**
     * Check id all bind props exist in parent state.
     */
    const parentState = getStateById(currentParentId);
    if (!parentState) return;

    const parentStateKeys = Object.keys(parentState);
    const bindArrayIsValid = bind.every((state) =>
        parentStateKeys.includes(state)
    );

    if (!bindArrayIsValid) {
        console.warn(
            `bind props error: Some prop ${JSON.stringify(bind)} doesn't exist`
        );
    }

    /**
     * Use this to filter parent props that match with nind array Use instead parentState in newProps initialize. It is
     * more useful pass all parent state instead prop definited in bind array
     *
     *     const values = bind
     *         .map((currentState) => {
     *             return {
     *                 [currentState]: parentState[currentState],
     *             };
     *         })
     *         .reduce((previous, current) => ({ ...previous, ...current }), {});
     */

    /**
     * If element is deleted from list don't update state.
     */
    const componentExist = componentMap.has(componentId);
    if (!componentExist) return;

    const currentRepeaterState = getRepeaterStateById({
        id: componentId,
    });

    let newProps;

    /**
     * TODOL should be removed, use only for debug.
     */
    try {
        newProps = props?.(
            parentState,
            currentRepeaterState.current,
            currentRepeaterState?.index
        );
    } catch {
        console.log('bindProps error:', componentId);
        const element = getElementById({ id: componentId });
        if (!element) return;

        if (!document.body.contains(element))
            removeAndDestroyById({ id: componentId });
    }

    if (!newProps) return;

    Object.entries(newProps).forEach(([key, value]) => {
        setStateById(componentId, key, value, { emit: fireCallback });
    });
};

/**
 * Add componentId to dynamic props stored and initialize them.
 *
 * @param {object} obj
 * @param {string | undefined} obj.propsId
 * @param {string | undefined} [obj.repeatPropBind]
 * @param {string} obj.componentId
 * @returns {void}
 */
export const addCurrentIdToBindProps = ({
    propsId,
    repeatPropBind,
    componentId,
}) => {
    if (!propsId) return;

    for (const [key, value] of bindPropsMap) {
        if (key === propsId) {
            bindPropsMap.set(key, { ...value, componentId });
        }
    }

    applyBindProps({
        componentId,
        repeatPropBind,
        inizilizeWatcher: false,
    });
};

/**
 * If slot is not used remove id reference orphans from store.
 *
 * @param {object} obj
 * @param {string} obj.propsId
 * @returns {void}
 */
export const removeCurrentToBindPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    bindPropsMap.delete(propsId);
};

/**
 * Update component state, if inizilizeWatcher === true add watcher to parent ( or specific component ) state.
 *
 * @param {object} obj
 * @param {string} obj.componentId
 * @param {string | undefined} [obj.repeatPropBind]
 * @param {boolean} obj.inizilizeWatcher
 * @returns {Promise<void>}
 */
export const applyBindProps = async ({
    componentId,
    repeatPropBind,
    inizilizeWatcher,
}) => {
    /**
     * Get dynamic prop by component. Dynamic props can arrive from component || slot.
     */
    const dynamicPropsFilteredArray = [...bindPropsMap.values()].filter(
        (item) => {
            const currentComponentId = item?.componentId;
            return currentComponentId === componentId;
        }
    );

    /**
     * If not return.
     */
    if (!dynamicPropsFilteredArray) return;

    /**
     * Cycle dynamicProps from component or from slot.
     */
    for (const dynamicpropsfiltered of dynamicPropsFilteredArray) {
        const { bind, props, parentId } = dynamicpropsfiltered;

        /**
         * Merge watch state inside a repeater with bind array.
         */
        const bindUpdated =
            repeatPropBind &&
            repeatPropBind?.length > 0 &&
            !bind.includes(repeatPropBind)
                ? [...bind, repeatPropBind]
                : [...bind];

        /**
         * Force parent id or get the natually parent id.
         */
        const currentParentId = parentId ?? getParentIdById(componentId);

        /**
         * Normally props is initialized after repeater So on created we doesn't have the props ready Fire
         * setDynamicProp once before repeater tick to add value in store and use it onCreated
         *
         * The values calculated here can refer to the previous state of the store, in the next step after the repeaters
         * have been executed it will be updated with the latest state of the store.
         */
        if (!inizilizeWatcher) {
            updateBindProp({
                componentId,
                bind: bindUpdated,
                props,
                currentParentId: currentParentId ?? '',
                fireCallback: false,
            });
        }

        /**
         * If repeater is running, update
         */
        if (!inizilizeWatcher && !repeaterQuequeIsEmpty()) {
            /**
             * Initialize props after repater So we have the last value of currentValue && index
             */
            await repeaterTick();

            /**
             * Refresh state after repater created
             */
            updateBindProp({
                componentId,
                bind: bindUpdated,
                props,
                currentParentId: currentParentId ?? '',
                fireCallback: true,
            });
        }

        /**
         * If invalidate is running, update
         */
        if (!inizilizeWatcher && !invalidateQuequeIsEmpty()) {
            /**
             * Initialize props after repater So we have the last value of currentValue && index
             */
            await invalidateTick();

            /**
             * Refresh state after repater created
             */
            updateBindProp({
                componentId,
                bind: bindUpdated,
                props,
                currentParentId: currentParentId ?? '',
                fireCallback: true,
            });
        }

        if (!inizilizeWatcher) return;

        /**
         * Watch props on change
         */
        let watchIsRunning = false;

        const unWatchArray = bindUpdated.map((/** @type {string} */ state) => {
            return watchById(currentParentId, state, async () => {
                /**
                 * Fire bindProps after repeater.
                 */
                await repeaterTick();
                await invalidateTick();

                /**
                 * Wait for all all props is settled.
                 */
                if (watchIsRunning) return;

                /**
                 * Add watcher to active queuqe operation.
                 */
                const decrementQueue = incrementTickQueuque({
                    state,
                    id: componentId,
                    type: QUEQUE_TYPE_BINDPROPS,
                });

                /**
                 * Fire watch only once if multiple props change. Wait the end of current block.
                 */
                watchIsRunning = true;
                MobCore.useNextLoop(() => {
                    updateBindProp({
                        componentId,
                        bind: bindUpdated,
                        props,
                        currentParentId: currentParentId ?? '',
                        fireCallback: true,
                    });

                    watchIsRunning = false;

                    /**
                     * Remove watcher to active queuqe operation.
                     */
                    decrementQueue();
                });
            });
        });

        /**
         * Add unwatch function to store. So we lounch them on destroy.
         */
        setDynamicPropsWatch({
            id: componentId,
            unWatchArray: unWatchArray.filter((item) => item !== undefined),
        });

        /**
         * Remove current dynamic prop from store.
         */
    }

    /**
     * If all watcher ( from component or from slot ) is initialized deleter all reference from store
     */
    if (!inizilizeWatcher) return;

    for (const [key, value] of bindPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            bindPropsMap.delete(key);
        }
    }
};

/**
 * Delete all refs of events. If slot in unused and a propsFromStore is unused remain in store So when active parser
 * counter is equal 0 ( no parser is running ) remove all reference
 *
 * @returns {void}
 */
export const removeOrphansBindProps = () => {
    bindPropsMap.clear();
};
