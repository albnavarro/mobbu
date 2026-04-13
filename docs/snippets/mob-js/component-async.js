import { html, htmlObject } from '@mobJs';

function myAsyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @type {import('@mobJsType').MobComponentAsync<import('./type').MyComponent>}
 */
export const MyComponent = async () => {
    await myAsyncFunction();

    /**
     * Return the DOM.
     */
    return htmlObject({
        content: {
            tag: 'h2',
            content: 'title',
        },
    });
};
