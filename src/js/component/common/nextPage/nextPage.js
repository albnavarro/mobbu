import arrow from '../../../../svg/scroll_arrow.svg';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const QuickNav = ({ getState, html }) => {
    const { prevRoute, nextRoute } = getState();

    const prevIsDisable = prevRoute === '' ? 'is-disable' : '';
    const nextIsDisable = nextRoute === '' ? 'is-disable' : '';

    return html`<div>
        <a
            class="c-quick-nav c-quick-nav--prev ${prevIsDisable}"
            href="${prevRoute}"
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next ${nextIsDisable}"
            href="${nextRoute}"
            >${arrow}</a
        >
    </div>`;
};
