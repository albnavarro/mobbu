/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const HorizontalScrollerButton = ({
    getState,
    watch,
    render,
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

    return render(/* HTML */ `
        <horizontal-scroller-button>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${id}
            </button>
        </horizontal-scroller-button>
    `);
};
