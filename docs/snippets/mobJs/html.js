import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
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
