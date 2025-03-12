import { html } from '../../../src/js/mobjs';

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
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
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
                persistent: false,
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
