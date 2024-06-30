//@ts-check

/**
 * @type {import("../../../../mobjs/type").mobComponent<import("./type").ScrollToButton>}
 */
export const ScrollToButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label } = getState();

    onMount(({ element }) => {
        watchSync('active', (val) => {
            element.classList.toggle('active', val);
        });

        return () => {};
    });

    return html`
        <button type="button">
            <span> ${label} </span>
        </button>
    `;
};
