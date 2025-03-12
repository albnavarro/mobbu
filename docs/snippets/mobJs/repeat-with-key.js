import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ repeat, bindProps, delegateEvents }) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                key: 'myKey',
                render: ({ current }) => {
                    return html`
                        <my-child-component
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
