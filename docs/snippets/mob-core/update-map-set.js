import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myMap: () => ({
        value: new Map(),
        type: Map,
    }),
});

/**
 * Clone a array and return new array with one item added with classic push methods.
 */
myStore.update(
    'myMap',
    (value) => {
        return value.set('myKey', 10);
    },
    { clone: true }
);
