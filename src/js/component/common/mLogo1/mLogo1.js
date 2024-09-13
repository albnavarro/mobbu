//@ts-check

/** @type {import('../../../mobjs/type').MobComponent<import('./type').MLogo1>} */
export const Mlogo1Fn = ({ html, onMount, getState, watchSync }) => {
    const { svg, active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ ref }) => {
        const { logo } = ref;

        watchSync('active', (isActive) => {
            logo.classList.toggle('active', isActive);
        });

        return () => {};
    });

    return html`<div>
        <div class="m-logo-1 ${activeClass}" ref="logo">${svg}</div>
    </div>`;
};
