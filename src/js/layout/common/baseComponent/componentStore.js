import { core } from '../../../mobbu';

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
export const addComponentToStore = ({
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
                cancellable: component.hasAttribute('data-cancellable'),
                state: store,
            },
        ];
    });

    return {
        getProps: () => props,
        getState: () => store.get(),
        setState: (prop, value) => store.set(prop, value),
        watch: (prop, cb) => store.watch(prop, cb),
    };
};

/**
 * Get element by Dom instance
 */
export const getPropsById = (id) => {
    const { instances } = componentStore.get();
    const { props } = instances.find(({ id: currentId }) => currentId === id);

    return props;
};

/**
 * Get state
 */
export const getStateById = (id) => {
    const { instances } = componentStore.get();
    const { state } = instances.find(({ id: currentId }) => currentId === id);

    return state.get();
};

/**
 * Set state
 */
export const setStateById = (id, prop, value) => {
    const { instances } = componentStore.get();
    const { state } = instances.find(({ id: currentId }) => currentId === id);

    state.set(prop, value);
};

/**
 * Watch state
 */
export const watchById = (id, prop, cb) => {
    const { instances } = componentStore.get();
    const { state } = instances.find(({ id: currentId }) => currentId === id);

    state.watch(prop, cb);
};

/**
 * Remove ghost component created when is innested.
 */
export const cleanStoreComponent = () => {
    //TODO fire destroy, destroy store,
    //Fare un filter al contrario e usare removeComponentFromStore()
    componentStore.set('instances', (prev) => {
        return prev.filter(({ id }) => {
            return document.querySelector(`[data-id=${id}]`);
        });
    });
};

/**
 * Remove component to store.
 */
export const removeComponentFromStore = ({ id = null }) => {
    // Run destroy function
    // Destroy store
    // Remove item from global store
};

/**
 * Remove component to store.
 */
export const removeCancellableComponentFromStore = () => {
    // Call removeComponentFromStore for each component cacellable
};
