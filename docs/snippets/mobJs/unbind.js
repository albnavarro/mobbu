/**
unBind: (arg0: { id: string }) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, unBind }) => {
    onMount(() => {
        setTimeout(() => {
            unBind();
        }, 1000);
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
