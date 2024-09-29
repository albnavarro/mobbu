/**
watchParent(prop: string, callback: () => void): void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
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
