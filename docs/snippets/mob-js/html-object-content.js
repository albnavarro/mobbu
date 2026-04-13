import { htmlObject } from '@mobJs';

export const MyComponent = ({ invalidate, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'section',
        className: 'grid',
        content: [
            {
                tag: 'column',
                content: {
                    tag: 'card',
                    className: 'card-class',
                    content: [
                        {
                            className: 'card-top',
                            content: [
                                {
                                    component: CardTop,
                                },
                                {
                                    tag: 'h1',
                                    content: bindObject`value: ${() => proxi.title}.`,
                                },
                                {
                                    tag: 'h2',
                                    content: bindObject`value: ${() => proxi.subtitle}.`,
                                },
                            ],
                        },
                        {
                            className: 'card-bottom',
                            content: {
                                tag: 'p',
                                content: 'my content',
                            },
                        },
                    ],
                },
            },
            'my simple text',
            {
                className: 'invalidate-container',
                content: invalidate({
                    observe: () => proxi.myState,
                    render: () => {
                        htmlObject({
                            component: InvalidateCard,
                        });
                    },
                }),
            },
        ],
    });
};
