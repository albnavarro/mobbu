/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html }) => {
    return html`
        <div><my-child-component name="child"></my-child-component></div>
    `;
};
