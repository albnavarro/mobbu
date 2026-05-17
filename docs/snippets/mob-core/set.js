import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    myComplexObj: {
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

myStore.set('prop', 2);

// It is possible modify single propierites of complexObject.
myStore.set('myComplexObj', { prop: 10 });
