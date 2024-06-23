emit(prop: string): void;


/**
 * @type {import("../mobjs/type").mobComponent<'myState'>}
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
