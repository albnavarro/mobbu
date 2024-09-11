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
myStore.update('prop', (oldValue) => {
    return oldValue + 1;
});

// Object
myStore.update('myObject', (obj) => {
    return { ...obj, prop: 10 };
});
