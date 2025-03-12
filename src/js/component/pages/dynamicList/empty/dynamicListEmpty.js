//@ts-check

import { html } from '../../../../mobjs';

/** @type {import('../../../../mobjs/type').MobComponent} */
export const DynamicListEmptyFn = () => {
    return html`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
};
