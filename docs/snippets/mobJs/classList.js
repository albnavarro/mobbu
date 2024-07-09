/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html }) => {
    return html`
        <div>
            <my-child-component class="myclass1 myclass2"></my-child-component>
        </div>
    `;
};
