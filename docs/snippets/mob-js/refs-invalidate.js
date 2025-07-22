import { html } from '@mobJs';

const getInvalidateRender = ({
    staticProps,
    delegateEvents,
    getState,
    setRef,
}) => {
    const { items } = getState();

    return html`
        ${items
            .map((item) => {
                return html`
                    <div class="wrapper">
                        <my-card
                            ${setRef('card_ref')}
                            ${staticProps({
                                key: `${item}`,
                            })}
                            ${delegateEvents({
                                click: () => {
                                    console.log(
                                        'invalidate inside invalidate click'
                                    );
                                },
                            })}
                        ></my-card>
                    </div>
                `;
            })
            .join('')}
    `;
};

/**
 * @type {import("@mobJsType").MobComponent<'myStateArray'|'counter'>}
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

    return html`
        <button
            type="button"
            ${delegateEvents({
                click: () => {
                    updateState('items', (val) => [...val, Math.random()]);
                },
            })}
        >
            myButton
        </button>
        <div class="invalidate-container">
            ${invalidate({
                observe: ['items'],
                render: () => {
                    return getInvalidateRender({
                        getState,
                        delegateEvents,
                        staticProps,
                        setRef,
                    });
                },
            })}
        </div>
    `;
};
