import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindText }) => {
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
