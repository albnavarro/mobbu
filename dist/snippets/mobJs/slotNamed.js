/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyLayout = ({ html }) => {
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

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html }) => {
    return html`
        <my-layout>
            <my-content slot="left"></my-content>
            <my-sidebar slot="right"></my-sidebar>
        </my-layout>
    `;
};
