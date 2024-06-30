export type Emit<T> = (prop: keyof T) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
