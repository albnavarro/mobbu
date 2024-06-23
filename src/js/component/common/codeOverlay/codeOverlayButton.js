/**
 * @type {import("../../../mobjs/type").mobComponent<'key'|'selected'|'disable'>}
 */
export const CodeOverlayButtonFn = ({ onMount, watch, getState, html }) => {
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
    return html`
        <button class="c-code-overlay__button ${isDisable}">${key}</button>
    `;
};
