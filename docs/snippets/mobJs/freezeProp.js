freezeProp(prop: string): void;


/**
 * @type {import("../mobjs/type").mobComponent<'myState'>}
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
