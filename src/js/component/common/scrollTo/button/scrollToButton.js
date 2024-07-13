//@ts-check

/**
 * @type {import("../../../../mobjs/type").mobComponent<import("./type").ScrollToButton>}
 */
export const ScrollToButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label } = getState();

    onMount(({ element, ref }) => {
        watchSync('active', (val) => {
            element.classList.toggle('active', val);
        });

        const { labelRef } = ref;

        watchSync('label', (val) => {
            labelRef.innerHTML = val;
        });

        return () => {};
    });

    return html`
        <button type="button">
            <span ref="labelRef"> ${label} </span>
        </button>
    `;
};
