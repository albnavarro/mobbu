import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    props1: {
        __value: 0,
        __type: Number,
        __transform: (val) => {
            return val * 2;
        },
        __validate: (val) => {
            return val > 0;
        },
        __strict: false,
        __skipEqual: false,
    },
    props2: {
        __value: 'test',
        __type: String,
    },
});
