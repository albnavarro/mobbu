import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ repeat, bindObject }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'data',
                render: ({ current }) => {
                    return html` <div class="item">
                        <div>
                            ${bindObject`${{
                                bind: 'data',
                                value: () => current.value.label,
                            }}`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
