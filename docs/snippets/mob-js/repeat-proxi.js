import { html, htmlObject } from '@mobJs';

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

    return htmlObject({
        className: 'repeater-container',
        content: repeat({
            observe: () => proxi.myStateArray,
            key: 'myKey',
            render: ({ current }) => {
                return htmlObject({
                    component: MyChildComponent,
                    modules: [
                        bindProps(() => ({
                            counter: proxi.counter,
                            label: current.value.label,
                            index: current.index,
                        })),
                        delegateEvents({
                            click: (event) => console.log(event, current.index),
                        }),
                    ],
                });
            },
        }),
    });
};
