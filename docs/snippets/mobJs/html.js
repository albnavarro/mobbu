/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
