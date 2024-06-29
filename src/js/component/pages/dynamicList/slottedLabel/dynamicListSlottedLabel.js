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

    onMount(({ refs }) => {
        const { contentEl } = refs;

        watch('label', (value) => {
            contentEl.textContent = setContent(value);
        });
    });

    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${setContent(label)}</p>
    </div>`;
};
