// @ts-check

import { MobCore } from '../../../mobCore';
import { getRepeaterStateById } from '../../component/action/repeater';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch } from '../../component/action/props';
import { setStateById } from '../../component/action/state/setStateById';
import { getStateById } from '../../component/action/state/getStateById';
import { watchById } from '../../component/action/watch';
import { incrementTickQueuque } from '../../queque/tick';
import { componentMap } from '../../component/store';
import { QUEQUE_TYPE_BINDPROPS } from '../../constant';
import { repeaterQuequeIsEmpty, repeaterTick } from '../../queque/tickRepeater';
import {
    invalidateQuequeIsEmpty,
    invalidateTick,
} from '../../queque/tickInvalidate';
import { getElementById } from '../../component/action/element';
import { removeAndDestroyById } from '../../component/action/removeAndDestroy/removeAndDestroyById';
import { bindPropsMap } from './bindPropsMap';
import {
    getCurrentDependencies,
    initializeCurrentDependencies,
} from '../../../mobCore/store/currentKey';

/**
 * @param {{bind?:string[],parentId:string|undefined,props:(arg0: any,value:Record<string, any>, index: number) => Partial<any>, forceParent? :boolean}} data
 * @return {string|undefined} props id in store.
 *
 * @description
 * Store props and return a unique identifier
 *
 * @example
 * ```javascript
 *   <MyComponent
 *       data-bindprops="${bindProps({
 *           bind: ['state1', 'state1'],
 *           props: ({ state1, state2 }) => {
 *               return {
 *                   childState1: state1,
 *                   childState2: state2
 *               };
 *           },
 *       })}"
 *   ></MyComponent>
 * ```
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
        data?.bind && data?.bind?.length > 0
            ? data.bind
            : (() => {
                  initializeCurrentDependencies();
                  data?.props({}, {}, 0);
                  return getCurrentDependencies();
              })();

    const dataUpdated = { ...data, bind: bindDetected };

    /**
     * @type {string}
     */
    const id = MobCore.getUnivoqueId();
    // @ts-ignore
    bindPropsMap.set(id, {
        ...dataUpdated,
        componentId: '',
        propsId: id,
    });

    return id;
};

/**
 * @param {object} obj
 * @param {string} obj.componentId
 * @param {Array<string>} obj.bind
 * @param {(args0: object, value:Record<string, any>, index: number ) => object} obj.props
 * @param {string} obj.currentParentId
 * @param {boolean} obj.fireCallback
 * @return void
 *
 * @description
 * Store props and return a unique identifier
 *
 */
const setBindProp = ({
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

    /*
     * Use this to filter parent props that match with nind array
     * Use instead parentState in newProps initialize.
     *  It is more useful pass all parent state instead prop definited in bind array
     *
    const values = bind
        .map((currentState) => {
            return {
                [currentState]: parentState[currentState],
            };
        })
        .reduce((previous, current) => ({ ...previous, ...current }), {});
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
 * @param {object} obj
 * @param {string|undefined} obj.propsId
 * @param {string|undefined} [ obj.repeatPropBind ]
 * @param {string} obj.componentId
 * @return void
 *
 * @description
 * Add componentId to dynamic props stored and initialize them.
 *
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
 * @param {object} obj
 * @param {string} obj.propsId
 * @return void
 *
 * @description
 * If slot is not used remove id reference orphans from store.
 *
 */
export const removeCurrentToBindPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    bindPropsMap.delete(propsId);
};

/**
 * @param {object} obj
 * @param {string} obj.componentId
 * @param {string|undefined} [ obj.repeatPropBind ]
 * @param {boolean} obj.inizilizeWatcher
 * @return void
 *
 * @description
 * Update component state, if inizilizeWatcher === true
 * add watcher to parent ( or specific component ) state.
 *
 */
export const applyBindProps = async ({
    componentId,
    repeatPropBind,
    inizilizeWatcher,
}) => {
    /**
     *
     * @description
     * Get dynamic prop by component.
     * Dynamic props can arrive from component || slot.
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
         * Normally props is initialized after repeater
         * So on created we doesn't have the props ready
         * Fire setDynamicProp once before repeater tick to
         * add value in store and use it onCreated
         *
         * The values calculated here can refer to the previous
         * state of the store, in the next step after the repeaters
         * have been executed it will be updated with the latest
         * state of the store.
         */
        if (!inizilizeWatcher) {
            setBindProp({
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
             * Initialize props after repater
             * So we have the last value of currentValue && index
             */
            await repeaterTick();

            /**
             * Refresh state after repater created
             */
            setBindProp({
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
             * Initialize props after repater
             * So we have the last value of currentValue && index
             */
            await invalidateTick();

            /**
             * Refresh state after repater created
             */
            setBindProp({
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

        const unWatchArray = bindUpdated.map((/** @type{string} */ state) => {
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
                 * Fire watch only once if multiple props change.
                 * Wait the end of current block.
                 */
                watchIsRunning = true;
                MobCore.useNextLoop(() => {
                    setBindProp({
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
         * Add unwatch function to store.
         * So we lounch them on destroy.
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
 * @return void
 *
 * @description
 * Delete all refs of events.
 * If slot in unused and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansBindProps = () => {
    bindPropsMap.clear();
};
