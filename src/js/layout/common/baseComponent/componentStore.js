import { core } from '../../../mobbu';
import { checkType } from '../../../mobbu/store/storeType';

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
                    item?.destroy &&
                    item?.props &&
                    'id' in item
            );

            if (!isValid) console.warn(`componentStore error on instances add`);
            return isValid;
        },
    }),
    cancellabelInstance: () => ({
        value: [],
        type: Array,
        strict: true,
        validate: (val) => {
            const isValid = val.every((item) => checkType(item, String));

            if (!isValid)
                console.warn(`componentStore error on cancellabelInstance add`);
            return isValid;
        },
    }),
});

/**
 * Add component to store.
 */
export const addComponentToStore = ({
    element = {},
    props = {},
    destroy = null,
    isCancellable = false,
    id = null,
}) => {
    componentStore.set('instances', (prev) => {
        return [...prev, { element, props, destroy, id }];
    });

    if (isCancellable) {
        componentStore.set('cancellabelInstance', (prev) => {
            return [...prev, id];
        });
    }

    componentStore.debugStore();
};

/**
 * Get element by Dom instance
 */
export const getPropsById = ({ id }) => {
    const { instances } = componentStore.get();
    const { props } = instances.find(({ id: currentId }) => currentId === id);

    return props;
};

/**
 * Remove ghost component created when is innested.
 */
export const cleanStoreComponent = () => {
    componentStore.set('instances', (prev) => {
        return prev.filter(({ id }) => {
            return document.querySelector(`[data-id=${id}]`);
        });
    });

    componentStore.set('cancellabelInstance', (prev) => {
        return prev.filter((id) => {
            return document.querySelector(`[data-id=${id}]`);
        });
    });
};

/**
 * Remove component to store.
 */
export const removeComponentFromStore = ({ id = 0 }) => {
    console.log(id);
};

/**
 * Remove component to store.
 */
export const removeCancellableComponentFromStore = () => {};
