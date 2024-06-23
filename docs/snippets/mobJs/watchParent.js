watchParent(prop: string, callback: () => void): void;


/**
 * @type {import("../mobjs/type").mobComponent}
 */
export const MyComponent = ({ html, onMount, watchParent }) => {
    onMount(() => {
        watchParent('parentState', (value, _oldValue) => {
            console.log(value);
        });
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
