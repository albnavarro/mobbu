/**
 * Default component
 */
export const MyComponent = ({ html }) => {
    return html` <div>my component.</div> `;
};

/**
 * webComponent
 */
export const MyComponent = ({ html }) => {
    return html` <my-component>my component.</my-component> `;
};
