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
    },

    scoped: true,
});
