export type UnFreezeProp<T> = (prop: keyof T) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, unFreezeProp }) => {
    onMount(() => {
        unFreezeProp('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
