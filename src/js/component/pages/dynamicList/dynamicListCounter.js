/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListCounter = async ({ watchSync, onMount, html }) => {
    onMount(({ element }) => {
        const counterValueEl = element.querySelector('span');

        watchSync('counter', (value) => {
            counterValueEl.textContent = value;
        });

        return () => {};
    });
    return html`<div class="dynamic-counter">
        <p>Nested:</p>
        <span></span>
    </div>`;
};
