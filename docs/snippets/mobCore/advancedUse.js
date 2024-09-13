import { mobCore } from '../mobCore';

const myStore = mobCore.createStore({
    myProps: () => ({
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
    myObject: {
        myProps: () => ({
            value: 'option1',
            type: String,
            transform: (val) => {
                return `option${val}`;
            },
            validate: (val) => {
                return ['option1', 'option2'].includes(val);
            },
        }),
        myProps2: () => ({
            value: [],
            type: Array,
        }),
    },
});
