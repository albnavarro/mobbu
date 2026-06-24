import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return htmlObject({
        component: MyChildComponent,
        className: ['myclass1', 'myclass2 '],
        style: { color: 'red' },
        attributes: {
            'aria-label': 'my-label',
        },
    });
};
