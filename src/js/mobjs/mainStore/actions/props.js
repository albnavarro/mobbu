// @ts-check

import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { getParentIdById } from '../../componentStore/action/parent';
import { setDynamicPropsWatch } from '../../componentStore/action/props';
import { getStateById, setStateById } from '../../componentStore/action/state';
import { watchById } from '../../componentStore/action/watch';
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
export const staticProps = (props = {}) => {
    /**
     * @type {String}
     */
    const id = getUnivoqueId();
    mainStore.set('propsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: props }];
    });

    return id;
};

/**
 * @param {Object} [ propsObj ]
 * @return {String} props id in store.
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
export const bindProps = (propsObj = {}) => {
    const propsIsValid = 'bind' in propsObj && 'props' in propsObj;

    if (!propsIsValid) {
        console.warn(`bindProps not valid`);
        return 'dynamic-prop-not-valid';
    }

    /**
     * @type {String}
     */
    const id = getUnivoqueId();
    mainStore.set('dynamicPropsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { propsId: id, propsObj }];
    });

    return id;
};

/**
 * @param {Object} obj
 * @param {String} obj.componentId
 * @param {Array<String>} obj.bind
 * @param {(args0: Object)=>Object} obj.props
 * @param {Boolean} obj.fireCallback
 * @return void
 *
 * @description
 * Store props and return a unique indentifier
 *
 */
const setDynamicProp = ({ componentId, bind, props, fireCallback }) => {
    const parentId = getParentIdById(componentId);
    if (!parentId) return;

    /**
     * Check id all bind props exist in parent state.
     */
    const parentState = getStateById(parentId);
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

    const newProps = props?.(values);

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
 * Store props and return a unique indentifier
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
 * @param {Boolean} obj.inizilizeWatcher
 * @return void
 *
 * @description
 * Store props and return a unique indentifier
 *
 */
export const applyDynamicProps = ({ componentId, inizilizeWatcher }) => {
    const { dynamicPropsToChildren } = mainStore.get();

    /**
     * @type {{ propsId: String, componentId: String, propsObj: {bind:Array, props:(args0: Object) => Object} }}
     *
     * @description
     * Get dynamic prop by component.
     */
    const dynamicPropsFiltered = dynamicPropsToChildren.find(
        ({ componentId: currentComponentId }) =>
            currentComponentId === componentId
    );

    /**
     * If not return.
     */
    if (!dynamicPropsFiltered) return;

    const {
        propsObj: { bind, props },
    } = dynamicPropsFiltered;

    /**
     * Set prop on component load
     */
    setDynamicProp({ componentId, bind, props, fireCallback: true });

    if (!inizilizeWatcher) return;

    /**
     * Watch props on change
     */
    let watchIsRunning = false;
    const unWatchArray = bind.map((/** @type{String} */ state) => {
        return watchById(getParentIdById(componentId), state, () => {
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
