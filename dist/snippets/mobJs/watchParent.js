/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, watchParent }) => {
    onMount(() => {
        const unsubscribe = watchParent('parentState', (value, _oldValue) => {
            console.log(value);
        });

        return () => {
            unsubscribe();
        };
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
