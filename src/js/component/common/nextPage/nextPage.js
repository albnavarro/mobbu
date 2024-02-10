import arrow from '../../../../svg/scroll_arrow.svg';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const QuickNav = ({ getState, onMount, html, watchSync }) => {
    const { active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ element, refs }) => {
        const { prev, next } = refs;

        watchSync('active', (isActive) => {
            element.classList.toggle('active', isActive);
        });

        watchSync('nextRoute', (route) => {
            next.classList.toggle('is-disable', !route);
            next.href = route;
        });

        watchSync('prevRoute', (route) => {
            prev.classList.toggle('is-disable', !route);
            prev.href = route;
        });
    });

    return html`<div class="c-quick-nav-container ${activeClass}">
        <a class="c-quick-nav c-quick-nav--prev" ref="prev">${arrow}</a>
        <a class="c-quick-nav c-quick-nav--next" ref="next">${arrow}</a>
    </div>`;
};
