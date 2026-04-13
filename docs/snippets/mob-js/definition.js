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
            label: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            myArray: () => ({
                value: [],
                type: Array,
            }),
            myObject: () => ({
                value: {
                    prop: 'lorem',
                },
                type: 'any',
            }),
            myComplexState: () => ({
                value: 2,
                type: Number,
                transform: (value, oldValue) => {
                    return value + oldValue;
                },
                validate: (value) => value < 100,
                strict: true,
                skipEqual: false,
            }),
        },

        /**
         * Optional
         */
        scoped: false,
    })
);
