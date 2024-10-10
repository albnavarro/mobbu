/**
export type BindText = (TemplateStringsArray, ...any) => string;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, bindText }) => {
    return html`
        <div>
            <div>${bindText`some text ${'state'} some text ${'state2'}`}</div>
            <div>${bindText`some text ${'state.prop1.prop2'} state2'}`}</div>

            <!-- Use with slot -->
            <title-component>${bindText`text ${'state'}`}</title-component>
        </div>
    `;
};
