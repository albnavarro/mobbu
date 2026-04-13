import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyLayout>}
 */
export const MyLayout = () => {
    return htmlObject({
        tag: 'section',
        content: [
            {
                className: 'col',
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'left' },
                },
            },
            {
                className: 'col',
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'right' },
                },
            },
        ],
    });
};

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return htmlObject({
        component: MyLayout,
        content: [
            {
                component: MyContent,
                attributes: { slot: 'left' },
            },
            {
                component: MySidebar,
                attributes: { slot: 'right' },
            },
        ],
    });
};
