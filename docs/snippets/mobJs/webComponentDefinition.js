import { MobJs } from '../../../src/js/mobjs';
import { MyComponent } from '../myComponent';

export const myComponentDefinition = MobJs.createComponent({
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
    connectedCallback: ({ context, params }) => {
        //
    },
    disconnectedCallback: ({ context, params }) => {
        //
    },
    adoptedCallback: ({ context, params }) => {
        //
    },
    attributeToObserve: ['class', 'test'],
    attributeChangedCallback: ({
        name,
        oldValue,
        newValue,
        context,
        params,
    }) => {
        if (name === 'myAttribute' && newValue === 'myvalue') {
            const { getProxi } = params;
            const proxi = getProxi();
            proxi.myprop = 2;
        }
    },
    style: /* HTML */ ` ::slotted(div) { width: 100%; } `,
});
