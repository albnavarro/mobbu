import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ repeat }) => {
    return htmlObject({
        className: 'repeater-container',
        content: repeat({
            observe: 'myStateArray',
            render: () => {
                return htmlObject({
                    className: 'item-container',
                    content: [
                        {
                            component: MyChildComponent,
                        },
                        {
                            component: MyChildComponent,
                        },
                    ],
                });
            },
        }),
    });
};
