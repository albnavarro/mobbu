import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    /**
     * Return the DOM.
     */
    return html`
        <div>
            <my-child-component></my-child-component>
        </div>
    `;
};
