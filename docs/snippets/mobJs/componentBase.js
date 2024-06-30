/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, getState }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * Function fired at the end of all component parse.
     * Here all components is attached to the DOM (if scoped params is disabled).
     * element: root DOM element.
     * refs: Object with all refs.
     */
    onMount(({ element, refs }) => {
        const { labelRef } = refs;

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Destroy function
         */
        return () => {};
    });

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2 ref="labelRef">${label}</h2>
        </div>
    `;
};
