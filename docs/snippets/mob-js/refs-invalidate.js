import { htmlObject } from '@mobJs';

const getInvalidateRender = ({
    staticProps,
    delegateEvents,
    getState,
    setRef,
}) => {
    const { items } = getState();

    return items
        .map((item) => {
            return htmlObject({
                className: 'wrapper',
                content: {
                    component: MyChildComponent,
                    modules: [
                        setRef('card_ref'),
                        staticProps({ key: `${item}` }),
                        delegateEvents({
                            click: () => {
                                //
                            },
                        }),
                    ],
                },
            });
        })
        .join('');
};

/**
 * @type {import('@mobJsType').MobComponent<'myStateArray' | 'counter'>}
 */
export const MyComponent = ({
    invalidate,
    getState,
    updateState,
    onMount,
    staticProps,
    delegateEvents,
    watch,
    setRef,
    getRefs,
}) => {
    onMount(() => {
        watch('items', async () => {
            await MobJs.tick();

            getRefs()?.card_refs.forEach((element) => {
                console.log(element);
            });
        });
    });

    return htmlObject({
        content: [
            {
                tag: 'button',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        updateState('items', (val) => [...val, Math.random()]);
                    },
                }),
                content: 'my button',
            },
            {
                className: 'invalidate-container',
                content: invalidate({
                    observe: ['items'],
                    render: () => {
                        return getInvalidateRender({
                            getState,
                            delegateEvents,
                            staticProps,
                            setRef,
                        });
                    },
                }),
            },
        ],
    });
};
