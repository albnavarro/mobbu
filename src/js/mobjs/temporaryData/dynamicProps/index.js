// @ts-check

import { mobCore } from '../../../mobCore';
import { getRepeaterStateById } from '../../componentStore/action/currentRepeatValue';
import { getParentIdById } from '../../componentStore/action/parent';
import { setDynamicPropsWatch } from '../../componentStore/action/props';
import { getStateById, setStateById } from '../../componentStore/action/state';
import { watchById } from '../../componentStore/action/watch';
import { incrementTickQueuque } from '../../componentStore/tick';
import { componentMap } from '../../componentStore/store';
import { QUEQUE_TYPE_BINDPROPS } from '../../constant';
import { repeaterTick } from '../../componentStore/tickRepeater';

/**
 * @type {Map<string,{'bind':Array<string>,'parentId':string|undefined,'componentId':string,'propsId':string,'props':object}>}
 */
export const dynamicPropsMap = new Map();

/**
 * @param {{bind?:string[],parentId:string|undefined,props:{[key:string]: any}, forceParent? :boolean}} propsObj
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
export const setBindProps = (propsObj) => {
    const propsIsValid = 'props' in propsObj;

    const propsObjUpdates =
        'bind' in propsObj ? propsObj : { ...propsObj, bind: [] };

    if (!propsIsValid) {
        console.warn(`bindProps not valid`);
        return;
    }

    /**
     * @type {string}
     */
    const id = mobCore.getUnivoqueId();
    // @ts-ignore
    dynamicPropsMap.set(id, {
        ...propsObjUpdates,
        componentId: '',
        propsId: id,
    });

    return id;
};

/**
 * @param {object} obj
 * @param {string} obj.componentId
 * @param {Array<string>} obj.bind
 * @param {(args0: object, index: number ) => object} obj.props
 * @param {string} obj.currentParentId
 * @param {boolean} obj.fireCallback
 * @return void
 *
 * @description
 * Store props and return a unique identifier
 *
 */
const setDynamicProp = ({
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

    const newProps = props?.(parentState, currentRepeaterState?.index);

    if (!newProps) return;

    Object.entries(newProps).forEach(([key, value]) => {
        setStateById(componentId, key, value, fireCallback);
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
export const addCurrentIdToDynamicProps = ({
    propsId,
    repeatPropBind,
    componentId,
}) => {
    if (!propsId) return;

    for (const [key, value] of dynamicPropsMap) {
        if (key === propsId) {
            dynamicPropsMap.set(key, { ...value, componentId });
        }
    }

    applyDynamicProps({ componentId, repeatPropBind, inizilizeWatcher: false });
};

/**
 * @param {object} obj
 * @param {string} obj.componentId
 * @return void
 *
 * @description
 * Remove dynamic prop reference by componentId.
 *
 */
export const removeCurrentIdToDynamicProps = ({ componentId }) => {
    if (!componentId) return;

    for (const [key, value] of dynamicPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            dynamicPropsMap.delete(key);
        }
    }
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
export const removeCurrentToDynamicPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    dynamicPropsMap.delete(propsId);
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
export const applyDynamicProps = async ({
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
    const dynamicPropsFilteredArray = [...dynamicPropsMap.values()].filter(
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
            repeatPropBind?.length > 0 && !bind.includes(repeatPropBind)
                ? [...bind, repeatPropBind]
                : [...bind];

        /**
         * Force parent id or get the natually parent id.
         */
        const currentParentId = parentId ?? getParentIdById(componentId);

        if (!inizilizeWatcher) {
            /**
             * Initialize props after repater
             * So we have the last value of currentValue && index
             */
            await repeaterTick();

            /**
             * Set first bind state on component created
             */
            setDynamicProp({
                componentId,
                bind: bindUpdated,
                props,
                currentParentId: currentParentId ?? '',
                fireCallback: true,
            });

            return;
        }

        /**
         * Watch props on change
         */
        let watchIsRunning = false;

        const unWatchArray = bindUpdated.map((/** @type{string} */ state) => {
            return watchById(currentParentId, state, () => {
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
                mobCore.useNextLoop(() => {
                    setDynamicProp({
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
        setDynamicPropsWatch({ id: componentId, unWatchArray });

        /**
         * Remove current dynamic prop from store.
         */
    }

    /**
     * If all watcher ( from component or from slot ) is initialized deleter all reference from store
     */
    if (!inizilizeWatcher) return;

    for (const [key, value] of dynamicPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            dynamicPropsMap.delete(key);
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
export const removeOrphansDynamicProps = () => {
    dynamicPropsMap.clear();
};
