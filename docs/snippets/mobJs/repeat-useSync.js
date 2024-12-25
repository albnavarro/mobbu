/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, repeat, bindProps, delegateEvents }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                useSync: true,
                render: ({ html, sync, current }) => {
                    return html`
                        <my-child-component
                            ${sync()}
                            ${bindProps({
                                bind: ['counter'],
                                props: ({ counter }) => {
                                    return {
                                        counter,
                                        label: current.value.label,
                                        index: current.index,
                                    };
                                },
                            })}
                            ${delegateEvents({
                                click: (event) =>
                                    console.log(event, current.index),
                            })}
                        >
                        </my-child-component>
                    `;
                },
            })}
        </div>
    `;
};
