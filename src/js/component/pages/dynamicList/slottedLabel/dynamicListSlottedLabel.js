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

    onMount(({ element }) => {
        const contentEl = element.querySelector('.content');

        watch('label', (value) => {
            contentEl.textContent = setContent(value);
        });
    });

    return html`<div class="dynamic-list-slotted-label">
        <p class="content">${setContent(label)}</p>
    </div>`;
};
