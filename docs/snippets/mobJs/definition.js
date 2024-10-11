import { createComponent } from '../mobjs';
import { MyComponentFn } from '../myComponent';

export const MyComponent = createComponent({
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
    child: ['ChildComponent1', 'ChildComponent2'],

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
