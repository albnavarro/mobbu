/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const HorizontalScrollerButton = ({
    getState,
    watch,
    html,
    onMount,
}) => {
    const { id } = getState();

    onMount(({ element }) => {
        const btn = element.querySelector('.js-nav-button');

        watch('active', (active) => {
            btn.classList.toggle('active', active);
        });

        return () => {};
    });

    return html`
        <li>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${id}
            </button>
        </li>
    `;
};
