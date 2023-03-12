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
                (item) => item?.destroy && 'index' in item
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
            const isValid = val.every((item) => checkType(item, Number));

            if (!isValid)
                console.warn(`componentStore error on cancellabelInstance add`);
            return isValid;
        },
    }),
    index: () => ({
        value: -1,
        type: Number,
    }),
});

/**
 * Add component to store.
 */
export const addComponentToStore = ({
    destroy = null,
    isCancellable = false,
}) => {
    componentStore.set('index', (prev) => prev + 1);
    const { index } = componentStore.get();

    componentStore.set('instances', (prev) => {
        return [...prev, { destroy, index }];
    });
    if (isCancellable) {
        componentStore.set('cancellabelInstance', (prev) => {
            return [...prev, index];
        });
    }

    componentStore.debugStore();
    return index;
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
