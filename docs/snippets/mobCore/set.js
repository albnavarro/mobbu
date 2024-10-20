import { mobCore } from '../mobCore';

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

// Default
myStore.set('prop', 2);

// Object
myStore.set('myObject', { prop: 10 });
