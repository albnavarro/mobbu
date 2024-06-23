/**
 * @type {import("../../../../mobjs/type").mobComponent<'id'|'active'>}
 */
export const HorizontalScrollerButtonFn = ({
    getState,
    watch,
    html,
    onMount,
}) => {
    const { id } = getState();

    onMount(({ refs }) => {
        const { button } = refs;

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
