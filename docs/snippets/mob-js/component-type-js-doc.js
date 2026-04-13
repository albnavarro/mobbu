import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponentFn = () => {
    return htmlObject({
        tag: 'h1',
        content: 'title',
    });
};
