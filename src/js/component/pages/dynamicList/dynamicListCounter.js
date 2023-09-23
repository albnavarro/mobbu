/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListCounter = async ({
    watchSync,
    onMount,
    html,
    getState,
}) => {
    const { parentListId } = getState();

    onMount(({ element }) => {
        const counterValueEl = element.querySelector('span');

        watchSync('counter', (value) => {
            counterValueEl.textContent = value;
        });

        return () => {};
    });
    return html`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__list">list index: ${parentListId}</p>
        <span></span>
    </div>`;
};
