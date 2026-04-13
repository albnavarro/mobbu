import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ repeat, bindObject }) => {
    return htmlObject({
        className: 'repeater-container',
        content: repeat({
            observe: 'data',
            render: ({ current }) => {
                return htmlObject({
                    className: 'item',
                    content: {
                        className: 'item-inner',
                        content: bindObject`label: ${() => current.value.label}`,
                    },
                });
            },
        }),
    });
};
