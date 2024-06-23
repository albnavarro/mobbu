/**
 * @type {import("../mobjs/type").mobComponent}
 */
export const MyComponent = ({ html }) => {
    /**
     * Return the DOM.
     */
    return html`
        <div>
            <my-child-component></my-child-component>
        </div>
    `;
};
