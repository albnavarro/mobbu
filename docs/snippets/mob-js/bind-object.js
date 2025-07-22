import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindObject, repeat }) => {
    return html`
        <div>
            ${repeat({
                observe: 'data',
                render: ({ current }) => {
                    return html`<div class="item">
                        <div class="item__inner">
                            ${bindObject`value: ${{
                                bind: 'data',
                                value: () => current.value.label,
                            }}.`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
