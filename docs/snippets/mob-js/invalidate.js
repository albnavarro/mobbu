import { html } from '@mobJs';

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
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    invalidate,
    getState,
    staticProps,
    delegateEvents,
}) => {
    return html`
        <div class="invalidate-container">
            ${invalidate({
                bind: ['myState', 'myState2'],
                beforeUpdate: () => {
                    //
                },
                afterUpdate: () => {
                    //
                },
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
