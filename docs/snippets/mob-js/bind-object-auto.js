import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindObject, repeat, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'main',
        content: repeat({
            observe: 'data',
            render: ({ current }) => {
                return htmlObject({
                    className: 'item',
                    content: [
                        {
                            className: 'item__inner',
                            content: bindObject`value: ${() => current.value.label}.`,
                        },
                        {
                            content: bindObject`${() => (proxi.isExpanded ? 'close' : 'expand')}, ${() => current.value && ''}`,
                        },
                    ],
                });
            },
        }),
    });
};
