/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListEmpty = async ({ html }) => {
    return html`<div class="dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
};
