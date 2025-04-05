//@ts-check

import { html } from '../../../../mob/mobjs';

/** @type {import('../../../../mob/mobjs/type').MobComponent} */
export const DynamicListEmptyFn = () => {
    return html`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
};
