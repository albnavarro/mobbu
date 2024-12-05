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

// Do not issue any callbacks
myStore.set('prop', 2, { emit: false });
