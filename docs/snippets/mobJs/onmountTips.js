const loadContent = async ({ element, source }) => {
    const response = await fetch(source);
    if (!response.ok) {
        element.textContent = '<div>error</div>';
        return;
    }

    const data = await response.json();
    element.textContent = data;
};

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = async ({ html, onMount, getState }) => {
    const { lazyLoad, source } = getState();

    onMount(async ({ element }) => {
        if (lazyLoad) {
            /**
             * Non blocking loading.
             */
            loadContent({ element, source });
        } else {
            /**
             * Blocking loading.
             */
            await loadContent({ element, source });
        }

        return () => {};
    });

    /**
     * Return the DOM.
     */
    return html` <div></div> `;
};
