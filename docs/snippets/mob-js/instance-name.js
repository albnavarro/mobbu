import { htmlObject } from '@mobJs';

/**
 * Use variable for lsp reference.
 */
export const childInstanceName = 'child_name';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return htmlObject({
        content: {
            component: MyChildComponent,
            attributes: { name: childInstanceName },
        },
    });
};
