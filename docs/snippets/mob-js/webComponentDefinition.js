import { MobJs } from '@mobJs';
import { MyComponent } from '../myComponent';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const myComponentDefinition = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').MyComponent>} */
    ({
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
    })
);
