/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, repeat, bindProxi, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'data',
                render: ({ html, current }) => {
                    return html` <div class="item">
                        <div>
                            ${bindProxi`${() => proxi.data[current.index].label}`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
