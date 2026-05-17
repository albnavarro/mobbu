import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myObject: {
        myProps: {
            __value: 'option1',
            __type: String,
            __transform: (val) => {
                return `option${val}`;
            },
            __validate: (val) => {
                return ['option1', 'option2'].includes(val);
            },
        },
        myProps2: {
            __value: [],
            __type: Array,
        },
    },
});
