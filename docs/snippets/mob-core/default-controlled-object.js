import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
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
