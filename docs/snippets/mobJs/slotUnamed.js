/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyLayout = ({ html }) => {
    return html`
        <section>
            <mobjs-slot></mobjs-slot>
        </section>
    `;
};

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html }) => {
    return html`
        <my-layout>
            <my-component></my-component>
        </my-layout>
    `;
};
