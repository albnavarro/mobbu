import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myArray: {
        __value: [],
        __type: Array,
    },
});

/**
 * Clone a array and return new array with one item added with classic push methods.
 */
myStore.updateState(
    'myArray',
    (value) => {
        value.push(10);
        return value;
    },
    { clone: true, emit: true }
);
