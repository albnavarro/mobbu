import { html, MobJs } from '@mobjs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    onMount(() => {
        /**
         * It is a good idea to use the Optional chaining to ensure that the
         * component is mounted and the methods is available.
         */
        MobJs.useMethodByName('myComponentName')?.myMethod?.();
        return () => {};
    });

    return html`
        <div>
            <my-component name="myComponentName"> </my-component>
        </div>
    `;
};
