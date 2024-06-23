/**
 * @type {import("../mobjs/type").mobComponent}
 */
export const MyLayout = ({ html }) => {
    return html`
        <section>
            <mobjs-slot></mobjs-slot>
        </section>
    `;
};

/**
 * @type {import("../mobjs/type").mobComponent}
 */
export const MyComponent = ({ html }) => {
    return html`
        <my-layout>
            <my-component></my-component>
        </my-layout>
    `;
};
