import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyLayout = () => {
    return html`
        <section>
            <mobjs-slot></mobjs-slot>
        </section>
    `;
};

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = () => {
    return html`
        <my-layout>
            <my-component></my-component>
        </my-layout>
    `;
};
