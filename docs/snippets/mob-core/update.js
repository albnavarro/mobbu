import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    myObject: {
        prop: {
            __value: 0,
            __type: Number,
        },
        prop2: {
            __value: 0,
            __type: Number,
        },
    },
});

// Default
myStore.update('prop', (oldValue) => {
    return oldValue + 1;
});

// Object
myStore.update('myObject', (obj) => {
    return { prop: obj.prop + 1 };
});
