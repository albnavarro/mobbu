//@ts-check

/** @type {import('../../../mobjs/type').MobComponent<import('./type').MLogo1>} */
export const Mlogo1Fn = ({
    html,
    onMount,
    getState,
    watchSync,
    setRef,
    getRef,
}) => {
    const { svg, active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(() => {
        const { logo } = getRef();

        watchSync('active', (isActive) => {
            logo.classList.toggle('active', isActive);
        });

        return () => {};
    });

    return html`<div>
        <div class="m-logo-1 ${activeClass}" ${setRef('logo')}>${svg}</div>
    </div>`;
};
