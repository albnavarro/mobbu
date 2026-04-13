import { htmlObject } from '@mobJs';

export const MyComponent = ({ bindProps, delegateEvents, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        className: 'container',
        content: [
            {
                component: MyChildComponent,
                modules: bindProps(() => ({
                    counter: proxi.counter,
                    label: proxi.label,
                    index: proxi.index,
                })),
            },
            {
                component: MyChildComponent,
                modules: [
                    bindProps(() => ({
                        counter: proxi.counter,
                        label: proxi.label,
                        index: proxi.index,
                    })),
                    delegateEvents({
                        click: (event) => {
                            //
                        },
                    }),
                ],
            },
        ],
    });
};
