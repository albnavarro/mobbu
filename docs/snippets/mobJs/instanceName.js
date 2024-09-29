/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html }) => {
    return html`
        <div>
            <my-child-component name="child"></my-child-component>
        </div>
    `;
};
