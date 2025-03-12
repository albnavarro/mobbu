import { html } from '../../../src/js/mobjs';

function myAsyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @type {import("../../../src/js/mobjs/type").MobComponentAsync<import('./type').State>}
 */
export const MyComponent = async () => {
    await myAsyncFunction();

    /**
     * Return the DOM.
     */
    return html`
        <div>
            <h2>Title</h2>
        </div>
    `;
};
