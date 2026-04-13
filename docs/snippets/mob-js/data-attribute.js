import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState }) => {
    const { label } = getState();

    return htmlObject({
        content: {
            component: MyChildComponent,
            dataAttributes: { label, title: 'my title' },
        },
    });
};
