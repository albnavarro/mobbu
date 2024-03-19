unFreezeProp(prop: string): void;


/**
 * @param {import("../mobjs/type").componentType}
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
