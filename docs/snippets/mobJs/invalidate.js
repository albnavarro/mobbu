export type PartialInvalidateComponent<T> = (arg0: {
    bind?: Array<OnlyStringKey<T>>;
    render: (arg0: {
        html: (
            template: { raw: readonly string[] | ArrayLike<string> },
            ...substitutions: any[]
        ) => string;
    }) => string;
}) => string;

import { html } from '../mobjs';

const getInvalidateRender = ({ staticProps, delegateEvents, getState }) => {
    const { items } = getState();

    return html`
        ${items
            .map((item) => {
                return html`
                    <div class="wrapper">
                        <dynamic-list-card-inner
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
 * @type {import("../mobjs/type").mobComponent<'myStateArray'|'counter'>}
 */
export const MyComponent = ({
    html,
    invalidate,
    getState,
    staticProps,
    delegateEvents,
}) => {
    return html`
        <div class="invalidate-container">
            ${invalidate({
                bind: ['myState', 'myState2'],
                render: () => {
                    return getInvalidateRender({
                        getState,
                        delegateEvents,
                        staticProps,
                    });
                },
            })}
        </div>
    `;
};
