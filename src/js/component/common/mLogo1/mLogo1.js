/**
 * @type {import('../../../mobjs/type').mobComponent<'svg'|'active'>}
 */
export const Mlogo1Fn = ({ html, onMount, getState, watchSync }) => {
    const { svg, active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ refs }) => {
        const { logo } = refs;

        watchSync('active', (isActive) => {
            logo.classList.toggle('active', isActive);
        });

        return () => {};
    });

    return html`<div>
        <div class="m-logo-1 ${activeClass}" ref="logo">${svg}</div>
    </div>`;
};
