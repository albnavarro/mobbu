/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListSlottedLabel = async ({ html, onMount, watchSync }) => {
    onMount(({ element }) => {
        const contentEl = element.querySelector('.content');

        watchSync('genericData', (value) => {
            contentEl.textContent = `slotted: ${value}`;
        });
    });

    return html`<div class="dynamic-list-slotted-label">
        <p class="content"></p>
    </div>`;
};
