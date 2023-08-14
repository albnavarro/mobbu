/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const CodeOverlayButton = ({ render, onMount, watch, getState }) => {
    const { key, callback } = getState();

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            callback();
        });

        /**
         * Set selected class.
         */
        const unwatchSelected = watch('selected', (selected) => {
            element.classList.toggle('selected', selected);
        });

        /**
         * Disable button if there is no content.
         */
        const unwatchActive = watch('disable', (disable) => {
            element.classList.toggle('disable', disable);
        });

        return () => {
            unwatchSelected();
            unwatchActive();
        };
    });

    /**
     * First render button is disabled.
     */
    return render(/* HTML */ `
        <button class="code-overlay__button disable">${key}</button>
    `);
};
