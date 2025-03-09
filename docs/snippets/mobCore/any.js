import { MobCore } from '../../../src/js/mobCore';

const myStore = MobCore.createStore({
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
