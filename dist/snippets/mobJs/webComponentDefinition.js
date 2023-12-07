import { createComponent } from '../mobjs';
import { MyComponent } from '../myComponent';

export const myComponentDefinition = createComponent({
    name: 'my-component',
    component: MyComponent,
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

    /**
     * Web component methods.
     */
    attributeToObserve: ['class', 'test'],
    constructorCallback: ({ context }) => {
        //
    },
    connectedCallback: ({ context, data }) => {
        //
    },
    disconnectedCallback: ({ context, data }) => {
        //
    },
    adoptedCallback: ({ context, data }) => {
        //
    },
    attributeChangedCallback: ({ name, oldValue, newValue, context, data }) => {
        //
    },
    style: /* HTML */ ` ::slotted(div) { width: 100%; } `,
});
