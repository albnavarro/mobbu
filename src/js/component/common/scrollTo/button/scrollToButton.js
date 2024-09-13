//@ts-check

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").ScrollToButton>} */
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
            <span ref="labelRef"> ${label} </span>
        </button>
    `;
};
