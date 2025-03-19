import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    repeat,
    bindProps,
    delegateEvents,
    getProxi,
}) => {
    const proxi = getProxi();

    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                render: ({ current }) => {
                    return html`
                        <my-child-component
                            ${bindProps(() => ({
                                counter: proxi.counter,
                                label: current.value.label,
                                index: current.index,
                            }))}
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
