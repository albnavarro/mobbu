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
                (item) => item?.destroy && item?.props && 'id' in item
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
    props = {},
    destroy = null,
    isCancellable = false,
    id = null,
}) => {
    componentStore.set('instances', (prev) => {
        return [...prev, { props, destroy, id }];
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
 * Remove component to store.
 */
export const removeComponentFromStore = ({ index = 0 }) => {
    console.log(index);
};

/**
 * Remove component to store.
 */
export const removeCancellableComponentFromStore = () => {};
