import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return html`
        <div>
            <my-child-component class="myclass1 myclass2"></my-child-component>
        </div>
    `;
};
