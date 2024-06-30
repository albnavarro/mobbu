function myAsyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = async ({ html, onMount }) => {
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
