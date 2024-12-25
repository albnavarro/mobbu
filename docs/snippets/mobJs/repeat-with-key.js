/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
}) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                key: 'myKey',
                render: ({ html, current }) => {
                    return html`
                        <my-child-component
                            ${staticProps({
                                label: current.value.label,
                            })}
                            ${bindProps({
                                bind: ['counter'],
                                props: ({ counter }) => {
                                    return {
                                        counter,
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
