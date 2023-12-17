/**
 * @param {import("../mobjs/type").componentType}
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
