import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyLayout>}
 */
export const MyLayout = () => {
    return html`
        <section>
            <div class="col">
                <mobjs-slot name="left"></mobjs-slot>
            </div>
            <div class="col">
                <mobjs-slot name="right"></mobjs-slot>
            </div>
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
            <my-content slot="left"></my-content>
            <my-sidebar slot="right"></my-sidebar>
        </my-layout>
    `;
};
