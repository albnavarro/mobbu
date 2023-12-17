import { mobCore } from '../mobCore';

const myStore = mobCore.createStore({
    myProps: () => ({
        value: {
            prop: {
                nestedProp: {
                    nestedProp: {
                        value: 2,
                    },
                },
            },
        },
        type: 'any',
    }),
});
