import { html, MobJs } from '@mobjs';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

/**
 * @type {MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    onMount(() => {
        /** @type {UseMethodByName<MyComponentState>} */
        const myComponentMethods = MobJs.useMethodByName('myComponentName');
        myComponentMethods?.myMethod?.();

        return () => {};
    });

    return html`
        <div>
            <my-component name="myComponentName"> </my-component>
        </div>
    `;
};
