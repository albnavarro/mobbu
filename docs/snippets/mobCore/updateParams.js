import { mobCore } from '../../../src/js/mobCore';

const myStore = mobCore.createStore({
    prop: 0,
    myObject: {
        prop: () => ({
            value: 0,
            type: Number,
        }),
        prop2: () => ({
            value: 0,
            type: Number,
        }),
    },
});

// Clone data before mutate the stored data.
myStore.update('prop', (value) => value + 1, { emit: true, clone: true });
