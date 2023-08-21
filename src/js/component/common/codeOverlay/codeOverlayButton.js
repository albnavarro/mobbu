/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const CodeOverlayButton = ({ render, onMount, watch, getState }) => {
    const { key, callback, disable } = getState();

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

        return () => {
            unwatchSelected();
        };
    });

    const isDisable = disable ? 'disable' : '';

    /**
     * First render button is disabled.
     */
    return render(/* HTML */ `
        <button class="code-overlay__button ${isDisable}">${key}</button>
    `);
};
