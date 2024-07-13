//@ts-check

function setContent(value) {
    return `slotted: ${value}`;
}

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').DynamicListSlottedLabel>}
 */
export const DynamicListSlottedLabelFn = async ({
    html,
    onMount,
    watch,
    getState,
}) => {
    const { label } = getState();

    onMount(({ ref }) => {
        const { contentEl } = ref;

        watch('label', (value) => {
            contentEl.innerHTML = setContent(value);
        });

        return () => {};
    });

    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${setContent(label)}</p>
    </div>`;
};
