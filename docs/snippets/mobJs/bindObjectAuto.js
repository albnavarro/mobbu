import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ bindObject, repeat }) => {
    return html`
        <div>
            ${repeat({
                bind: 'data',
                render: ({ current }) => {
                    return html`<div class="item">
                        <div class="item__inner">
                            ${bindObject`value: ${() => current.value.label}.`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
