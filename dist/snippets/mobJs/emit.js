/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, emit }) => {
    onMount(() => {
        emit('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
