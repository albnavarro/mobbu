unFreezeProp(prop: string): void;


/**
 * @type {import("../mobjs/type").mobComponent<'myState'>}
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
