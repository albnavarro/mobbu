import { createComponent } from '../mobjs';
import { MyComponent } from '../myComponent';

export const myComponentDefinition = createComponent({
    name: 'my-component',
    component: MyComponent,
    exportState: ['state1'],
    state: {
        state1: () => ({
            value: [],
            type: Array,
        }),
        state2: () => ({
            value: '',
            type: String,
        }),
    },
});
