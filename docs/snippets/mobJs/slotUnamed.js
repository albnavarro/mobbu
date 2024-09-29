/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyLayout = ({ html }) => {
    return html`
        <section>
            <mobjs-slot></mobjs-slot>
        </section>
    `;
};

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html }) => {
    return html`
        <my-layout>
            <my-component></my-component>
        </my-layout>
    `;
};
