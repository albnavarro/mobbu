import arrow from '../../../../svg/scroll_arrow.svg';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ScrollDownLabel = ({ html, onMount, getState, watchSync }) => {
    const { active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ element }) => {
        watchSync('active', (isActive) => {
            element.classList.toggle('active', isActive);
        });

        return () => {};
    });

    return html`
        <div class="c-scroller-down-label ${activeClass}">
            <h1>Scroll down</h1>
            ${arrow}
        </div>
    `;
};
