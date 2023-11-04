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

    onMount(({ refs }) => {
        const { counterValueEl } = refs;

        watch('counter', (value) => {
            counterValueEl.textContent = value;
        });
    });

    return html`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__subtitle">(slotted)</p>
        <p class="dynamic-counter__list">list index: ${parentListId}</p>
        <span ref="counterValueEl">${counter}</span>
    </div>`;
};
