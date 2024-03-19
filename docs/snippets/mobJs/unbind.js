unBind: (arg0: { id: string }) => void;


/**
 * @param {import("../mobjs/type").componentType}
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
