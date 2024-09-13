//@ts-check

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").HorizontalScrollerButton>} */
export const HorizontalScrollerButtonFn = ({
    getState,
    watch,
    html,
    onMount,
}) => {
    const { id } = getState();

    onMount(({ ref }) => {
        const { button } = ref;

        watch('active', (active) => {
            button.classList.toggle('active', active);
        });

        return () => {};
    });

    return html`
        <li>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn"
                ref="button"
            >
                ${id}
            </button>
        </li>
    `;
};
