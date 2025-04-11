import { html } from '@mobJs';

function myAsyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = async ({ onMount }) => {
    onMount(async () => {
        await myAsyncFunction();

        console.log('async onMount');
    });

    /**
     * Return the DOM.
     */
    return html`
        <div>
            <h2>Title</h2>
        </div>
    `;
};
