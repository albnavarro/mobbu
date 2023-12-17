/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, freezeProp }) => {
    onMount(() => {
        freezeProp('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
