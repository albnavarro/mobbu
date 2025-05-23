import { html, MobJs } from '@mobjs';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '';

/**
 * @type {MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    onMount(() => {
        /** @type {UseMethodByName<MyComponentState>} */
        const myComponentMethods = MobJs.useMethodByName(otherComponentName);
        myComponentMethods?.myMethod?.();

        return () => {};
    });

    return html`
        <div>
            <my-component name="${otherComponentName}"> </my-component>
        </div>
    `;
};
