unBind: (arg0: { id: string }) => void;


/**
 * @type {import("../mobjs/type").mobComponent}
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
