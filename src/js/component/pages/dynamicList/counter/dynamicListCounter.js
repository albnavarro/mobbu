//@ts-check

/**
 * @type {import('../../../../mobjs/type').MobComponent<import('./type').DynamicCounter>}
 */
export const DynamicListCounterFn = async ({
    watch,
    onMount,
    html,
    getState,
}) => {
    const { parentListId, counter } = getState();

    onMount(({ ref }) => {
        const { counterValueEl } = ref;

        watch('counter', (value) => {
            counterValueEl.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${parentListId}</p>
        <span ref="counterValueEl">${counter}</span>
    </div>`;
};
