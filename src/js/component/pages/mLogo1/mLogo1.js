/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Mlogo1 = ({ html, onMount, getState }) => {
    const { svg } = getState();

    onMount(() => {
        return () => {};
    });

    return html`<div>
        <div class="m-logo-1">${svg}</div>
    </div>`;
};
