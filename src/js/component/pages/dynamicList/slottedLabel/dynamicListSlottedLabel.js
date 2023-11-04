/**
 * @param {import('../../../../mobjs/type').componentType}
 */

function setContent(value) {
    return `slotted: ${value}`;
}
export const DynamicListSlottedLabel = async ({
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

    return html`<div class="dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${setContent(label)}</p>
    </div>`;
};
