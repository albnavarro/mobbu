import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ repeat, bindObject }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                observe: 'data',
                render: ({ current }) => {
                    return html` <div class="item">
                        <div>
                            ${bindObject`label: ${() => current.value.label}`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
