import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    myComplexObj: {
        prop: {
            __value: 0,
            __type: Number,
        }),
        prop2: {
            __value: 0,
            __type: Number,
        },
    },
});

// Do not issue any callbacks
myStore.set('prop', 2, { emit: false });
