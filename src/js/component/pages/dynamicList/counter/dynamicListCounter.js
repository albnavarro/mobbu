/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListCounter = async ({
    watch,
    onMount,
    html,
    getState,
}) => {
    const { parentListId, counter } = getState();

    onMount(({ element }) => {
        const counterValueEl = element.querySelector('span');

        watch('counter', (value) => {
            counterValueEl.textContent = value;
        });
    });
    return html`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__list">list index: ${parentListId}</p>
        <span>${counter}</span>
    </div>`;
};
