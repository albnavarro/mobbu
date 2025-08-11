import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2>${label}</h2>
        </div>
    `;
};
