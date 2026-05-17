import { MobJs } from '@mobJs';
import { MyComponentFn } from '../myComponent';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */
export const MyComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MyComponent>} */
    ({
        /**
         * Necessary
         */
        tag: 'my-component',
        component: MyComponentFn,

        /**
         * Optional
         */
        bindStore: MobJs.mainStore,
        props: {
            label: {
                __value: '',
                __type: String,
            },
        },
        state: {
            myArray: {
                __value: [],
                __type: Array,
            },
            myObject: {
                __value: {
                    prop: 'lorem',
                },
                __type: 'any',
            },
            myComplexState: {
                __value: 2,
                __type: Number,
                __transform: (value, oldValue) => {
                    return value + oldValue;
                },
                __validate: (value) => value < 100,
                __strict: true,
                __skipEqual: false,
            },
        },

        /**
         * Optional
         */
        scoped: false,
    })
);
