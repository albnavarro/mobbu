import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    repeat,
    bindProps,
    delegateEvents,
    getProxi,
}) => {
    const proxy = getProxi();

    return htmlObject({
        className: 'repeater-container',
        content: repeat({
            observe: 'myStateArray',
            useSync: true,
            render: ({ sync, current }) => {
                return htmlObject({
                    component: MyChildComponent,
                    modules: [
                        sync(),
                        bindProps(() => ({
                            counter: proxy.counter,
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
