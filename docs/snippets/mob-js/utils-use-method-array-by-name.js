import { html, MobJs } from '@mobjs';

/**
 * @import {UseMethodArrayByName} from '@mobJsType'
 */

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '..';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    onMount(() => {
        /**
         * It is a good idea to use the Optional chaining to ensure that the component
         * is mounted and the methods is available.
         */

        /** @type {UseMethodArrayByName<import('./other-component/type').MyOtherComponent>} */
        const methods = MobJs.useMethodArrayByName(otherComponentName);

        methods.forEach((method) => {
            method?.myMethod?.();
        });

        return () => {};
    });

    return html`
        <div>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
            <my-component name="${otherComponentName}"> </my-component>
        </div>
    `;
};
