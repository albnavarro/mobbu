/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html }) => {
    return html`
        <div><my-child-component name="child"></my-child-component></div>
    `;
};
