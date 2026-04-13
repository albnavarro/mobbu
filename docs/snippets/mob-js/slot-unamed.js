import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyLayout>}
 */
export const MyLayout = () => {
    return htmlObject({
        tag: 'section',
        content: [
            {
                tag: 'h1',
                content: 'My title'
            }
            {
                tag: 'mobjs-slot',
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
        content: {
            component: MyChildComponent,
        },
    });
};
