//@ts-check

/**
 * @type {import('../../../../mobjs/type').mobComponent}
 */
export const DynamicListEmptyFn = async ({ html }) => {
    return html`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
};
