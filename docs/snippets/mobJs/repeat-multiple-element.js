/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, repeat }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                render: ({ html }) => {
                    return html` <div class="item-container">
                        <my-child-component> </my-child-component>
                        <my-child-component> </my-child-component>
                    </div>`;
                },
            })}
        </div>
    `;
};
