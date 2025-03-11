import { MobJs } from '../../../src/js/mobjs';
import { ChildComponent1 } from '../childComponent1';
import { ChildComponent2 } from '../childComponent2';
import { MyComponentFn } from '../myComponent';

export const MyComponent = MobJs.createComponent({
    /**
     * Necessary
     */
    name: 'my-component',
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

    scoped: true,
});
