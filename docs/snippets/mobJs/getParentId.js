getParentId(): string | undefined;


/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, getParentId }) => {
    onMount(() => {
        const parentID = getParentId();

        //
        console.log(parentID);
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
