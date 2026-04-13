import { html, htmlObject } from '@mobJs';

/**
 * Default component
 */
export const MyComponent = () => {
    return htmlObject({
        tag: 'div',
    });
};

/**
 * WebComponent
 */
export const MyComponent = () => {
    return htmlObject({
        tag: 'my-component',
    });
};
