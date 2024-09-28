//@ts-check

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").HorizontalScrollerButton>} */
export const HorizontalScrollerButtonFn = ({
    getState,
    watch,
    html,
    onMount,
    setRef,
    getRef,
}) => {
    const { id } = getState();

    onMount(() => {
        const { button } = getRef();

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
                ${setRef('button')}
            >
                ${id}
            </button>
        </li>
    `;
};
