import { htmlObject } from '@mobJs';

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
            observe: [() => proxi.myState, () => proxi.myState2],
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
