/**
export type FreezeProp<T> = (prop: keyof T) => void;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
