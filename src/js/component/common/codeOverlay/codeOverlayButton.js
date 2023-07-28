/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const CodeOverlayButton = ({
    render,
    onMount,
    watch,
    watchParent,
    getState,
    setState,
}) => {
    const { key, callback } = getState();

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            /**
             * If is just selected  or disabled (secure check) return
             */
            const { disable, selected } = getState();
            if (selected || disable) return;

            /**
             * Set active drawer to parent.
             */
            callback();
        });

        /**
         * Check if button is cliccable ( url is settled ).
         */
        const unWatchParentKey = watchParent('urls', ({ [key]: url }) => {
            setState('disable', !(url && url.length));
        });

        /**
         * Check if active drawer is itself.
         */
        const unWatchParentActiveContent = watchParent(
            'activeContent',
            (parentActiveKey) => setState('selected', parentActiveKey === key)
        );

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
            unWatchParentActiveContent();
            unWatchParentKey();
        };
    });

    /**
     * First render button is disabled.
     */
    return render(/* HTML */ `
        <button class="code-overlay__button disable">${key}</button>
    `);
};
