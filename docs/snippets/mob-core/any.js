import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myProps: {
        __value: {
            prop: {
                nestedProp: {
                    nestedProp: {
                        value: 2,
                    },
                },
            },
        },
        __type: 'any',
    },
});
