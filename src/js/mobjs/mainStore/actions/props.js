// @ts-check

import { mobCore } from '../../../mobCore';
import { getCurrentListValueById } from '../../componentStore/action/currentListValue';
import { getParentIdById } from '../../componentStore/action/parent';
import { setDynamicPropsWatch } from '../../componentStore/action/props';
import { getStateById, setStateById } from '../../componentStore/action/state';
import { watchById } from '../../componentStore/action/watch';
import { componentMap } from '../../componentStore/store';
import { mainStore } from '../mainStore';

/**
 * @param {Object} [ props ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 *
 * @example
 * ```javascript
 *   <MyComponent
 *       data-staticprops="${staticProps({
 *           childState1: key,
 *           callBack: () => setState('parentState', key)
 *       })}"
 *   ></MyComponent>
 * ```
 */
export const setStaticProps = (props = {}) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    mainStore.set('propsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: props }];
    });

    return id;
};

/**
 * @param {Object} [ propsObj ]
 * @return {String|undefined} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
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
export const setBindProps = (propsObj = {}) => {
    const propsIsValid = 'bind' in propsObj && 'props' in propsObj;

    if (!propsIsValid) {
        console.warn(`bindProps not valid`);
        return;
    }

    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    mainStore.set('dynamicPropsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { propsId: id, propsObj }];
    });

    return id;
};

/**
 * @param {Object} obj
 * @param {String} obj.componentId
 * @param {Array<String>} obj.bind
 * @param {(args0: Object, org0: any)=>Object} obj.props
 * @param {String} obj.currentParentId
 * @param {Boolean} obj.fireCallback
 * @return void
 *
 * @description
 * Store props and return a unique indentifier
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
            `bind props error: Some prop ${JSON.stringify(bind)} doasn't exist`
        );
    }

    const values = bind
        .map((currentState) => {
            return {
                [currentState]: parentState[currentState],
            };
        })
        .reduce((previous, current) => ({ ...previous, ...current }), {});

    /**
     * If element is deleted from list don't update state.
     */
    const componentExist = componentMap.has(componentId);
    if (!componentExist) return;

    /**
     *
     */

    const currentRepeaterState = getCurrentListValueById({ id: componentId });
    const newProps = props?.(values, currentRepeaterState);

    if (!newProps) return;

    Object.entries(newProps).forEach(([key, value]) => {
        setStateById(componentId, key, value, fireCallback);
    });
};

/**
 * @param {Object} obj
 * @param {String|undefined} obj.propsId
 * @param {String} obj.componentId
 * @return void
 *
 * @description
 * Add componentId to dynamic props stored and inizialize them.
 *
 */
export const addCurrentIdToDynamicProps = ({ propsId, componentId }) => {
    if (!propsId) return;

    mainStore.set(
        'dynamicPropsToChildren',
        (/** @type {Array<Object>} */ prev) => {
            return prev.map((item) => {
                const { propsId: id } = item;
                return id === propsId ? { ...item, componentId } : item;
            });
        }
    );

    applyDynamicProps({ componentId, inizilizeWatcher: false });
};

/**
 * @param {Object} obj
 * @param {String} obj.componentId
 * @return void
 *
 * @description
 * Remove dynamic prop reference by componentId.
 *
 */
export const removeCurrentIdToDynamicProps = ({ componentId }) => {
    if (!componentId) return;

    mainStore.set(
        'dynamicPropsToChildren',
        (/** @type {Array<Object>} */ prev) => {
            return prev.filter(({ componentId: currentComponentId }) => {
                return currentComponentId !== componentId;
            });
        }
    );
};

/**
 * @param {Object} obj
 * @param {String} obj.propsId
 * @return void
 *
 * @description
 * If slot is not used remove id reference orphans from store.
 *
 */
export const removeCurrentToDynamicPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    mainStore.set(
        'dynamicPropsToChildren',
        (/** @type {Array<Object>} */ prev) => {
            return prev.filter(({ propsId: currentPropsId }) => {
                return currentPropsId !== propsId;
            });
        }
    );
};

/**
 * @param {Object} obj
 * @param {String} obj.componentId
 * @param {Boolean} obj.inizilizeWatcher
 * @return void
 *
 * @description
 * Update component state, if inizilizeWatcher === true
 * add watcher to parent ( or specific component ) state.
 *
 */
export const applyDynamicProps = ({ componentId, inizilizeWatcher }) => {
    const { dynamicPropsToChildren } = mainStore.get();

    /**
     * @type {Array<{ propsId: String, componentId: String, propsObj: {parentId: String, bind:Array, props:(args0: Object) => Object} }>}
     *
     * @description
     * Get dynamic prop by component.
     * Dynamic props can arrive from component || slot.
     */
    const dynamicPropsFilteredArray = dynamicPropsToChildren.filter(
        ({ componentId: currentComponentId }) =>
            currentComponentId === componentId
    );

    /**
     * If not return.
     */
    if (!dynamicPropsFilteredArray) return;

    /**
     * Cicle dynamicProps from component or from slot.
     */
    dynamicPropsFilteredArray.forEach((dynamicpropsfiltered) => {
        const {
            propsObj: { bind, props, parentId },
        } = dynamicpropsfiltered;

        /**
         * Force parent id or get the natually parent id.
         */
        const currentParentId = parentId ?? getParentIdById(componentId);

        if (!inizilizeWatcher) {
            /**
             * Set first bind state on component created
             */
            setDynamicProp({
                componentId,
                bind,
                props,
                currentParentId,
                fireCallback: true,
            });

            return;
        }

        /**
         * Watch props on change
         */
        let watchIsRunning = false;

        const unWatchArray = bind.map((/** @type{String} */ state) => {
            return watchById(currentParentId, state, () => {
                if (watchIsRunning) return;

                /**
                 * Fire watch only once if multiple props change.
                 * Wait the end of current block.
                 */
                watchIsRunning = true;
                setTimeout(() => {
                    setDynamicProp({
                        componentId,
                        bind,
                        props,
                        currentParentId,
                        fireCallback: true,
                    });
                    watchIsRunning = false;
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
    });

    /**
     * If all watcher ( from component or from slot ) is inizialized deleter all reference from store
     */
    if (!inizilizeWatcher) return;

    mainStore.set(
        'dynamicPropsToChildren',
        (/** @type{Array<Object>} */ prev) => {
            return prev.filter(({ componentId: currentComponentId }) => {
                return componentId !== currentComponentId;
            });
        }
    );
};

/**
 * @return void
 *
 * @description
 * Clear all dynamicPropsToChildren Remainmed
 * Props from slot remaind orphans ( has no component id ).
 */
export const clearOrphansDynamicPropsFromSlot = () => {
    mainStore.set(
        'dynamicPropsToChildren',
        (/** @type{Array<Object>} */ prev) => {
            return prev.filter(({ componentId }) => {
                return componentId !== undefined;
            });
        }
    );
};

/**
 * @property {String} id
 *
 * @return {Object}
 *
 * @description
 * Return props by id
 */
export const getPropsFromParent = (id = '') => {
    const { propsToChildren } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const props = propsToChildren.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    /**
     * Remove props
     */
    mainStore.set('propsToChildren', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(id in item);
        });
    });

    return props ? props[id] : {};
};

/**
 * @param {Object} obj
 * @param {String} obj.propsId
 * @return void
 *
 * @description
 * If slot is not used remove id reference orphans from store.
 *
 */
export const removeCurrentToPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    mainStore.set('propsToChildren', (/** @type {Array<Object>} */ prev) => {
        return prev.filter((item) => {
            const [currentPropsId] = Object.keys(item);
            return currentPropsId !== propsId;
        });
    });
};

/**
 * @return void
 *
 * @description
 * Delete all refs of props.
 * If slot in unsed and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansPropsFromParent = () => {
    mainStore.set('propsToChildren', []);
};
