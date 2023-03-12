import { core } from '../../mobbu';

/**
 * instances: [{
 *   destroy: () => {},
 *   index: Number
 * ]
 * ...}
 *
 * active: [1,2,3,10]
 */
export const componentStore = core.createStore({
    instances: () => ({
        value: [],
        type: Array,
    }),
    cancellable: () => ({
        value: [],
        type: Array,
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
    destroy = () => {},
    isCancellable = false,
}) => {
    componentStore.set('index', (prev) => prev + 1);
    const { index } = componentStore.get();

    componentStore.set('instances', (prev) => {
        return [...prev, { destroy, index }];
    });
    if (isCancellable) {
        componentStore.set('cancellable', (prev) => {
            return [...prev, index];
        });
    }

    componentStore.debugStore();
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
export const removeCancellableComponentFromStore = ({ index = 0 }) => {
    console.log(index);
};
