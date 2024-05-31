import { createComponent } from '../mobjs';
import { MyComponent } from '../myComponent';

export const myComponentDefinition = createComponent({
    /**
     * Necessary
     */
    name: 'my-component',
    component: MyComponent,

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
