import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindObject, repeat }) => {
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
                            content: bindObject`value: ${{
                                observe: 'data',
                                value: () => current.value.label,
                            }}.`,
                        },
                    ],
                });
            },
        }),
    });
};
