/**
export type BindText = (TemplateStringsArray, ...any) => string;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, bindText }) => {
    return html`
        <div>
            <div>${bindText`<h1>title</h1> ${'state'} / ${'state2'}`}</div>
            <div>${bindText`some text ${'state.prop1.prop2'}`}</div>
            <div>${bindText`some text ${'state[0]'}`}</div>
            <div>${bindText`some text ${'state[0][1]'}`}</div>

            <!-- Use with slot -->
            <title-component>${bindText`text ${'state'}`}</title-component>
        </div>
    `;
};
