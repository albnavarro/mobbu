/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListEmpty = async ({ html }) => {
    return html`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
};
