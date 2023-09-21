// @ts-check

import { mobCore } from '../../../mobCore';
import { getCurrentListValueById } from '../../componentStore/action/currentListValue';
import { getParentIdById } from '../../componentStore/action/parent';
import { setDynamicPropsWatch } from '../../componentStore/action/props';
import { getStateById, setStateById } from '../../componentStore/action/state';
import { watchById } from '../../componentStore/action/watch';
import { componentMap } from '../../componentStore/store';

/**
 * @type {Map<String,{'bind':Array<String>,'parentId':String|undefined,'componentId':String,'propsId':String,'props':Object}>}
 */
export const dynamicPropsMap = new Map();

/**
 * @param {{'bind':Array<String>,'parentId':String|undefined,'props':Object}} propsObj
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
export const setBindProps = (propsObj) => {
    const propsIsValid = 'bind' in propsObj && 'props' in propsObj;

    if (!propsIsValid) {
        console.warn(`bindProps not valid`);
        return;
    }

    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    dynamicPropsMap.set(id, { ...propsObj, componentId: '', propsId: id });

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

    for (const [key, value] of dynamicPropsMap) {
        if (key === propsId) {
            dynamicPropsMap.set(key, { ...value, componentId });
        }
    }

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

    for (const [key, value] of dynamicPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            dynamicPropsMap.delete(key);
        }
    }
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

    dynamicPropsMap.delete(propsId);
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
     * Cicle dynamicProps from component or from slot.
     */
    dynamicPropsFilteredArray.forEach((dynamicpropsfiltered) => {
        const { bind, props, parentId } = dynamicpropsfiltered;

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
                currentParentId: currentParentId ?? '',
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
                        currentParentId: currentParentId ?? '',
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

    for (const [key, value] of dynamicPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            dynamicPropsMap.delete(key);
        }
    }
};
