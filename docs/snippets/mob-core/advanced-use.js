import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    props1: () => ({
        value: 0,
        type: Number,
        transform: (val) => {
            return val * 2;
        },
        validate: (val) => {
            return val > 0;
        },
        strict: false,
        skipEqual: false,
    }),
    props2: () => ({
        value: 'test',
        type: String,
    }),
});
