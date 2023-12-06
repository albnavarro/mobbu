function myAsyncFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = async ({ html }) => {
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
