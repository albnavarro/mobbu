/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, repeat, bindObject }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'data',
                render: ({ html, current }) => {
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
