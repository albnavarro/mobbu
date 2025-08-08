import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { getRepeaterStateById } from '../../component/action/repeater';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch } from '../../component/action/props';
import { setStateById } from '../../component/action/state/set-state-by-id';
import { getStateById } from '../../component/action/state/get-state-by-id';
import { watchById } from '../../component/action/watch';
import { incrementTickQueuque } from '../../queque/tick';
import { componentMap } from '../../component/component-map';
import { QUEQUE_TYPE_BINDPROPS } from '../../constant';
import {
    repeaterQuequeIsEmpty,
    repeaterTick,
} from '../../queque/tick-repeater';
import {
    invalidateQuequeIsEmpty,
    invalidateTick,
} from '../../queque/tick-invalidate';
// import { getElementById } from '../../component/action/element';
// import { removeAndDestroyById } from '../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { bindComponentTobindId, bindPropsMap } from './bind-props-map';
import { detectProp } from '../../utils';

/**
 * Store props and return a unique identifier
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
    const stateToWatch = /** @type {string[] | undefined} */ (data?.observe)
        ? (() => {
              return /** @type{( string|( () => void ) )[]} */ (
                  data.observe
              ).map((item) => {
                  return detectProp(item);
              });
          })()
        : (() => {
              MobDetectBindKey.initializeCurrentDependencies();
              if (MobCore.checkType(Function, data.props)) {
                  data.props({}, {}, 0);
              }
              return MobDetectBindKey.getCurrentDependencies();
          })();

    if (stateToWatch.length === 0) {
        console.warn(`bindProps not valid, no dependencies found`);
        return;
    }

    const dataUpdated = { ...data, observe: stateToWatch };

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
 * @param {string[]} obj.observe
 * @param {(arg0: Record<string, any>, value: Record<string, any>, index: number) => object} obj.props
 * @param {string} obj.currentParentId
 * @param {boolean} obj.fireCallback
 * @returns {void}
 */
const updateBindProp = ({
    componentId,
    observe,
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
    const bindArrayIsValid = observe.every((state) =>
        parentStateKeys.includes(state)
    );

    if (!bindArrayIsValid) {
        console.warn(
            `bind props error: Some prop ${JSON.stringify(observe)} doesn't exist`
        );
    }

    /**
     * Use this to filter parent props that match with nind array Use instead parentState in newProps initialize. It is
     * more useful pass all parent state instead prop definited in bind array
     *
     *     const values = watch
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

    // let newProps;

    /**
     * TODOL should be removed, use only for debug.
     */
    // try {
    //     newProps = props?.(
    //         parentState,
    //         currentRepeaterState.current,
    //         currentRepeaterState?.index
    //     );
    // } catch {
    //     console.log('bindProps error:', componentId);
    //     const element = getElementById({ id: componentId });
    //     if (!element) return;
    //
    //     if (!document.body.contains(element))
    //         removeAndDestroyById({ id: componentId });
    // }

    const newProps = props?.(
        parentState,
        currentRepeaterState.current,
        currentRepeaterState?.index
    );

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

    /**
     * Value is added in setBindProps() function. here we just add componentId
     */
    const value = bindPropsMap.get(propsId);
    if (!value) return;

    bindPropsMap.set(propsId, { ...value, componentId });

    /**
     * Create a link for get propsId from component quickly in applyBindProps, n0 logic.
     */
    bindComponentTobindId.set(componentId, propsId);

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
    // Se inizilizeWatcher delete bindComponentTobindId
    const moduleId = bindComponentTobindId.get(componentId);
    if (!moduleId) return;

    /**
     * Last applyBindProps call delete support map
     */
    if (inizilizeWatcher) bindComponentTobindId.delete(componentId);

    /**
     * Get all dynamic prop by component id.
     */
    const dynamicProps = bindPropsMap.get(moduleId);

    /**
     * If not return.
     */
    if (!dynamicProps) return;

    /**
     * Cycle dynamicProps from component or from slot.
     */
    const { observe, props, parentId } = dynamicProps;

    /**
     * Merge watch state inside a repeater with bind array.
     */
    const observeParsed =
        repeatPropBind &&
        repeatPropBind?.length > 0 &&
        !observe.includes(repeatPropBind)
            ? [...observe, repeatPropBind]
            : [...observe];

    /**
     * Force parent id or get the natually parent id.
     */
    const currentParentId = parentId ?? getParentIdById(componentId);

    /**
     * Normally props is initialized after repeater So on created we doesn't have the props ready Fire setDynamicProp
     * once before repeater tick to add value in store and use it onCreated
     *
     * The values calculated here can refer to the previous state of the store, in the next step after the repeaters
     * have been executed it will be updated with the latest state of the store.
     */
    if (!inizilizeWatcher) {
        updateBindProp({
            componentId,
            observe: observeParsed,
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
            observe: observeParsed,
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
            observe: observeParsed,
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

    const unWatchArray = observeParsed.map((/** @type {string} */ state) => {
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
                    observe: observeParsed,
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
