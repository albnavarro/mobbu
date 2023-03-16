import { core } from '../../../mobbu';
import { IS_CANCELLABLE, IS_COMPONENT } from './utils';

/**
 * Inizializa component store
 */
export const componentStore = core.createStore({
    instances: () => ({
        value: [],
        type: Array,
        strict: true,
        validate: (val) => {
            const isValid = val.every(
                (item) =>
                    item?.element &&
                    item?.component &&
                    item?.destroy &&
                    item?.props &&
                    item?.state &&
                    'parentId' in item &&
                    'cancellable' in item &&
                    'id' in item
            );

            if (!isValid) console.warn(`componentStore error on instances add`);
            return isValid;
        },
    }),
});

/**
 * Add component to store.
 */
export const registerComponent = ({
    element = {},
    component = {},
    props = {},
    state = {},
    destroy = null,
    id = null,
}) => {
    const store = core.createStore(state);
    componentStore.set('instances', (prev) => {
        return [
            ...prev,
            {
                element,
                component,
                props,
                destroy,
                id,
                parentId: null,
                cancellable: component.hasAttribute(IS_CANCELLABLE),
                state: store,
            },
        ];
    });

    return {
        props,
        getState: () => store.get(),
        setState: (prop, value) => store.set(prop, value),
        watch: (prop, cb) => store.watch(prop, cb),
        getParentId: () => getParentIdById(id),
    };
};

/**
 * Get element by Dom instance
 */
export const getPropsById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const props = instance?.props;
    if (!props) {
        console.warn(`getPropsById failed no id found`);
        return null;
    }

    return props;
};

/**
 * Get state
 */
export const getStateById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`getStateById failed no id found`);
        return null;
    }

    return state.get();
};

/**
 * Set state
 */
export const setStateById = (id, prop, value) => {
    if (!id && !prop && !value) return;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.set(prop, value);
};

/**
 * Watch state
 */
export const watchById = (id, prop, cb) => {
    if (!id && !prop && !cb) return;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`watchById failed no id found on prop: ${prop}`);
        return null;
    }

    state.watch(prop, cb);
};

/**
 * get parent id By id
 */
export const getParentIdById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const parentId = instance?.parentId;
    if (!parentId) {
        console.warn(`getParentIdById failed no id found`);
        return null;
    }

    return parentId;
};

/**
 * Remove with no reference to DOM.
 */
export const removeGhostComponent = () => {};

/**
 * Remove component to store.
 */
export const removeComponentFromStore = () => {
    // Run destroy function
    // Destroy store
    // Remove parentId reference where used
    // Remove item from global store
};

/**
 * Remove component to store.
 */
export const removeCancellableComponentFromStore = () => {
    // Call removeComponentFromStore for each component cacellable
};

/**
 * Set a reference to parent component id for each component.
 */
export const setParentsComponent = () => {
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { element, parentId } = current;
            const parent = element.parentNode.closest(`[${IS_COMPONENT}]`);

            // Assign is if existe a parent component and current parentId is null
            return parent && !parentId
                ? [...previous, { ...current, ...{ parentId: parent.id } }]
                : [...previous, current];
        }, []);
    });
};

/**
 * Update deestroy call back by id.
 */
export const setDestroyCallback = ({ cb = () => {}, id = null }) => {
    if (!id) return;

    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return id === currentId
                ? [...previous, { ...current, ...{ destroy: cb } }]
                : [...previous, current];
        }, []);
    });
};
