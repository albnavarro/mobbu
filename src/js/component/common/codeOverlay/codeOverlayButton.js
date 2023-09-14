/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const CodeOverlayButton = ({ render, onMount, watch, getState }) => {
    const { key, disable } = getState();

    onMount(({ element }) => {
        /**
         * Set selected class.
         */
        const unwatchSelected = watch('selected', (selected) => {
            element.classList.toggle('selected', selected);
        });

        return () => {
            unwatchSelected();
        };
    });

    const isDisable = disable ? 'disable' : '';

    /**
     * First render button is disabled.
     */
    return render(/* HTML */ `
        <code-overlay-button class="code-overlay__button ${isDisable}"
            >${key}</code-overlay-button
        >
    `);
};
