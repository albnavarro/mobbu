import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return html`
        <div>
            <my-child-component name="child"></my-child-component>
        </div>
    `;
};
