// @ts-check

import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { getParentIdById } from '../../componentStore/action/parent';
import { setDynamicPropsWatch } from '../../componentStore/action/props';
import { getStateById, setStateById } from '../../componentStore/action/state';
import { watchById } from '../../componentStore/action/watch';
import { mainStore } from '../mainStore';

/**
 * @property {Object} [ props ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 */
export const createProps = (props = {}) => {
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
 * @property {Object} [ props ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 */
export const createDynamicProps = (props = {}) => {
    /**
     * @type {String}
     */
    const id = getUnivoqueId();
    mainStore.set('dynamicPropsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { propsId: id, propsObj: props }];
    });

    return id;
};

export const addCurrentIdToDynamicProps = ({ propsId, componentId }) => {
    if (!propsId) return;

    mainStore.set('dynamicPropsToChildren', (prev) => {
        return prev.map((item) => {
            const { propsId: id } = item;
            return id === propsId ? { ...item, componentId } : item;
        });
    });
};

const setDynamicProp = ({ componentId, states, props, fireCallback }) => {
    const parentId = getParentIdById(componentId);
    if (!parentId) return;

    const parentState = getStateById(parentId);

    const values = states
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

// data-dynamic="${createDynamicProps({
//     states: ['counter', 'data'],
//     props: ({ counter, data }) => {
//         return { label: `${counter}-${data[0]?.key}` };
//     },
// })}"
export const applyDynamicProps = ({ componentId }) => {
    const { dynamicPropsToChildren } = mainStore.get();

    /**
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
        propsObj: { states, props },
    } = dynamicPropsFiltered;

    /**
     * Set prop on component load
     */
    setDynamicProp({ componentId, states, props, fireCallback: true });

    /**
     * Watch props on change
     */
    const propsController = { active: false };
    const unWatchArray = states.map((state) => {
        return watchById(getParentIdById(componentId), state, () => {
            const { active } = propsController;
            if (active) return;

            /**
             * Fire watch only once if multiple props change.
             * Wait the end of current block.
             */
            propsController.active = true;
            setTimeout(() => {
                setDynamicProp({
                    componentId,
                    states,
                    props,
                    fireCallback: true,
                });
                propsController.active = false;
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
    mainStore.set('dynamicPropsToChildren', (prev) => {
        return prev.filter(({ componentId: currentComponentId }) => {
            return componentId !== currentComponentId;
        });
    });
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
