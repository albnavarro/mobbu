import { html } from '../mobjs';

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
                        <dynamic-list-card-inner
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
                        ></dynamic-list-card-inner>
                    </div>
                `;
            })
            .join('')}
    `;
};

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<'myStateArray'|'counter'>}
 */
export const MyComponent = ({
    html,
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
        watch('items', () => {
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
                bind: ['items'],
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
