onMount(
    arg0: (arg1: {
        element: HTMLElement;
        refs: { [key: string]: HTMLElement | HTMLElement[] };
    }) => () => void
): void;

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, setRef, getRef }) => {
    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Destroy function
         * Optional
         */
        return () => {};
    });

    /**
     * Return the DOM.
     */
    return html`
        <div>
            <h2 ${setRef('labelRef')}>Title</h2>
        </div>
    `;
};
