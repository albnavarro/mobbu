/**
 * @param {import("../../../src/js/mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount }) => {
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
     * Return the DOM.
     */
    return html`
        <div>
            <h2 ref="labelRef">Title</h2>
        </div>
    `;
};
