import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyLayout>}
 */
export const MyLayout = () => {
    return html`
        <section>
            <mobjs-slot></mobjs-slot>
        </section>
    `;
};

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return html`
        <my-layout>
            <my-component></my-component>
        </my-layout>
    `;
};
