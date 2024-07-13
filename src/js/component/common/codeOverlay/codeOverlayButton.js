//@ts-check

/**
 * @type {import("../../../mobjs/type").mobComponent<import("./type").CodeOverlayButton>}
 */
export const CodeOverlayButtonFn = ({ onMount, watchSync, html, getState }) => {
    const { key, disable } = getState();

    onMount(({ element }) => {
        /**
         * Set selected class.
         */
        const unwatchSelected = watchSync('selected', (selected) => {
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
