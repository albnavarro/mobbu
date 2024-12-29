/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, bindObject, repeat }) => {
    return html`
        <div>
            ${repeat({
                bind: 'data',
                render: ({ html, current }) => {
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
