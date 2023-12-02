/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, getState }) => {
    const { label } = getState();

    /**
     * function fired at the end of component parse.
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
    return html` <div><h2 ref="labelRef">${label}</div></div> `;
};
