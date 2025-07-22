import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
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
                observe: () => proxi.myStateArray,
                key: 'myKey',
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
