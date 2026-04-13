import { html, htmlObject } from '@mobJs';

const getInvalidateRender = ({ staticProps, delegateEvents, getState }) => {
    const { items } = getState();

    return items
        .map((item) => {
            return htmlObject({
                className: 'wrapper',
                content: {
                    component: MyComponent,
                    modules: [
                        staticProps({
                            key: `${item}`,
                        }),
                        delegateEvents({
                            click: () => {
                                console.log(
                                    'invalidate inside invalidate click'
                                );
                            },
                        }),
                    ],
                },
            });
        })
        .join('');
};

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    invalidate,
    getState,
    staticProps,
    delegateEvents,
}) => {
    return htmlObject({
        className: 'invalidate-container',
        content: invalidate({
            observe: ['myState', 'myState2'],
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
        }),
    });
};
