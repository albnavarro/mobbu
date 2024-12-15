/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, repeat, bindProps, delegateEvents }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                render: ({ html }) => {
                    return html`
                        <my-child-component
                            ${bindProps({
                                bind: ['counter'],
                                props: ({ counter, myStateArray }, index) => {
                                    return {
                                        counter,
                                        label: myStateArray[index].label,
                                        index,
                                    };
                                },
                            })}
                            ${delegateEvents({
                                click: (event, index) =>
                                    console.log(event, index),
                            })}
                        >
                        </my-child-component>
                    `;
                },
            })}
        </div>
    `;
};
