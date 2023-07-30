/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const HorizontalScrollerButton = ({
    getState,
    watchParent,
    render,
    onMount,
}) => {
    const { id, callback } = getState();

    onMount(({ element }) => {
        const btn = element.querySelector('.js-nav-button');
        btn.addEventListener('click', () => callback());

        watchParent('currentId', (currentId) => {
            btn.classList.toggle('active', currentId === id);
        });

        watchParent('currentIdFromScroll', (currentId) => {
            btn.classList.toggle('active', currentId === id);
        });

        return () => {};
    });

    return render(/* HTML */ `
        <li>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${id}
            </button>
        </li>
    `);
};
