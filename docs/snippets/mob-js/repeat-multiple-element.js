import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ repeat }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                render: () => {
                    return html` <div class="item-container">
                        <my-child-component> </my-child-component>
                        <my-child-component> </my-child-component>
                    </div>`;
                },
            })}
        </div>
    `;
};
