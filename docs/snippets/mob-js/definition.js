import { MobJs } from '@mobJs';
import { ChildComponent1 } from '../childComponent1';
import { ChildComponent2 } from '../childComponent2';
import { MyComponentFn } from '../myComponent';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const MyComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').MyComponent>} */
    ({
        /**
         * Necessary
         */
        tag: 'my-component',
        component: MyComponentFn,

        /**
         * Import components definition used inside.
         * ( object returned by createComponent() function )
         * It is necessary to load the dependencies before the application
         */
        child: [ChildComponent1, ChildComponent2],

        /**
         * Optional
         */
        exportState: ['label'],
        bindStore: MobJs.mainStore,
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
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
