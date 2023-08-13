// @ts-check

import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { getParentIdById } from '../../componentStore/action/parent';
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
//     watch: 'data',
//     states: ['counter', 'data'],
//     props: ({ counter, data }) => {
//         return { label: `${counter}-${data[0]?.key}` };
//     },
// })}"
export const applyDynamicProps = ({ componentId }) => {
    const { dynamicPropsToChildren } = mainStore.get();

    dynamicPropsToChildren.forEach((obj) => {
        const { componentId: currentComponentId, propsObj } = obj;
        if (currentComponentId !== componentId) return;

        const { watch, states, props } = propsObj;
        setDynamicProp({ componentId, states, props, fireCallback: true });
        watchById(getParentIdById(componentId), watch, () => {
            setDynamicProp({ componentId, states, props, fireCallback: true });
        });
    });

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
