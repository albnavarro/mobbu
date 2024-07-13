//@ts-check

/**
 * @type {import("../../../mobjs/type").mobComponent<import("./type").CodeOverlayButton>}
 */
export const CodeOverlayButtonFn = ({ onMount, watchSync, html }) => {
    onMount(({ element }) => {
        /**
         * Set selected class.
         */
        const unwatchSelected = watchSync('selected', (selected) => {
            element.classList.toggle('selected', selected);
        });

        const unwatchSelectedKey = watchSync('key', (value) => {
            element.innerHTML = value;
        });

        const unwatchSelectedDisable = watchSync('disable', (value) => {
            element.classList.toggle('disable', value);
        });

        return () => {
            unwatchSelected();
            unwatchSelectedKey();
            unwatchSelectedDisable();
        };
    });

    /**
     * First render button is disabled.
     */
    return html` <button class="c-code-overlay__button"></button> `;
};
