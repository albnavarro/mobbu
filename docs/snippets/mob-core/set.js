import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    myComplexObj: {
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

// It is possible modify single propierites of complexObject.
myStore.set('myComplexObj', { prop: 10 });
