//@ts-check

/** @type {import('../../../../mobjs/type').MobComponent<import('./type').DynamicCounter>} */
export const DynamicListCounterFn = async ({
    watch,
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    const { parentListId, counter } = getState();

    onMount(() => {
        const { counterValueEl } = getRef();

        watch('counter', (value) => {
            counterValueEl.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${parentListId}</p>
        <span ${setRef('counterValueEl')}>${counter}</span>
    </div>`;
};
