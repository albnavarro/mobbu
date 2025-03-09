import { MobCore } from '../../../src/js/mobCore';

const myStore = MobCore.createStore({
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

myStore.set('prop', 2);
myStore.set('myObject', { prop: 10 });
