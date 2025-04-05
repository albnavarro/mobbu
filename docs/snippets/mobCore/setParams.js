import { MobCore } from '@mobCore';

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

// Do not issue any callbacks
myStore.set('prop', 2, { emit: false });
