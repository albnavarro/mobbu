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
                render: ({ html, currentValue }) => {
                    const { label } = currentValue;

                    return html`
                        <my-child-component
                            ${staticProps({
                                label,
                            })}
                            ${bindProps({
                                bind: ['counter'],
                                props: ({ counter }, index) => {
                                    return {
                                        counter,
                                        index,
                                    };
                                },
                            })}
                            ${delegateEvents({
                                click: (event, index) =>
                                    console.log(event, index),
                            })}
                        >
                            <h2>${label}</h2>
                        </my-child-component>
                    `;
                },
            })}
        </div>
    `;
};
